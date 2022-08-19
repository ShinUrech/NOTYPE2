import *  as React from 'react'
import {TouchableWithoutFeedback, KeyboardAvoidingView, Text, View, Keyboard, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'                                                           
import PropTypes from 'prop-types'
import InputField from './InputField'
import {reauthenticateWithCredential} from 'firebase/auth'
import {useState} from 'react'

const ReAuthModal = props => {

    const {
        isVisible,
        onBackdropPress,
        globalStyles,
    } = props;

    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [rightIcon, setRightIcon] = useState('eye')

    
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
        <Modal 
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={[globalStyles.mainBackgroundView, {padding: 10}]} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={70}>
            <Text style={[globalStyles.titleText, {alignSelf: 'flex-start', paddingLeft: '3%'}]}>Current Email</Text>
                <InputField
                inputStyle={{
                    fontSize: 14
                }}
                placeholder='Enter current email'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText={text => setEmail(text)}
                />
                <Text style={[globalStyles.titleText, {alignSelf: 'flex-start', paddingLeft: '3%'}]}>Current Password</Text>
                <InputField
                inputStyle={{
                fontSize: 14
                }}
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                rightIcon={rightIcon}
                onChangeText={text => setPassword(text)}
                handlePasswordVisibility={handlePasswordVisibility}
                />
                <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {marginVertical: 10}]} onPress={async () => {
                    await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(email, password))
                    setReAuthModalVisible(false)
                }}>
                <Text style={[globalStyles.buttonText]}>Confirm Credentials</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    )
}

export default ReAuthModal;

ReAuthModal.propTypes = {
    isVisible: PropTypes.bool,
    onBackdropPress: PropTypes.func,
}