import React, { useEffect, useState} from 'react';
import { SafeAreaView, FlatList, View, ActivityIndicator } from 'react-native';
import EventCard from '../../assets/EventCard/EventCard';
import { collection, getFirestore, onSnapshot } from '@firebase/firestore';
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';
import { globalStyles } from '../../assets/styling/globalStyles';

export default function MainScreen() {

    //Database collection reference
    const collRef = collection(getFirestore(), 'events'); 
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const subscriber = onSnapshot(collRef, (snapshot) => {
        let events = [];
        snapshot.docs.forEach((doc) => {
            events.push({...doc.data(), id: doc.id});
        })
        setEvents(events);
        })
        
        return () => subscriber();
    }, [])
   
    //Rendering the view
    if (!events) {
        return(
            <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {flex: 1}]}>
                <ActivityIndicator size='large' color='white'/>
            </View>
        );
    } else {
        return (
            <SafeAreaView style={[globalStyles.backgroundColor, {flex: 1}]}>
                <FadeInFlatList
                    initialDelay={100}
                    durationPerItem={500}
                    parallelItems={5}
                    data={events}
                    renderItem={({item}) => (
                        <EventCard
                            title={item.name}
                            image={item.image}
                            description={item.details}
                            time={item.time}
                            place={item.place}
                            id={item.id}
                        />
                    )}
                    keyExtractor={item => item.id}
                    style={[globalStyles.backgroundColor, {flex: 1, marginTop:10 }]}
                    showsVerticalScrollIndicator={false}
                    
                />
            </SafeAreaView>
        );
    }
}

