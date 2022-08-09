import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback, View, TouchableOpacity} from "react-native";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../../../firebase";
import InputField from "../../assets/InputField";
import { globalStyles } from "../../assets/styling/globalStyles";

export default function LoginScreen({navigation}) {

  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off');
  const [error, setError] = useState(false);

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
          containerStyle={[globalStyles.backgroundColor, {width: '90%', borderColor: 'white', borderWidth:1}]}
          placeholderTextColor={globalStyles.backgroundColor2.backgroundColor}
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
          containerStyle={[globalStyles.backgroundColor, {width: '90%', borderColor: 'white', borderWidth:1, marginBottom: 30}]}
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


