import React, {useState} from "react";
import PropTypes from "prop-types";
import styles, {
    buttonTitleStyle,
    titleStyle,
    priceTag,
    ticketTypeStyle,
} from "./CartItemCard.style";
import {View, Text, ImageBackground, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {getFirestore, deleteDoc, doc, getDoc, updateDoc} from '@firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import { getAuth } from "firebase/auth";

const CartItemCard = props => {
    const {
        event,
        price,
        place,
        ticketType,
        ticketImage,
        itemID,
        ticket_id,
        globalStyles,
    } = props;

    const deleteItem = async () => {

        //Update available tickets
        const ticketDoc = await getDoc(doc(getFirestore(), 'tickets', ticket_id));
        const availability = ticketDoc.data().availableNum;

        updateDoc(doc(getFirestore(), 'tickets', ticket_id), {
            availableNum: availability + 1,
        })

        //Update user cart information
        const userDoc = await getDoc(doc(getFirestore(), 'Users', getAuth().currentUser.uid));
        const total = userDoc.data().total;
        const cart = userDoc.data().cart;

        updateDoc(doc(getFirestore(), 'Users', getAuth().currentUser.uid), {
            total: total - price,
            cart: cart - 1,
        })

        //Delete the ticket from cartItems
        deleteDoc(doc(getFirestore(), 'cartItems', itemID));

        showMessage({
            message: "Ticket Removed from the cart!",
            type: "info",
        })
    }

    return(
            <View style={[globalStyles.cardContainer, globalStyles.backgroundColor,{marginBottom: 20, borderWidth:1}, globalStyles.borderColor , globalStyles.elevate]}>
                <ImageBackground style={[globalStyles.eventImage, globalStyles.borderColor, {borderBottomWidth:1}]} source={{uri: ticketImage}}>
                    <View style={[globalStyles.elevate, {backgroundColor: 'black', width: '90%', marginLeft: 10, top: -10, borderWidth: 1,} , globalStyles.borderColor]}> 
                       <Text style={[globalStyles.bigTitleText, {color: 'white', paddingLeft: 5}]}>{ticketType}</Text> 
                    </View>
                </ImageBackground>
               
                
                <View style={[globalStyles.leftRightView, globalStyles.backgroundColor, globalStyles.borderColor, {marginLeft:15,marginBottom: 10, marginRight:15, borderTopWidth:1 }]}>
                    <View>
                        <View style={[globalStyles.iconTextView, {justifyContent: 'space-between'}]}>
                            <Text style={[globalStyles.titleText]}>{event}</Text>                                
                        </View>
                        <View style={[ globalStyles.iconTextView ]}>
                            <Ionicons name='location-sharp' size={28} color={globalStyles.iconColor.iconColor}/>
                            <Text style={[globalStyles.titleText]}> {place}</Text>
                        </View>
                        <Text style={[globalStyles.titleText]}>{price} CHF</Text>
                    </View>
                    <TouchableOpacity onPress={deleteItem} style={[globalStyles.backgroundColor, {alignSelf: 'flex-end'}]}>
                        <Ionicons name='trash-outline' size={40} color={globalStyles.iconColor.iconColor} />
                    </TouchableOpacity>
                </View>
            </View>
            
        
    )
};

export default CartItemCard;

CartItemCard.propTypes = {
    event: PropTypes.string,
    ticketType: PropTypes.string,
    ticketImage: PropTypes.string,
    price: PropTypes.number,
    itemID: PropTypes.string,
    ticket_id: PropTypes.string,
};