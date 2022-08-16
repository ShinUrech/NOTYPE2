import { useNavigation } from '@react-navigation/native'
import {View, Text, TouchableOpacity} from 'react-native'
import { globalStyles } from '../assets/styling/globalStyles'

export function SelectionScreen() {
    const navigation = useNavigation()
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