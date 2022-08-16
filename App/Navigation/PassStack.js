import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PassScreen } from "../Screens/PassApp/PassScreen";
import { PassSalesScreen } from "../Screens/PassApp/PassSalesScreen";
import { OffersScreen } from "../Screens/PassApp/OffersScreen";
import { OfferDetailScreen } from "../Screens/ShopOwnerApp/OfferDetailScreen";
import { OfferScanner } from "../Screens/ShopOwnerApp/OfferScanner";
import CheckoutScreen from "../Screens/UsersApp/CheckoutScreen";
import { useNavigation } from "@react-navigation/native";
import {SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../assets/styling/globalStyles";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator() 

export const PassStack = () => {

    const navigation = useNavigation()

    return(
        <SafeAreaProvider>
            <Stack.Navigator screenOptions={({route}) => ({
                headerShown:true,
                headerShadowVisible:true,
                header: () => {
                    return(
                        
                    <SafeAreaView style={[globalStyles.leftRightView, globalStyles.AndroidSafeArea, globalStyles.elevateHeader, globalStyles.backgroundColor, {borderBottomWidth: 1, borderColor: '#292929'}]}>
                        <Ionicons onPress={() => navigation.navigate('OffersScreen')} name='chevron-back-outline' size={35} color={globalStyles.iconColor.iconColor} style={{paddingLeft: '3%'}}/>
                    </SafeAreaView>
                    )
                }
            
            })}>
                <Stack.Screen name="OffersScreen" component={OffersScreen} options={{headerShown:false}}/>
                <Stack.Screen name='PassScreen' component={PassScreen}/>
                <Stack.Screen name='PassSalesScreen' component={PassSalesScreen}/>
                <Stack.Screen name='OfferScanner' component={OfferScanner}/>
                <Stack.Screen name='OfferDetailScreen' component={OfferDetailScreen}/>
                <Stack.Screen name='CheckoutScreen' component={CheckoutScreen}/>
            </Stack.Navigator>
        </SafeAreaProvider>
    )
}
