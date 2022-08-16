import {View, TouchableOpacity, Text} from 'react-native'
import { globalStyles } from '../../assets/styling/globalStyles'

export function PassSalesScreen(navigation) {
    return(
        <View style={[globalStyles.mainBackgroundView]}>
            <TouchableOpacity style={[globalStyles.eventButton]}>
                <Text style={[globalStyles.buttonText]}>navigate to Checkout</Text>
            </TouchableOpacity>
        </View>
    )
}