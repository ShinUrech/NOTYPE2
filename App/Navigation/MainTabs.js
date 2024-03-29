import React,  {useState, useEffect, useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from '../Screens/UsersApp/MainScreen';
import TicketsScreen from '../Screens/UsersApp/TicketsScreen';
import CartScreen from '../Screens/UsersApp/CartScreen';
import { Text, Badge } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {View, StatusBar, TouchableOpacity} from 'react-native';
import { getFirestore, onSnapshot, doc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { globalStyles } from '../assets/styling/globalStyles';
import * as WebBrowser from 'expo-web-browser';
import Modal from 'react-native-modal'
import ProfileScreenStack from './ProfileScreenStack';
import { AuthenticatedUserContext, AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import { ColorThemeContext } from './ColorThemeProvider';
import SignInStack from './SignInStack';
import { auth } from '../../firebase';

export default function MainTabs(){

    const [cartNumber, setCartNumber] = useState(0);
    const {user, setUser} = useContext(AuthenticatedUserContext)
    const {globalStyles} = useContext(ColorThemeContext)
    
    const [isLoading, setIsLoading] = useState(true);

    const Tab = createBottomTabNavigator();

    const database = getFirestore();
    const auth = getAuth();

    //Fetch cartItems number
    useEffect(() => {
    
        if(user !== null) {const subscriber = onSnapshot(doc(database, 'Users', auth.currentUser.uid), (snapshot) =>{
            setCartNumber(snapshot.data().cart);
        })
        return () => subscriber();} else{
            setCartNumber(0)
        }
    }, [user])
    

    return(
        
        <SafeAreaProvider>
       <Tab.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    let title;
                    if(route.name === 'Home'){
                        title = "NOTYPE.";
                    }
                    else if(route.name === 'Tickets'){
                        title = "TICKETS.";
                    }                   
                    else if(route.name === 'Cart'){
                        title = "CART.";
                    }
                    else if(route.name === 'Profile'){
                        title = "PROFILE.";
                    }

                    return(
                        <SafeAreaView style={[globalStyles.leftRightView, globalStyles.elevateHeader, globalStyles.AndroidSafeArea, globalStyles.backgroundColor, {paddingBottom:-10}]}>
                            <StatusBar barStyle='dark-content'/>
                            <Text style={globalStyles.headerText}>{title}</Text>
                        </SafeAreaView>
                    )
                },
                tabBarShowLabel: false,
                tabBarStyle: [{
                    backgroundColor: 'black',
                    borderTopWidth: .5,
                    borderTopColor: '#292929',
                }],
                tabBarIcon: ({ focused}) => {
                    let iconName, iconSize, iconColor;
                    if (route.name === 'Home') {
                        iconName = "home-outline";
                    }
                    else if(route.name === 'Tickets') {
                        iconName = "qr-code-outline";
                    }
                    else if(route.name === 'Cart'){
                        iconName = "cart-outline";
                    }
                    else if(route.name === 'Profile'){
                        iconName = "person-outline";
                    }
                    iconSize = focused ? 35 : 30;
                    iconColor = focused ? "#fffbfe" : "#D0CFCF";
                    if(iconName === "cart-outline"){
                        iconSize = focused ? 40 : 35
                        return(
                            <View>
                                <Ionicons name={iconName} size={iconSize} color={iconColor}/>
                                {cartNumber != 0? 
                                    <Badge
                                        status={'success'}
                                        value={cartNumber}
                                        containerStyle={{position: 'absolute', top: 0, right: 0}}
                                    />
                                :
                                    null
                                }
                                
                            </View>
                        )
                    }
                    return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
                }
            })}
        >
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="Tickets" component={TicketsScreen} />       
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreenStack} options={{headerShown:false}}/>
        </Tab.Navigator>
        </SafeAreaProvider>
    )
}
