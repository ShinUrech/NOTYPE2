import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/UsersApp/LoginScreen';
import SignInStack from './SignInStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { ColorThemeContext } from './ColorThemeProvider';

const Stack = createNativeStackNavigator();

export default function AuthStack(){

    const navigation = useNavigation();

    const {globalStyles} = useContext(ColorThemeContext)

    return(
        <Stack.Navigator screenOptions={({route}) => ({
            header: () => {
                let title;
                if(route.name === 'LogIn'){
                    title = "Login to NOTYPE.";
                }
                else if(route.name === 'SignInStack'){
                    title = "Create an Account";
                    return(
                        <SafeAreaView style={[globalStyles.leftRightView, globalStyles.AndroidSafeArea, globalStyles.elevateHeader, globalStyles.backgroundColor]}>
                            <StatusBar barStyle='dark-content'/>
                            <Ionicons onPress={() => navigation.goBack()} name='chevron-back-outline' size={35} color={'#292929'} style={{paddingLeft: '3%'}}/>
                            <View>
                                <Text style={globalStyles.headerText}>{title}</Text>
                            </View>
                        </SafeAreaView>
                    )
                }
                return(
                    <SafeAreaView style={[globalStyles.leftRightView, globalStyles.AndroidSafeArea, globalStyles.elevateHeader, globalStyles.backgroundColor]}>
                        <StatusBar barStyle='dark-content'/>
                        <View>
                            <Text style={globalStyles.headerText}>{title}</Text>
                        </View>
                    </SafeAreaView>
                )
            }
        })}>
            <Stack.Screen name='LogIn' component={LoginScreen}/>
            <Stack.Screen name='SignInStack' component={SignInStack}/>
        </Stack.Navigator>
    );
}