import * as React from 'react'
import { updatePassword } from 'firebase/auth'
import {auth} from '../../../firebase'
import {globalStyles} from '../../assets/styling/globalStyles'
import InputField from '../../assets/InputField';
import {useState} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import ReAuthModal from '../../assets/ReAuthModal'

export default function ChangePassword({navigation}){

    const [newPassword, setNewPassword] = useState(''); 
    const [rightIcon, setRightIcon] = useState('eye');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [reauthNeeded, setReauthNeeded] = useState(false)

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
          setRightIcon('eye-off');
          setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
          setRightIcon('eye');
          setPasswordVisibility(!passwordVisibility);
        }
      };
      
    return(
        <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {flex:1, justifyContent: 'center'}]}>
        <InputField
          inputStyle={{
          fontSize: 14
          }}
          containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor, {
          marginBottom: 20,
          borderWidth:1
          }]}
          placeholder='Enter a new password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType='password'
          rightIcon={rightIcon}
          onChangeText={text => {
            setNewPassword(text)
          }}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {marginVertical: 10}]} onPress={async () => {
          try{updatePassword(auth.currentUser, newPassword)} catch(error){setReauthNeeded(true)}
          navigation.goBack()
        }}
        >
          <Text style={globalStyles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <ReAuthModal isVisible={reauthNeeded} onBackdropPress={() => setReauthNeeded(false)}/>
      </View>
    )
}