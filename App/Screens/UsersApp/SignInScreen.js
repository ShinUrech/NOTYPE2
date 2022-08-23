import React, {useState, useContext } from "react";
import {KeyboardAvoidingView, View, Keyboard, TouchableWithoutFeedback, Text, TouchableOpacity} from "react-native";
import InputField from "../../assets/InputField";
import { useNavigation } from "@react-navigation/native";
import {ColorThemeContext} from '../../Navigation/ColorThemeProvider'

export default function SignInScreen() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [validEmailAddress, setValidEmailAddress] = useState(true);
  const [passwordIsValid, setPasswordValidity] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const [show,setShow] = useState(false)

  const {globalStyles} = useContext(ColorThemeContext)
 
  const [rightIcon, setRightIcon] = useState('eye-off');
  
  const [displayError, setDisplayError] = useState(false);

  const navigation = useNavigation();

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const emailIsValid = (string) => {
    if((string.indexOf('@') !== -1) && (string.indexOf('@') === string.lastIndexOf('@'))){
      setValidEmailAddress(true)
    } else {
      setValidEmailAddress(false)
    }return validEmailAddress;
  }

  const validatePassword = async (string) => {
    if((string.length >= 6) && (string === passwordConfirmation)) {
      setPasswordValidity(true)
    } else {
      setPasswordValidity(false)
    } return passwordIsValid;
  }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {flex: 1}]}>
          <Text style={globalStyles.titleText}>Email address :</Text>
          <InputField
            placeholder='Enter email address'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={false}
            onChangeText={text => {
              setEmail(text);
              emailIsValid(text);
            }}
            globalStyles={globalStyles}
            containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor, {borderBottomWidth:1 ,paddingBottom:5, marginBottom:10}]}
          />

          <Text style={globalStyles.titleText}>Password :</Text>
          <InputField
            containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor,{borderBottomWidth:1, paddingBottom:5, marginBottom:10}]}
            placeholder='Enter password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            rightIcon={rightIcon}
            onChangeText={text => setPassword(text)}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <Text style={[globalStyles.paragraphText, {alignSelf: 'flex-start', fontSize: 16, paddingLeft: '5%', paddingBottom: 5}]}> Password must be at least 6 characters long.</Text>
          <Text style={globalStyles.titleText}>Confirm password :</Text>
          <InputField
            containerStyle={[globalStyles.backgroundColor,globalStyles.borderColor, {borderBottomWidth:1, paddingBottom:5, marginBottom:10}]}
            placeholder='Confirm password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            rightIcon={rightIcon}
            onChangeText={text => {
              setPasswordConfirmation(text);
              validatePassword(text);
            }}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <Text style={[globalStyles.paragraphText, {alignSelf: 'flex-start', fontSize: 16, paddingLeft: '5%', paddingBottom: 20}]}> Passwords must match.</Text>
          {displayError && <Text style={[globalStyles.titleText, {color: '#FF3333', fontSize: 18, paddingHorizontal: '5%', paddingVertical: 10}]}> Invalid email address or password.</Text>}

          <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', justifyContent: 'center', marginBottom: 15}]} onPress={() => {
            validatePassword(password);
            if(emailIsValid(email) && validatePassword(password)){
              navigation.navigate('Credentials', {email: email, password: password});
              setDisplayError(false);
            } else {
              setDisplayError(true);
            }         
          }}
          >
            <Text style={globalStyles.buttonText}>Proceed</Text>

          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
}

