import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import EventDetailsScreen from '../Screens/UsersApp/EventDetailsScreen';
import CheckoutScreen from '../Screens/UsersApp/CheckoutScreen';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AccountSettingsScreen from '../Screens/UsersApp/AccountSettingsScreen';
import { ColorThemeContext } from './ColorThemeProvider';
import AuthStack from './AuthStack';
import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';


const Stack = createNativeStackNavigator();



const EventStack = () =>{
    
    const navigation = useNavigation();

    const {globalStyles} = useContext(ColorThemeContext)

    return(
        
            <SafeAreaProvider>
            <Stack.Navigator screenOptions={({route}) =>({
                headerShown: true,
                headerShadowVisible: true,
                header: () => {
                    let title;
                    if(route.name === 'Checkout'){
                        title = "Checkout";
                    }
                    else if(route.name === 'EventDetails'){
                        title = "Event Details";
                    }
                    else if(route.name === 'Settings'){
                        title = "Settings";
                    }
                    return(
                        <SafeAreaView style={[globalStyles.leftRightView, globalStyles.AndroidSafeArea, globalStyles.elevateHeader, globalStyles.backgroundColor, {borderBottomWidth: 1, borderColor: '#292929'}]}>
                            <Ionicons onPress={() => navigation.navigate('Main')} name='chevron-back-outline' size={35} color={globalStyles.iconColor.iconColor} style={{paddingLeft: '3%'}}/>
                            <View>
                                <Text style={globalStyles.headerText}>{title}</Text>
                            </View>
                        </SafeAreaView>
                    )
                }
            })}>
                <Stack.Screen name="Main" component={MainTabs} options={{headerShown: false}}/>
                <Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name='EventDetails' component={EventDetailsScreen} />
                <Stack.Screen name='AccountSettings' component={AccountSettingsScreen}/>
                <Stack.Screen name='AuthStack' component={AuthStack} options={{headerShown:false, navigationBarHidden:true}}/>
            </Stack.Navigator>
            <FlashMessage position="top"/>
        </SafeAreaProvider>
        
        
        
    )
}

export default EventStack;

