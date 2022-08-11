import * as React from 'react';
import { View, Text,Alert, TouchableOpacity} from 'react-native';
import { globalStyles } from '../../assets/styling/globalStyles';
import { Ionicons } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/native'


export default function AccountSettingsScreen(){

  const navigation = useNavigation();

  
  return(
    <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {flex: 1, justifyContent: 'flex-start', paddingVertical: 20}]}>
      <TouchableOpacity
          style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
          onPress={() => {
            navigation.navigate('ChangeEmail')
          }}
      >
        <Text style={[globalStyles.buttonText, { fontSize: 25}]}>Change Email</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.color}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
        onPress={() => {
         navigation.navigate('ChangePassword')
        }}
      >
        <Text style={[globalStyles.buttonText, { fontSize: 25}]}>Change Password</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.color}/>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15}]}
        onPress={() => {
         navigation.navigate('ChangePhoneNumber')
        }}>
          <Text style={[globalStyles.buttonText, {fontSize: 25}]}>Change Phone Number</Text>
          <Ionicons  name={'chevron-forward-outline'} size={25} color={globalStyles.iconColor.color}/> 
      </TouchableOpacity>

      <TouchableOpacity
          style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', marginBottom: 15, justifyContent:'center'}]}
          onPress={() => {
              Alert.alert('Delete account', 'Are you sure you want to delete this account ?', [
                {text: 'yes', 
                onPress: () => auth.currentUser.delete()
                },{
                  text:'no',
                  onPress: () => {}
                }])
          }}
      >
        <Text style={[globalStyles.buttonText, { fontSize: 25}]}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}
 