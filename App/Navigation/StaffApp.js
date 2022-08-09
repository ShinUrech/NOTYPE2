import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QrCodeScanner from '../Screens/StaffApp/QrCodeScanner';
import DisplayTicket from '../Screens/StaffApp/DisplayTicket';

export default function StaffApp(){
    
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Scanner' component={QrCodeScanner}/>
            <Stack.Screen name='DisplayTicket' component={DisplayTicket}/>
        </Stack.Navigator>
    )
}