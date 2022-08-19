import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { signOut} from '@firebase/auth';
import { auth, database } from '../../../firebase';
import {onSnapshot, doc} from '@firebase/firestore'
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import {AuthenticatedUserContext} from '../../Navigation/AuthenticatedUserProvider'
import { ColorThemeContext } from '../../Navigation/ColorThemeProvider';

import * as WebBrowser from 'expo-web-browser';


export default function ProfileScreen() {

  const [supportModalVisible, setSupportModalVisible] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  
  const {user, setUser} = useContext(AuthenticatedUserContext)
  const {globalStyles} = useContext(ColorThemeContext)
  
  const navigation = useNavigation();

  if(user !== null) {
    useEffect(() => {

      const unsubscribe = onSnapshot(doc(database, "Users", user.uid), (doc) => {
        setIsStaff(doc.data().isStaff)
      })
      return unsubscribe;
      
    }, [])
  }

  const toggleSupportModal = () => {
    setSupportModalVisible(!supportModalVisible);
  };
    
  const handleSignout = async () => {
      try{
        signOut(auth)
      } catch(e) {
        console.log(e)
      }
  }
  
  return (
    <ScrollView style={[globalStyles.backgroundColor, {flex: 1}]} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
      
      {user ? 
      <View style={[globalStyles.leftRightView, globalStyles.cardContainer, globalStyles.backgroundColor]}>
        <View style={[globalStyles.mainBackgroundView,globalStyles.backgroundColor, {alignItems: 'flex-start', paddingLeft: 5}]}>
          <Text style={[globalStyles.headerText, {paddingHorizontal: 0, paddingTop: 10}]}>{auth.currentUser.displayName}</Text>
          <Text style={globalStyles.paragraphText}>Joined NOTYPE</Text>
          <Text style={globalStyles.paragraphText}>{auth.currentUser.metadata.creationTime}</Text>
        </View>
      </View> : 
      <View style={[globalStyles.leftRightView, globalStyles.cardContainer, globalStyles.backgroundColor]}>
        <Text style={[globalStyles.headerText, {paddingHorizontal: 0, paddingTop: 10}]}>Join NOYTPE.</Text>
      </View>}



      {user ? <TouchableOpacity
        style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
        onPress={() => navigation.navigate('AccountSettings')}
      >
        <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Settings</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
      </TouchableOpacity> : null}

      <TouchableOpacity
        style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
        onPress={() => navigation.navigate('AppSettings')}
      >
        <Text style={[globalStyles.buttonText, {fontSize: 25}]}>App Settings</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
      </TouchableOpacity>
      
      {user ? <TouchableOpacity
        style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
        onPress={() => navigation.navigate('OrderHistory')}
      >
        <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Payments History</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
      </TouchableOpacity>:null}

      {user ? <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]} onPress={() => navigation.navigate('ClaimedTickets')}>
        <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Ticket History</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
      </TouchableOpacity>:null}

      {user ? <TouchableOpacity
        style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
        onPress={toggleSupportModal}
      >
        <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Help</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
      </TouchableOpacity>:null}

      <TouchableOpacity
        style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
        onPress={async() => {await WebBrowser.openBrowserAsync('https://www.notype-ge.ch/');}}
      >
        <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Our Website</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
        onPress={async() => {await WebBrowser.openBrowserAsync('https://instagram.com/notype_ge/');}}
      >
        <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Our Instagram</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
      </TouchableOpacity>

      {isStaff ? 
      <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]} onPress={() => navigation.navigate('Staff')}>
        <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Scanner</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.iconColor}/>
      </TouchableOpacity> : null}

     {user ?  
     <TouchableOpacity 
        style={[globalStyles.eventButton, globalStyles.elevate, {alignSelf: 'center', width:'35%', justifyContent: 'center', marginBottom: 50}]}
        onPress={handleSignout}
      >
        <Text style={[globalStyles.buttonText, {fontSize: 25, alignSelf: 'center'}]}>Logout</Text>
      </TouchableOpacity>: 
      <TouchableOpacity
        style={[globalStyles.eventButton, globalStyles.elevate, {alignSelf: 'center', width:'35%', justifyContent: 'center', marginBottom: 50}]}
        onPress={() => navigation.navigate('SignInFLow')}>
          <Text>LogIn</Text>
      </TouchableOpacity>}
      

      <Modal isVisible={supportModalVisible} onBackdropPress={toggleSupportModal}>
        <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {borderWidth:1, borderColor: globalStyles.borderColor.borderColor, paddingBottom: 10}]}>
          <Text style={globalStyles.titleText}>For any reccuring issue, please contact our support team:</Text>
          <Text style={[globalStyles.titleText, {color: 'blue'}]} selectable> support@notype.ch</Text>
          <Text style={[globalStyles.paragraphText, {fontSize: 15}]}>Long press the email address to copy</Text>
        </View>
      </Modal>
    </ScrollView>
  );
}