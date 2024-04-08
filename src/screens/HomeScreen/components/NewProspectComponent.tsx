import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { style } from '../../../theme/styles'
import { View } from 'react-native'
import { dbRealTime } from '../../../configs/firebaseConfig';
import { push, ref, set } from 'firebase/database';

//interface para recibir props
interface Props {
    visible: boolean,
    setVisible: Function
}

interface ProspectForm{
    name:string,
    phone:string,
    address:string
}

export const NewProspectComponent = ({ visible, setVisible }: Props) => {
    //hook useState:Actualizar los datos de nuestro formulario
    const [prospectForm, setProspectForm] = useState<ProspectForm>({
        name:'',
        phone:'',
        address:''
    })

    //funcion que capture y actualice los valores del formulario
    const handlerSetProspectForm=(key:string, value:string)=>{
        setProspectForm({...prospectForm, [key]:value})
    }

    //funcion para guardar las cartas
    const handlerSaveProspect=async()=>{
        if (!prospectForm.name || !prospectForm.phone || !prospectForm.address) {
            return
        }
        const dbRef=ref(dbRealTime, 'prospects')
        const saveProspect=push(dbRef)
        try {
            await set(saveProspect, prospectForm)
            setProspectForm({
                name:'',
                phone:'',
                address:''
            })
        } catch (e) {
            console.log(e)
        }
        setVisible(false)
    }
    
    return (
        
        <Portal>
            <Modal visible={visible} contentContainerStyle={style.modal}>
                <View style={style.headerModal}>
                    <Text variant='headlineMedium'>Nuevo Prospecto</Text>
                    <IconButton icon='close' onPress={() => setVisible(false)} />
                </View>
                <Divider bold />
                <TextInput
                    label='Nombre'
                    mode='outlined'
                    onChangeText={(value) => handlerSetProspectForm('name', value)}
                />
                <TextInput
                    label='Telefono'
                    mode='outlined'
                    onChangeText={(value) => handlerSetProspectForm('phone', value )}
                />
                <TextInput
                    label='Direccion'
                    mode='outlined'
                    onChangeText={(value) => handlerSetProspectForm('address', value)}
                    multiline={true}
                    numberOfLines={7}
                />
                <Button style={{marginTop:20, margin: 20}} buttonColor='#dc582a' mode='contained' onPress={()=>handlerSaveProspect()}>Guardar</Button>
                
            </Modal>
        </Portal>
        
    )
}
