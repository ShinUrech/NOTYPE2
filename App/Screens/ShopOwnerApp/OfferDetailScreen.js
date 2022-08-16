import {View, Text} from 'react-native'
import { globalStyles } from '../../assets/styling/globalStyles'

export function OfferDetailScreen() {
    return(
        <View style={[globalStyles.mainBackgroundView]}>
                <Text stlye={[globalStyles.buttonText]}>Offer Details</Text>
        </View>
    )
}