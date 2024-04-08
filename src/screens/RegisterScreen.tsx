import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Text, Button, Snackbar } from 'react-native-paper'
import { auth } from '../configs/firebaseConfig'
import { style } from '../theme/styles'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface RegisterForm {
    email: string,
    password: string
}
export interface MessageSnackbar {
    visible: boolean,
    message: string,
    color: string

}

export const RegisterScreen = () => {
    //hook para mostrar la contraseña
    const [hiddenPassword, setHiddenPassword] = useState(true)

    //Hook de navegacion 
    const navigation = useNavigation()


    //hook useState para el estado del formulario.
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        email: "",
        password: ""
    });
    //Hook useState: trabajar con el manejo de mensajes dinamicos
    const [messageSnackbar, setMessageSnackbar] = useState<MessageSnackbar>({
        visible: false,
        message: "",
        color: "#fff"
    })

    //Hook visualizar mensajes
    const [showMessage, setShowMessage] = useState(false)

    //Funcion para actualizar datos del formulario 
    const handlerSetRegisterForm = (key: string, value: string) => {
        setRegisterForm({ ...registerForm, [key]: value })

    }

    //funcion que toma los datos del registro.
    const handlerRegister = async () => {
        if (!registerForm.email || !registerForm.password) {
            //cambiar estado para visualizar el mensaje
            setMessageSnackbar({
                visible: true,
                message: "complete todos los campos",
                color: "#ff0000"
            })
            return;
        }
        //Registrar usuario 
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                registerForm.email,
                registerForm.password
            );
            setMessageSnackbar({
                visible: true,
                message: "Registro Exitoso!",
                color: "#7bcc1e"
            })
        } catch (e) {
            console.log(e);
            setMessageSnackbar({
                visible: true,
                message: "No se logro completar el registro intente mas tarde",
                color: "#ff0000"
            })
        }
        //console.log(registerForm)
    }
    return (
        <View style={style.content}>
            <Text variant="headlineSmall">Registrate</Text>
            <TextInput
                mode="outlined"
                label="correo electronico"
                placeholder="ejemplo@gmail.com"
                style={style.input}
                onChangeText={(value) => handlerSetRegisterForm('email', value)}
            />
            <TextInput
                mode="outlined"
                label="contraseña"
                placeholder="Escribe aqui tu contraseña"
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
                style={style.input}
                onChangeText={(value) => handlerSetRegisterForm('password', value)}
            />
            <Button
                buttonColor="#dc582a"
                textColor='white'
                style={style.buttons}
                icon="account-plus"
                mode="elevated" onPress={() => handlerRegister()}>
                Registrarse
            </Button>
            <Snackbar
                style={{ backgroundColor: messageSnackbar.color }}
                visible={messageSnackbar.visible}
                onDismiss={() => setMessageSnackbar({ ...messageSnackbar, visible: false })}
            >{messageSnackbar.message}</Snackbar>
            <Text
                style={style.textNavigation}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Login" }))}

            >
                ¿Ya tienes una cuenta? Ingresa ahora
            </Text>
        </View>
    );
};
