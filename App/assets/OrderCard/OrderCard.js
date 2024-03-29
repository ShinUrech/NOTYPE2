import React, {useState} from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderCard = props => {
    const {
      amount,
      date,
      paymentIntent,
      globalStyles
    } = props;

    const paymentNumber = paymentIntent.substring(3, paymentIntent.length -1);
    const dateWords = (new Date(date)).getFullYear()+'/'+((new Date(date)).getMonth()+1)+'/'+(new Date(date)).getDate(); 

    return(
        <View style={[globalStyles.cardContainer, globalStyles.elevate, globalStyles.backgroundColor, {borderWidth:1 , borderColor:'white', padding: 10}]}>
            <View style={[globalStyles.leftRightView, {paddingBottom: 10}]}>
                <Text style={[globalStyles.paragraphText]} >Payment:</Text>
                <Text style={[globalStyles.paragraphText]} selectable>{paymentNumber}</Text>
            </View>
            <View style={[globalStyles.leftRightView, {paddingBottom: 10}]}>
              <Text style={[globalStyles.paragraphText]}>Amount:</Text>
              <Text style={[globalStyles.paragraphText]}>{amount} CHF</Text>    
            </View>
            
            <Text style={[globalStyles.paragraphText, {alignSelf: 'flex-end'}]}>{dateWords}</Text>
        </View>
    )
};

export default OrderCard;

OrderCard.propTypes = {
    amount: PropTypes.number,
    date: PropTypes.number,
    paymentIntent: PropTypes.string,
};