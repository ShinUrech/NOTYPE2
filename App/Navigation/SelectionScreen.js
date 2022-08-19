import { useNavigation } from '@react-navigation/native'
import {View, Text, TouchableOpacity} from 'react-native'
import { ColorThemeContext } from './ColorThemeProvider'
import React, {useContext} from 'react'

export function SelectionScreen() {
    const navigation = useNavigation()
    const {globalStyles} = useContext(ColorThemeContext)
    return(
        <View style={[globalStyles.mainBackgroundView]}>
            <TouchableOpacity style={[globalStyles.eventButton]} onPress={() => navigation.navigate('PassStack', {screen:'OffersScreen'})}>
                <Text style={[globalStyles.buttonText]}>Pass App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.eventButton]} onPress={() => navigation.navigate('EventStack', {screen: 'Home'})}>
                <Text style={[globalStyles.buttonText]}>Event App</Text>
            </TouchableOpacity>
        </View>

    )
}