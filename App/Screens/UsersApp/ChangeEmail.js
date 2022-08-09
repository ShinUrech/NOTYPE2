import * as React from 'react';
import {auth} from '../../../firebase'
import {globalStyles} from '../../assets/styling/globalStyles'
import InputField from '../../assets/InputField';
import {updateEmail} from '@firebase/auth'
import {useState} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import ReAuthModal from '../../assets/ReAuthModal'
import {Ionicons} from '@expo/vector-icons'


export default function ChangeEmail({navigation}) {

    const [newEmail, setNewEmail] = useState('')
    const [reauthNeeded, setReauthNeeded] = useState(false)

    return(
        <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {flex: 1, justifyContent: 'center'}]}>
          <InputField
            inputStyle={{
            fontSize: 14
            }}
            containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor, {
            marginBottom: 20,
            borderWidth:1
            }]}
            placeholder='Enter a new email'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            textContentType='emailAddress'
            onChangeText={text => {
              setNewEmail(text)
            }}
          />
          
          <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {marginVertical: 10}]} onPress={ () => {          
            try {
              updateEmail(auth.currentUser, newEmail)
              } catch(error) {
                setReauthNeeded(true)
            }
            navigation.goBack()
          }}
          >
            <Text style={globalStyles.buttonText}>Proceed</Text>
          </TouchableOpacity>
          <ReAuthModal isVisible={reauthNeeded} onBackdropPress={() => setReauthNeeded(false)}/>
        </View>
      )
}