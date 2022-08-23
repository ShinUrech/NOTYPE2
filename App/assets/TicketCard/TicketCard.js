import React, {useState} from "react";
import PropTypes from "prop-types";
import {View, Text, useWindowDimensions, ImageBackground, TouchableOpacity, Touchable} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styling/globalStyles";
import Modal from 'react-native-modal'
import { collection, getFirestore, addDoc, getDoc, updateDoc, doc} from '@firebase/firestore';
import { getAuth } from "firebase/auth";
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from "react-native";


const TicketCard = props => {

    const {
      ticketType,
      ticketImage,
      price,
      description,
      ticket_id,
      user,
      globalStyles,
    } = props;

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleModal = () =>{
        setModalVisible(!modalVisible);
    }

    const collRef = collection(getFirestore(), 'cartItems');
    
    

    
        
        const addItem = async () => {if(user !== null){
        const currUserId = getAuth().currentUser.uid;
        setLoading(true);

        //Check if the specified ticket is still available
        const ticketDoc = await getDoc(doc(getFirestore(), 'tickets', ticket_id));
        const availability = ticketDoc.data().availableNum;

        //If it is..
        if(!availability){

        }
        else if(availability != 0){

            //Add it to the cart
            addDoc(collRef, {
                ticket_id: ticket_id,
                user_id: currUserId,
                time: ticketDoc.data().time
            });

            //Delete from availability
            updateDoc(doc(getFirestore(), 'tickets', ticket_id),{
                availableNum: availability-1,
            })
            
            //Update user cart information
            const userDoc = await getDoc(doc(getFirestore(), 'Users', currUserId));
            const itemNum = userDoc.data().cart;
            const cartTotal = userDoc.data().total;

            updateDoc(doc(getFirestore(), 'Users', currUserId), {
                total: cartTotal + price,
                cart: itemNum + 1,
            })

            showMessage({
                message: "Ticket added to the cart!",
                description: "Go to the cart",
                type: "success",
            });
        }
        else{
            showMessage({
                message: "No more tickets available :(",
                description: "Try selecting another ticket",
                type: "warning",
            });
        }
       
        navigation.navigate('Cart');
        }}

    return(
        <View style={[globalStyles.cardContainer, globalStyles.backgroundColor, {
            width: useWindowDimensions().width-40,
            height: 370,
            marginHorizontal: 10,}]}>

            <Text style={globalStyles.bigTitleText}>{ticketType}</Text>
            
            <TouchableOpacity
                onPress={() => toggleModal()}
                activeOpacity={0.8}
            >
                <ImageBackground source={{uri: ticketImage}} style={[globalStyles.eventImage, globalStyles.elevateHeader, {width: '100%', height: 200}]}/>

            </TouchableOpacity>

            <View style={[globalStyles.iconTextView, globalStyles.backgroundColor]}>
                <Text style={[globalStyles.titleText, {fontSize: 22}]}>{price} CHF</Text>
            </View>

            <TouchableOpacity
                onPress={() => toggleModal()}
                style={[globalStyles.eventButton, globalStyles.elevate]}
            >
                <Text style={globalStyles.buttonText}>Details</Text>
                <Ionicons name='chevron-forward-outline' size={32} color={globalStyles.iconColor.iconColor} style={{alignSelf: 'flex-end'}}/>
            </TouchableOpacity>

            <View style={[{paddingTop:10}, globalStyles.backgroundColor]}>
               <Text style={globalStyles.paragraphText}>{description}</Text> 
            </View>

            <Modal isVisible={modalVisible} onBackdropPress={() => toggleModal()}>
                <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, globalStyles.borderColor, { borderWidth:1, width: '95%', alignSelf: 'center'}]}>
                    <View style={[globalStyles.leftRightView, {paddingVertical: 5}]}>
                        <Text style={[globalStyles.headerText]}>{ticketType}</Text>
                        <Ionicons onPress={() => toggleModal()} name={'close-outline'} size={40} color={globalStyles.iconColor.iconColor} style={{alignSelf: 'flex-end'}} />
                    </View>  

                    <View style={{width: '90%', height: 200, borderWidth:1}}>
                        <ImageBackground source={{uri: ticketImage}} style={[globalStyles.eventImage, globalStyles.elevateHeader,globalStyles.borderColor, {height:199}]}/>
                    </View>
                    
                    <Text style={[globalStyles.paragraphText, {paddingHorizontal: '5%', paddingVertical: 20}]}>{description}</Text>
                    {user ? <TouchableOpacity
                        onPress={() => addItem()}
                        style={[globalStyles.eventButton, globalStyles.backgroundColor, {borderWidth:0, justifyContent: 'center', alignItems: 'center', width: '100%'}]}
                    >
                        {loading? 
                            <ActivityIndicator size='large' color={globalStyles.iconColor.iconColor} /> 
                        :
                            <View style={[globalStyles.eventButton, globalStyles.backgroundColor, {borderLeftWidth:0,borderRightWidth:0, borderTopWidth:1, borderBottomWidth:0, width: '100%', opacity: user ? 1 : 0.3}]}>
                                <Text style={[globalStyles.buttonText, {fontSize: 22}]}>{price} CHF</Text>
                                <Ionicons name={'cart-outline'} size={28} color={globalStyles.iconColor.iconColor} />  
                            </View>
                        }
                    </TouchableOpacity>: 
                    <TouchableOpacity style={[globalStyles.eventButton, globalStyles.backgroundColor, globalStyles.borderColor, {borderWidth:1, justifyContent: 'center', alignItems: 'center', width: '95 %%', marginBottom: 10}]} onPress={() => navigation.navigate('Main', {screen: 'Profile'})}>
                        <Text style={[globalStyles.buttonText, {fontSize: 22}]}>Log In </Text>
                    </TouchableOpacity>}
                </View>
            </Modal>
        </View>
    )
};

export default TicketCard;

TicketCard.propTypes = {
    ticketType: PropTypes.string,
    ticketImage: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    ticket_id: PropTypes.string,
};
