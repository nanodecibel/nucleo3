import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { style } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Prospect } from './HomeScreen'
import { dbRealTime } from '../../configs/firebaseConfig'
import { ref, remove, update } from 'firebase/database'

export const DetailProspectScreen = () => {
    const navigation=useNavigation()
    //Acceder a los props de navegacion
    const route=useRoute()
  //@ts-ignore
    const {prospect}=route.params
    console.log(prospect)

    const [detailForm, setDetailForm] = useState<Prospect>({
        id:"",
        name:"",
        phone:"",
        address:""

    })
    //hook que carga los datos recibidos en el detailForm
    useEffect(() => {
        setDetailForm(prospect)
 
    }, [])

    //Funcions que permita actualizar la data del formulario
    const handlerSetDetailForm=(key:string, value:string)=>{
        setDetailForm({...detailForm, [key]:value})
    }
    //funcion para actualizar la carta
    const handlerUpdateProspect=async()=>{
        //referencia a la base de datos
        const dbRef=ref(dbRealTime, 'prospects/'+detailForm.id)
        await update(dbRef, {name:detailForm.name, phone:detailForm.phone, address:detailForm.address})
        navigation.goBack()
        //console.log(detailForm)

    }
    //Funcion para borrar el prospectp
    const handlerDeleteProspect=async()=>{
        const dbRef=ref(dbRealTime, 'prospects/'+detailForm.id)
        await remove(dbRef)
        navigation.goBack()

    }
    
    return (
        <View style={style.contentDetailProspect}>
            <View style={style.subjectProspects}>
                <Text variant='headlineSmall'>Nombre:</Text>
                <TextInput
                    value={detailForm.name}
                    onChangeText={(value) => handlerSetDetailForm('name', value)}
                    style={{ flex: 1 }}
                />
            </View>
            <Divider bold />
            <View style={style.subjectProspects}>
                <Text variant='headlineSmall'>Telefono:</Text>
                <TextInput
                    value={detailForm.phone}
                    onChangeText={(value) => handlerSetDetailForm('phone', value)}
                    style={{ flex: 1 }}
                />
            </View>
            <Divider />
            <View style={style.subjectProspects}>
                <Text variant='headlineSmall'>Direccion:</Text>
                <TextInput
                    value={detailForm.address}
                    onChangeText={(value) => handlerSetDetailForm('address', value )}
                    style={{ flex: 1 }}
                    multiline={true}
                    numberOfLines={7}
                />
            </View>
            <Button buttonColor='#dc582a' mode="contained" icon='update' onPress={()=>handlerUpdateProspect()}>Actualizar</Button>
            <Button buttonColor='#dc582a' mode="contained" icon='delete' onPress={()=>handlerDeleteProspect()}>Eliminar</Button>

        </View>
    )
}
