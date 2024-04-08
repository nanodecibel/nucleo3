import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper';
import { style } from '../../../theme/styles';
import { Prospect } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { DetailProspectScreen } from '../DetailProspectScreen';

interface Props{
    prospect:Prospect,
}

export const ProspectCardComponent = ({prospect}:Props) => {

    const navigation=useNavigation()

    return (
        <View style={style.prospectCard}>
            <View>
                <Text variant='labelLarge'>Nombre: {prospect.name} </Text>
                <Text variant='labelMedium'>Telefono: {prospect.phone}</Text>
            </View>
            <View style={style.iconProfile}>
                <IconButton
                    icon="account-details"
                    iconColor="#dc582a"
                    size={20}
                    onPress={() => navigation.dispatch(CommonActions.navigate({name:"Detail", params:{prospect}}))}
                />
            </View>
        </View>
    )
}
