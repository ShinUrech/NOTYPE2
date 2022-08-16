import { useNavigation } from '@react-navigation/native'
import {View, Text, TouchableOpacity} from 'react-native'
import { globalStyles } from '../../assets/styling/globalStyles'

export function OfferScanner() {
    const navigation = useNavigation()
    return(
        <View style={[globalStyles.mainBackgroundView]}>
            <TouchableOpacity style={[globalStyles.eventButton]} onPress={() => {navigation.navigate('OfferDetailScreen')}}>
                <Text style={[globalStyles.buttonText]}>Scanned!</Text>
            </TouchableOpacity>
        </View>
    )
}