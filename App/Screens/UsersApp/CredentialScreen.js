import { SafeAreaView, View, TouchableWithoutFeedback, Text, Button, Keyboard, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth, onSignUpHandler, createUserData, signInHandler } from "../../../firebase";
import InputField from "../../assets/InputField";
import {DropdownList} from "react-native-ultimate-modal-picker";
import { sendEmailVerification } from "firebase/auth";
import { countryList } from "../../../Lists";
import { globalStyles } from "../../assets/styling/globalStyles";
import DateTimePicker from '@react-native-community/datetimepicker'

export default function CredentialScreen({navigation, route}) {


    const {email, password} = route.params;

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState(new Date(2001,11,23))
    const [country, setCountry] = useState('select your country')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [show, setShow] = useState(false);

    const parseDate = () => {
      return(
       birthDate.getDate().toString() + '/'+(birthDate.getMonth()+1).toString()+ '/' +birthDate.getFullYear().toString()
      )
    }
    const labelValue = () => {

      const values = [];
      countryList.forEach(item => {
        values.push({
          label: item, value: item
        })
      })
      
      return values
    }

    const items = labelValue();

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor,{flex: 1}]}>
          <Text style={globalStyles.titleText}>First name</Text>
          <InputField
            placeholder='First name'
            autoCapitalize='none'
            autoFocus={false}
            onChangeText={text => setName(text)}
            containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor, {borderBottomWidth: 1, paddingBottom:5}]}
          />
          
          <Text style={globalStyles.titleText}>Surname</Text>
          <InputField
            placeholder='Surname'
            autoCapitalize='none'
            autoFocus={false}
            onChangeText={text => setSurname(text)}
            containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor, {borderBottomWidth: 1, paddingBottom:5}]}
          />
          <Text style={globalStyles.titleText}>Phone number</Text>
          <InputField
            keyboardType='phone-pad'
            placeholder='Phone Number'
            autoCapitalize='none'
            autoFocus={false}
            onChangeText={text => setPhoneNumber(text)}
            containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor, {borderBottomWidth: 1, paddingBottom:5, marginBottom:15}]}
          />
          
          <View style={[globalStyles.borderColor, { borderWidth: 1, marginBottom:10}]}>
            <DropdownList title={country} items={items} onChange={item => setCountry(item)} titleStyle={{color: 'white'}} customContainerStyle={[globalStyles.borderColor, {height:10, borderWidth:1}]}/>
          </View>

          <Text style={globalStyles.titleText}>Birth date</Text>
          {show && <DateTimePicker textColor="black" value={birthDate} style={{width:'100%'}} display='spinner' onChange={(event, selectedDate) => {
              if(event?.type === 'dismissed'){
                setShow(false)
                setBirthDate(birthDate);
                return;
              } 
              setBirthDate(selectedDate);

              }}/>}
          <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', justifyContent: 'center', marginBottom: 15}]} onPress={() => setShow(!show)}>
            <Text style={globalStyles.buttonText}>{show ? 'select this birthdate': parseDate()}</Text>
          </TouchableOpacity>
      
          <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {width: '95%', justifyContent: 'center', marginBottom: 15}]} onPress={() => {signInHandler(email, password, name, surname, parseDate(), country, phoneNumber)}}>
            <Text style={globalStyles.buttonText}>Create the account</Text>
          </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

