import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Modal from "react-native-modal";
import { globalStyles } from "../styling/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import {doc, onSnapshot, getFirestore} from "firebase/firestore"

const TicketQRCard = props => {
    const {
      ticketType,
      eventTitle,
      ticketNumber,
      time,
      place,
    } = props;

    const ticketRef = doc(getFirestore(), 'ticketsBought', ticketNumber)

    useEffect(() => {
       
        const subscriber = onSnapshot(ticketRef, (snapshot) => {
            setClaimed(snapshot.data().claimed)
        })
        return subscriber;
    })

    const [isModalVisible, setModalVisible] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return(
        <TouchableOpacity
            style={[globalStyles.cardContainer, globalStyles.elevate, globalStyles.backgroundColor,globalStyles.borderColor,{borderWidth:1}]}
            onPress={() => toggleModal()}
            activeOpacity={0.6}
        >
            <Text style={[globalStyles.bigTitleText, {paddingLeft: 10}]}>{ticketType}</Text>
            <View style={globalStyles.iconTextView}>
                <Ionicons name='golf-outline' size={25} color={globalStyles.iconColor.iconColor} />
                <Text style={[globalStyles.buttonText, {paddingLeft: 10}]}>{eventTitle}</Text>
            </View>
            <View style={globalStyles.iconTextView}>
                <Ionicons name='time-outline' size={25} color={globalStyles.iconColor.iconColor}/>
                <Text style={[globalStyles.buttonText, {paddingLeft: 10}]}>{time}</Text>
            </View>
            <View style={globalStyles.iconTextView}>
                <Ionicons name='location-outline' size={25} color={globalStyles.iconColor.iconColor} />
                <Text style={[globalStyles.buttonText, { paddingLeft: 10}]}>{place}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleModal()} style={[globalStyles.borderColor, {position: 'absolute', top: 10, right: 10, borderWidth: 1}]}>
                <QRCode
                    value={ticketNumber}
                    size={100}
                />
            </TouchableOpacity>
            <Text style={[globalStyles.paragraphText, {alignSelf: 'flex-end', padding: 10}]}>{ticketNumber}</Text>
            <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
                <View style={{alignItems: 'center'}}>
                <QRCode
                    value={ticketNumber}
                    size={300}
                    quietZone={10}
                />
                </View>
            </Modal>
        </TouchableOpacity>
    )
};

export default TicketQRCard;

TicketQRCard.propTypes = {
    ticketType: PropTypes.string,
    ticketNumber: PropTypes.string,
    time: PropTypes.string,
    place: PropTypes.string,
    eventTitle: PropTypes.string,
};