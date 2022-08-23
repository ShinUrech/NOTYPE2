import React, { useEffect, useState, useContext } from "react";
import { KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback, View, TouchableOpacity} from "react-native";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../../../firebase";
import {ColorThemeContext} from '../../Navigation/ColorThemeProvider'
import InputField from "../../assets/InputField";

export default function LoginScreen({navigation}) {

  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off');
  const [error, setError] = useState(false);
  const {globalStyles} = useContext(ColorThemeContext)

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main', {screen: 'Home'})
    }catch(error){
      setError(true);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {flex: 1}]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={globalStyles.titleText}>Email address</Text>
        <InputField
          placeholder='Enter email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoFocus={false}
          onChangeText={text => onEmailChange(text)}
          containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor,{width: '90%',  borderWidth:1}]}
          iconColor={globalStyles.iconColor.iconColor}
          placeholderTextColor={globalStyles.backgroundColor2.backgroundColor}
          globalStyles={globalStyles}
        />
        <Text style={globalStyles.titleText}>Password</Text>
        <InputField
          placeholder='Enter password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType='password'
          rightIcon={rightIcon}
          onChangeText={text => onPasswordChange(text)}
          handlePasswordVisibility={handlePasswordVisibility}
          containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor,{width: '90%', borderWidth:1, marginBottom: 30}]}
          placeholderTextColor={globalStyles.backgroundColor2.backgroundColor}
        />
        {error? 
          <Text style={[globalStyles.titleText, {color: '#FF3333', fontSize: 18, paddingHorizontal: '5%'}]}>Unable to login. Try again</Text>
        :
          null
        }
        <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', justifyContent: 'center', marginBottom: 50}]} onPress={onLogin}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '95%', justifyContent: 'center', alignItems: 'center'}} onPress={()=> navigation.navigate('SignInStack')}>
          <Text style={[globalStyles.buttonText, {fontSize: 20}]}>Create a new account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}


