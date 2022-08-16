import {View, Text, TouchableOpacity} from 'react-native'
import { globalStyles } from '../../assets/styling/globalStyles'

export function OfferScanner(navigation) {
    return(
        <View style={[globalStyles.mainBackgroundView]}>
            <TouchableOpacity style={[globalStyles.eventButton]}>
                <Text style={[globalStyles.buttonText]}>Scanned!</Text>
            </TouchableOpacity>
        </View>
    )
}