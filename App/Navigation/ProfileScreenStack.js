import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Screens/UsersApp/ProfileScreen';
import SupportScreen from '../Screens/UsersApp/SupportScreen';
import StaffApp from './StaffApp';
import ChangeEmail from '../Screens/UsersApp/ChangeEmail';
import ChangePassword from '../Screens/UsersApp/ChangePassword';
import AccountSettingsScreen from '../Screens/UsersApp/AccountSettingsScreen';
import ChangePhoneNumber from '../Screens/UsersApp/ChangePhoneNumber';
import ClaimedTickets from '../Screens/UsersApp/ClaimedTickets';
import OrderHistoryScreen from '../Screens/UsersApp/OrderHistoryScreen';
import Settings from '../Screens/UsersApp/Settings';
import {globalStyles} from '../assets/styling/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import {View, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function ProfileScreenStack() {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation()
    
    return(
        <Stack.Navigator screenOptions={({route}) =>({
            headerShown: true,
            headerShadowVisible: true,
            header: () => {
                let title;
                if(route.name === 'Checkout'){
                    title = "Checkout.";
                }
                else if(route.name === 'EventDetails'){
                    title = "Event Details.";
                }
                else if(route.name === 'OrderHistory'){
                    title = "Payment History.";
                }
                else if(route.name === 'ProfileScreen'){
                    title = "Profile.";
                } else if(route.name === 'AccountSettings'){
                    title = "Account Settings"
                } else if(route.name === 'Staff'){
                     title="Scanner"
                } else if(route.name === 'ChangeEmail'){
                    title="Change Email"
                } else if(route.name === "ChangePassword"){
                    title="Change Password"
                } else if(route.name === "DeleteAccount"){
                    title="Delete Account"
                } else if(route.name === 'ChangePhoneNumber'){
                    title='Change Phone Number'
                } else if(route.name === 'ClaimedTickets'){
                    title='Ticket History'
                } else if(route.name === 'Settings'){
                    title='Settings'
                }
                return(
                    <SafeAreaView style={[globalStyles.leftRightView, globalStyles.AndroidSafeArea, globalStyles.elevateHeader, globalStyles.backgroundColor, {borderBottomWidth:1, borderColor:'#292929',paddingBottom:-10}]}>
                        {route.name!=='ProfileScreen'?<Ionicons onPress={() => navigation.navigate('ProfileScreen')} name='chevron-back-outline' size={35} color={globalStyles.iconColor.iconColor} style={{paddingLeft: '3%'}}/>:null}
                        <View>
                            <Text style={globalStyles.headerText}>{title}</Text>
                        </View>
                    </SafeAreaView>
                )
            }
        })}>
            <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
            <Stack.Screen name='AccountSettings' component={AccountSettingsScreen}/>
            <Stack.Screen name='Support' component={SupportScreen}/>
            <Stack.Screen name='Staff' component={StaffApp}/>
            <Stack.Screen name='ChangeEmail' component={ChangeEmail}/>
            <Stack.Screen name='ChangePassword' component={ChangePassword}/>
            <Stack.Screen name='ChangePhoneNumber' component={ChangePhoneNumber}/>
            <Stack.Screen name='ClaimedTickets' component={ClaimedTickets}/>
            <Stack.Screen name='OrderHistory' component={OrderHistoryScreen}/>
            <Stack.Screen name='Settings' component={Settings}/>
        </Stack.Navigator>
    )
}
