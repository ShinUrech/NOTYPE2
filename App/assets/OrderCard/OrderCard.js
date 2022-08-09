import React, {useState} from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import { globalStyles } from "../styling/globalStyles";
import { Ionicons } from "@expo/vector-icons";

const OrderCard = props => {
    const {
      amount,
      date,
      paymentIntent,
    } = props;

    const paymentNumber = paymentIntent.substring(3, paymentIntent.length -1);
    const dateWords = (new Date(date)).getFullYear()+'/'+((new Date(date)).getMonth()+1)+'/'+(new Date(date)).getDate(); 

    return(
        <View style={[globalStyles.cardContainer, globalStyles.elevate, globalStyles.backgroundColor, {borderWidth:1 , borderColor:'white', padding: 10}]}>
            <View style={[globalStyles.leftRightView, {paddingBottom: 10}]}>
                <Text style={[globalStyles.paragraphText, {color: 'white'}]} >Payment:</Text>
                <Text style={[globalStyles.paragraphText, {color: 'white'}]} selectable>{paymentNumber}</Text>
            </View>
            <View style={[globalStyles.leftRightView, {paddingBottom: 10}]}>
              <Text style={[globalStyles.paragraphText, {color: 'white'}]}>Amount:</Text>
              <Text style={[globalStyles.paragraphText, {color: 'white'}]}>{amount} CHF</Text>    
            </View>
            
            <Text style={[globalStyles.paragraphText, {color: 'white', alignSelf: 'flex-end'}]}>{dateWords}</Text>
        </View>
    )
};

export default OrderCard;

OrderCard.propTypes = {
    amount: PropTypes.number,
    date: PropTypes.number,
    paymentIntent: PropTypes.string,
};