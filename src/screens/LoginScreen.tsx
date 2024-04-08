import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { MessageSnackbar } from './RegisterScreen'
import { style } from '../theme/styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface LoginForm {
    email: string,
    password: string
}

export const LoginScreen = () => {
    //hook para mostrar la contraseña
    const [hiddenPassword, setHiddenPassword] = useState(true)


    //Hook de navegacion 
    const navigation=useNavigation()


    //hook useState para el estado del formulario.
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: ""
    });

    //Hook useState: trabajar con el manejo de mensajes dinamicos
    const [messageSnackbar, setMessageSnackbar] = useState<MessageSnackbar>({
        visible: false,
        message: "",
        color: "#fff"
    })

    //Funcion para actualizar datos del formulario 
    const handlerSetLoginForm = (key: string, value: string) => {
        setLoginForm({ ...loginForm, [key]: value })

    }

    const handlerLogin = async () => {
        if (!loginForm.email || !loginForm.password) {
            //cambiar estado para visualizar el mensaje
            setMessageSnackbar({
                visible: true,
                message: "complete todos los campos",
                color: "#ff0000"
            })
            return;
        }
        //Login usuario 
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                loginForm.email,
                loginForm.password
            );
            console.log(response)
        } catch (e) {
            console.log(e);
            setMessageSnackbar({
                visible: true,
                message: "Usuario y/o contraseña incorrecta",
                color: "#ff0000"
            })
        }

    }

    return (
        <View style={style.content}>
            <Text variant="headlineSmall">Inicia Sesión</Text>
            <TextInput
                mode="outlined"
                label="correo electronico"
                placeholder="ejemplo@gmail.com"
                style={style.input}
                onChangeText={(value) => handlerSetLoginForm('email', value)}
            />
            <TextInput
                mode="outlined"
                label="contraseña"
                placeholder="Escribe aqui tu contraseña"
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
                style={style.input}
                onChangeText={(value) => handlerSetLoginForm('password', value)}
            />
            <Button
                buttonColor="#dc582a"
                textColor='white'
                style={style.buttons}
                icon="account-plus"
                mode="elevated" onPress={() => handlerLogin()}>
                Iniciar
            </Button>
            <Snackbar
                style={{ backgroundColor: messageSnackbar.color }}
                visible={messageSnackbar.visible}
                onDismiss={() => setMessageSnackbar({ ...messageSnackbar, visible: false })}
            >{messageSnackbar.message}
            </Snackbar>
            <Text
                style={style.textNavigation}
                onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Register"}))}

            >
                ¿No tienes una cuenta? Regístrate ahora
                </Text>
        </View>
    )
}
