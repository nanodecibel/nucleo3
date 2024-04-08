import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { style } from '../theme/styles';
import { DetailProspectScreen } from '../screens/HomeScreen/DetailProspectScreen';

//interface : definir las propiedades de las rutas

interface Routes {
    name: string,
    screen: () => JSX.Element, //Elemento JSX
    headerShow?:boolean,
    title?:string
}

const Stack = createStackNavigator();

export const StackNavigator = () => {

    //Hook para verificar si esta logueado o no
    const [isAuth, setIsAuth] = useState(false)

    //hook para controlar la carga inicial del screen
    const [isLoading, setIsLoading] = useState(false)

    //useEffect: validar el estado de autenticacion
    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {//si existe un usuario autenticado
                setIsAuth(true)
                //console.log("Rutas: "+user.email);
            }
            setIsLoading(false)

        })
    }, [])



    //arreglo para el usuario que no esta autenticado
    const routesNoAuth: Routes[] = [
        { name: "Login", screen: LoginScreen },
        { name: "Register", screen: RegisterScreen }
    ]
    const routesAuth: Routes[] = [
        { name: "Home", screen: HomeScreen },
        { name: "Detail", screen:DetailProspectScreen, headerShow:true, title:"Detalle del prospecto"}
    ]

    return (
        <>
            { 
                isLoading ?(
                    <View style={style.content}>
                    <ActivityIndicator size={60} animating={true} color="#dc582a" />
                </View>

                ):(

                    <Stack.Navigator>
                    {
                        !isAuth ?
                            routesNoAuth.map((item, index) => (
                                <Stack.Screen key={index} name={item.name} options={{  headerShown: false }} component={item.screen} />
                            ))
                            :
                            routesAuth.map((item, index) => (
                                <Stack.Screen key={index} name={item.name} options={{ headerShown: item.headerShow ?? false, title:item.title }} component={item.screen} />
                            ))
                    }
                    {/*<Stack.Screen name="Login" options={{title:"Iniciar sesión"}} component={LoginScreen} />
          <Stack.Screen name="Register" options={{title:"Registrarse"}} component={RegisterScreen} />*/}
                </Stack.Navigator>
                )
            }
        </>
    );
}
