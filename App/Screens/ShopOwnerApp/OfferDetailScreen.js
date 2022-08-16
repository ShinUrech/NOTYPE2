import {View, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-web'
import { globalStyles } from '../../assets/styling/globalStyles'

export function OfferDetailScreen(navigation) {
    return(
        <View style={[globalStyles.mainBackgroundView]}>
                <Text stlye={[globalStyles.buttonText]}>Offer Details</Text>
        </View>
    )
}