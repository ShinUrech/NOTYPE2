import React, {useContext} from 'react';
import { TouchableOpacity, View, Text, Switch} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {ColorThemeContext} from '../../Navigation/ColorThemeProvider'
import { globalStyles } from '../../assets/styling/globalStyles';
import { Ionicons } from '@expo/vector-icons';

export default function Settings(){

    const navigation = useNavigation();
    
    const {isDarkMode, setIsDarkMode} = useContext(ColorThemeContext)

    const switchColorTheme = () => {
        setIsDarkMode(!isDarkMode)
    }
               
    return(
        <View style={[globalStyles.backgroundColor, {flex: 1}]} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]} onPress={()=> navigation.navigate('AccountSettings')}>
                <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Account Settings</Text>
                <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
            </TouchableOpacity>
            <Switch 
            onChange={() => {
                switchColorTheme()
                console.log(isDarkMode)
            }}
            value={isDarkMode}/>
        </View>
    )
}