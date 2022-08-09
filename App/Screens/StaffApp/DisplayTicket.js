import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native';
import{globalStyles} from '../../assets/styling/globalStyles'

export default function DisplayTicket({route}){

    const {name, surname, birthdate, phoneNumber, claimed} = route.params
    return(
        <View style={[{flex:1, justifyContent: 'center', alignItems: 'center'}, globalStyles.backgroundColor]}>
            {!claimed && <Text style={[globalStyles.bigTitleText, {color:'red',marginHorizontal:10}]}>This ticket has already been claimed</Text>}
            <Text style={globalStyles.bigTitleText}>Name: {name} {surname}</Text>
            <Text style={globalStyles.bigTitleText}>Birthdate: {birthdate}</Text>
            <Text style={globalStyles.bigTitleText}>Phone Number: {phoneNumber}</Text>
        </View>)
} 