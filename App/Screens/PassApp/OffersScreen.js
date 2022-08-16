import * as React from 'react'
import {View, Text, TouchableOpacity} from  'react-native'
import { globalStyles } from '../../assets/styling/globalStyles'

export function OffersScreen(navigation) {

    return(
        <View style={[globalStyles.mainBackgroundView]}>
            <TouchableOpacity style={[globalStyles.eventButton]}>
                <Text style={[globalStyles.buttonText]}>navigate to pass screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.eventButton]}>
                <Text style={[globalStyles.buttonText]}>navigate to pass sales screen</Text>
            </TouchableOpacity>

        </View>
    )
}