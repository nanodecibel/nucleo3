import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { style } from '../../theme/styles';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import firebase from 'firebase/auth'
import { ProspectCardComponent } from './components/ProspectCardComponent';
import { NewProspectComponent } from './components/NewProspectComponent';
import { onValue, ref } from 'firebase/database';

//interface que nos ayude a trabajar con los datos del usuario
interface UserForm {
    name: string
}
//interface para trabajar los datos del prospecto
export interface Prospect {
    
    id: string,
    name: string,
    phone: string,
    address: string,
}

export const HomeScreen = () => {
    //hook useState: controlar la visibilidad del modal
    const [showModalProfile, setShowModalProfile] = useState(false)

    //hook useState para mostrar el modal nuevo Prospecto
    const [showModalProspect, setShowModalProspect] = useState(false)


    //hook para trabajar con los datos del usuario- nombre
    const [userForm, setUserForm] = useState<UserForm>({
        name: ""
    })

    //hook
    const [userAuth, setUserAuth] = useState<firebase.User | null>(null)

    //hook useState: tomar la lista de prospectos
    const [prospects, setProspect] = useState<Prospect[]>([])

    //hook useEffect: capturar la data del usuario logueado
    useEffect(() => {
        setUserAuth(auth.currentUser)//Datos del usuario logueado
        setUserForm({ name: auth.currentUser?.displayName ?? "" })
        getAllProspects()
    }, [])

    //Funcion para tomar los datos del formulario y actualizar la data
    const handlerUpdateUserForm = (key: string, value: string) => {
        setUserForm({ ...userForm, [key]: value })
    }

    //Funcion actualiza la data del usuario logueado
    const handlerUpdateUser = async () => {
        try {
            await updateProfile(userAuth!, { displayName: userForm.name })
        } catch (e) {
            console.log(e)
        }
        //console.log(userForm);
        setShowModalProfile(false)
    }
    //Funcion para obtener los prospectos almacenados

    const getAllProspects = () => {
        const dbRef = ref(dbRealTime, 'prospects')
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val()
            const getKeys = Object.keys(data)
            const listProspects: Prospect[] = []
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key }
                listProspects.push(value)
            })
            setProspect(listProspects)
        })
    }

    return (
        <>
            <View style={style.contentHome}>
                <View style={style.headerHome}>
                    <Avatar.Icon size={50} icon="account-cash" />
                    <View>
                        <Text variant="bodySmall">Bienvenido</Text>
                        <Text variant="labelLarge">{userForm.name}</Text>
                    </View>
                    <View
                        style={style.iconProfile}
                    >
                        <IconButton
                            icon="account-cog"
                            iconColor="#dc582a"
                            size={25}
                            mode="contained"
                            onPress={() => setShowModalProfile(true)}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={prospects}
                        renderItem={({ item }) => <ProspectCardComponent prospect={item}/>}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <Portal>
                <Modal visible={showModalProfile} contentContainerStyle={style.modal}>
                    <View style={style.headerModal}>
                        <Text variant='headlineLarge'>Mi perfil</Text>
                        <IconButton icon="close" onPress={() => setShowModalProfile(false)} />
                    </View>
                    <Divider bold />
                    <View>
                        <TextInput
                            mode="outlined"
                            label="Nombre"
                            value={userForm.name}
                            onChangeText={(value) => handlerUpdateUserForm('name', value)}
                        />
                        <TextInput
                            mode="outlined"
                            label="Correo"
                            value={userAuth?.email!}
                        />
                    </View>
                    <Button buttonColor='#dc582a' mode="contained" onPress={() => handlerUpdateUser()}>Actualizar</Button>
                </Modal>
            </Portal>
            <FAB
                icon="plus"
                style={style.fab}
                onPress={() => setShowModalProspect(true)}
            />
            <NewProspectComponent visible={showModalProspect} setVisible={setShowModalProspect} />
        </>
    )
}
