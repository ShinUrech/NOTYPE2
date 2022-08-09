import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../Screens/UsersApp/SignInScreen';
import CredentialScreen from '../Screens/UsersApp/CredentialScreen';

const Stack = createNativeStackNavigator();

export default function SignInStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignInScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Credentials' component={CredentialScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}