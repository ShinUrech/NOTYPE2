import React, { useCallback, useEffect, useState} from "react";
import {View, ScrollView, Text, TouchableOpacity, ImageBackground, useWindowDimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TicketCard from "./../../assets/TicketCard/TicketCard";
import { useRoute} from "@react-navigation/native";
import { collection, getFirestore, onSnapshot, doc, query, where } from '@firebase/firestore';
import { globalStyles } from "../../assets/styling/globalStyles";
import { ActivityIndicator } from "react-native";
import { FadeInFlatList } from "@ja-ka/react-native-fade-in-flatlist";
import Modal from 'react-native-modal';
import {getStorage, ref, getDownloadURL, listAll, getBytes} from 'firebase/storage'
import {ImageGallery} from '@georstat/react-native-image-gallery'

function EventDetailsScreen ({navigation}){

    const compRef = React.useRef(null)

    const route = useRoute();

    const storageRef = ref(getStorage(), 'EventImages/'+ route.params.id)
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

            const pictures = [];

            pictures.push({id:1 ,url:route.params.image})

            const picList = await listAll(storageRef);

            var index = 2;

            picList.items.forEach(async picRef => {

            const url = await getDownloadURL(picRef);

            pictures.push({
                id: index, 
                url: url
            })
            index += 1
        })
        setEventPictures(pictures)
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const collRef1 = collection(getFirestore(), 'tickets'); 
    
    const [tickets, setTickets] = useState([]);
    const [picGalleryOpen, setPicGalleryOpen] = useState(false); 
    const [eventPictures, setEventPictures] = useState([{}])   


    const q1 = query(collRef1, where('event_id', '==', route.params.id));

    const [activeIndex, setActiveIndex] = useState(0);
    

    useEffect(() => {
        const subscriber = onSnapshot(q1, (snapshot) => {
        let tickets = [];
        snapshot.docs.forEach((doc) => {
            tickets.push({...doc.data(), id: doc.id});
        })
        setTickets(tickets);
        })
        return () => subscriber();
    }, [])
    
    if(!tickets){
        return(
            <View style={[globalStyles.mainBackgroundView, {flex: 1}]}>
                <ActivityIndicator size='large' color='white'/>
            </View>
        )
    }
    else{
        return(
            <ScrollView
                style={[{
                    paddingVertical: 30,
                }, globalStyles.backgroundColor]}
                contentContainerStyle={[globalStyles.mainBackgroundView, globalStyles.backgroundColor]} 
                ref={compRef}
            >
               <TouchableOpacity style={{borderColor: 'white', borderWidth: 1 ,width: '95%', justifyContent:'center', alignSelf:'center'}} onPress={() => {
                   setPicGalleryOpen(true)
                   }}>
                    <ImageBackground style={[globalStyles.eventImage, globalStyles.elevate, {width: '100%'}]} source={{uri: route.params.image}}>
                        <View style={[globalStyles.adjustableWidthInfoView, globalStyles.elevate, {borderWidth:1, borderColor: 'white'}]}>
                            <Text style={[globalStyles.bigTitleText, {color: 'white', paddingLeft: 5, alignSelf: 'flex-start'}]}>{route.params.title}</Text>
                        </View>
                    </ImageBackground>
               </TouchableOpacity>

                <ImageGallery close={() => setPicGalleryOpen(false)} isOpen={picGalleryOpen} images={eventPictures}/>

                <View style={[{width: '95%', borderWidth: 1, borderColor: 'white', borderTopWidth:0, paddingLeft: 10, paddingBottom:10, paddingRight: 5}, globalStyles.backgroundColor]}>
                    <View style={globalStyles.iconTextView}>
                        <Ionicons name="time-outline" size={28} color={globalStyles.iconColor.iconColor} style={{marginRight: 5}} />
                        <Text style={globalStyles.titleText}>{route.params.time}</Text>
                    </View>
                    <View style={globalStyles.iconTextView}>
                        <Ionicons name="location-outline" size={28} color={globalStyles.iconColor.iconColor} style={{marginRight: 5}} />
                        <Text style={globalStyles.titleText}>{route.params.place}</Text>
                    </View>
                
                    <Text style={[globalStyles.paragraphText, {fontSize: 20}]}>{route.params.description}</Text>
                </View>
                <TouchableOpacity style={[globalStyles.eventButton, globalStyles.elevate, {height: 60, width: '95%', alignItems: 'center', justifyContent:'center', marginVertical: 20}]} >
                    <Text style={[globalStyles.bigTitleText, {color: 'white', paddingVertical: 0}]} onPress={() => compRef.current.scrollToEnd({animate: true})}>Available Tickets</Text>
                </TouchableOpacity>
                

                <FadeInFlatList
                    initialDelay={250}
                    durationPerItem={500}
                    parallelItems={5}
                    data={tickets}
                    renderItem={({item}) => (
                        <View style={{borderWidth:1, borderColor: 'white', marginLeft: 3, marginRight: 3}}>
                            <TicketCard 
                            ticketType={item.title}
                            ticketImage={item.image}
                            price={item.price}
                            description={item.description}
                            fontFamily={route.params.fontFamily}
                            ticket_id={item.id}
                        />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    style={[ globalStyles.backgroundColor,{
                        paddingBottom: 40,
                    }]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={useWindowDimensions().width+6}
                    snapToAlignment={'center'}
                    decelerationRate={'fast'}
                    viewabilityConfig={{
                        viewAreaCoveragePercentThreshold: 50,
                        minimumViewTime: 50,
                    }}
                    onViewableItemsChanged={useCallback(({viewableItems}) => {
                        if(viewableItems.length > 0){
                            setActiveIndex(viewableItems[0].index || 0)
                        }
                        setActiveIndex
                    }, [])}
                />
                <View style={dots()}>
                    {tickets.map((ticket, index) =>(
                        <View key={index} style={[dot(), {backgroundColor: (index === activeIndex)? "#292929" : 'white'}]}/>
                    ))}
                </View>
            </ScrollView>
        );
    }
};

export default EventDetailsScreen;

function dot(){
    return{
        marginHorizontal: 5,
        height: 15,
        width: 15,
        borderRadius: 10,
        borderWidth: 1,
    }
}

function dots(){
    return{
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 50,
    }
}