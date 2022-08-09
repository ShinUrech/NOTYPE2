import React, {useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {globalStyles} from '../../assets/styling/globalStyles'
import InputField from '../../assets/InputField'
import {changePhoneNumber} from '../../../firebase'
import { buttonStyle } from './../../assets/EventCard/EventCard.style';

export default function ChangePhoneNumber() { 

    const [newNumber, setNewNumber] = useState('');

    return(
        <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {flex: 1, justifyContent: 'center'}]}>
            <InputField inputStyle={{
            fontSize: 14
            }}
            containerStyle={[globalStyles.backgroundColor, globalStyles.borderColor,{
            marginBottom: 20,
            borderWidth:1
            }]}
            placeholder='Enter your new phone number'
            autoCorrect={false}
            keyboardType='phone-pad'
            onChangeText={text => {
              setNewNumber(text)
            }}/>
            <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {marginVertical:10}]} onPress={() => changePhoneNumber(newNumber)}>
                <Text style={[globalStyles.buttonText, globalStyles.elevate]}>Change your Number</Text>
            </TouchableOpacity>
        </View>
    )
}
