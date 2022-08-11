import React from "react";
import PropTypes from "prop-types";
import { Text, View, Dimensions, Image, ImageBackground, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from "../styling/globalStyles";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { cardContainer } from './../TicketCard/TicketCard.style';

const EventCard = props => {
  const {
    title,
    description,
    time,
    place,
    image,
    id,
  } = props;

  const navigation = useNavigation();

  return (
    <View style={[globalStyles.backgroundColor, globalStyles.cardContainer]}>
      <View style={[globalStyles.borderColor, {borderWidth: 1,paddingLeft:5}]}>
        <Text style={globalStyles.bigTitleText}>{title}</Text>
      </View>
      <View style={[globalStyles.borderColor, {borderBottomWidth: 1,borderLeftWidth: 1, borderRightWidth:1, }]}>
        
      <TouchableOpacity
          onPress={()=> navigation.navigate('EventDetails', {
            title: title, time: time, place: place, description: description, image: image, id: id
          })}
          activeOpacity={0.8}
        >
          <ImageBackground source={{uri: image}} style={[globalStyles.eventImage, globalStyles.elevate, {justifyContent: 'flex-end'}]}>
            <View style={[globalStyles.infoView, globalStyles.borderColor, {borderWidth:1}]}>
              <View>
                <View style={globalStyles.iconTextView}>
                <Ionicons name="time-outline" size={28} color={globalStyles.iconColor.iconColor} style={{marginRight: 5}}/>
                <Text style={[globalStyles.paragraphText, {color: globalStyles.iconColor.iconColor}]}>{time}</Text>
                </View>
                <View style={globalStyles.iconTextView}>
                <Ionicons name="location-outline" size={28} color={globalStyles.iconColor.iconColor} style={{marginRight: 5}}/>
                <Text style={[globalStyles.paragraphText, {color: globalStyles.iconColor.iconColor}]}>{place}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
       
        <View style={[globalStyles.elevate,{marginTop: 15}]}>
          <TouchableOpacity
            onPress={()=> navigation.navigate('EventDetails', {
              title: title, time: time, place: place, description: description, image: image, id: id,
            })}
            style={[globalStyles.eventButton, globalStyles.backgroundColor, globalStyles.borderColor, {borderWidth:1}]}
          >
            <Text style={globalStyles.buttonText}>Learn More</Text>
            <Ionicons name='chevron-forward-outline' size={32} color={globalStyles.iconColor.iconColor} style={{alignSelf: 'flex-end'}}/>
          </TouchableOpacity>
        </View>
    </View>
  );
};

EventCard.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  place: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
};

export default EventCard;
