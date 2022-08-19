import React, {useContext} from 'react';
import { TouchableOpacity, View, Text, Switch} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {ColorThemeContext} from '../../Navigation/ColorThemeProvider'
import { Ionicons } from '@expo/vector-icons';

export default function AppSettings(){

    const navigation = useNavigation();
    
    const {globalStyles, isDarkMode, setIsDarkMode} = useContext(ColorThemeContext)

    const switchThemes = () => {
        setIsDarkMode(!isDarkMode)
    }

               
    return(
        <View style={[globalStyles.backgroundColor, {flex: 1}]} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
            <Switch 
            onChange={switchThemes}
            value={isDarkMode}/>
        </View>
    )
}