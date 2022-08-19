import { useNavigation } from '@react-navigation/native'
import React, {useContext} from 'react'
import {View, Text, TouchableOpacity} from  'react-native'

export function OffersScreen() {
    const navigation = useNavigation()
    return(
        <View style={[globalStyles.mainBackgroundView]}>
            <TouchableOpacity style={[globalStyles.eventButton]} onPress={() => navigation.navigate('PassScreen')}>
                <Text style={[globalStyles.buttonText]}>navigate to pass screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.eventButton]} onPress = {() => navigation.navigate('PassSalesScreen')}>
                <Text style={[globalStyles.buttonText]}>navigate to pass sales screen</Text>
            </TouchableOpacity>

        </View>
    )
}