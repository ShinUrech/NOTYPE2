import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import TicketQRCard from '../../assets/TicketQRCard/TicketQRCard';
import { collection, getFirestore, query, where,  getDoc, doc, onSnapshot, updateDoc} from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';
import { globalStyles } from '../../assets/styling/globalStyles';


export default function ClaimedTickets() {
    
  const db = getFirestore();
  const collRef = collection(db, 'ticketsBought');
  const q = query(collRef, where('user_id', '==', getAuth().currentUser.uid));

  const [tickets, setTickets] = useState(null);

  //Fetch tickets
  useEffect(() =>{
    const subscriber = onSnapshot(q, (snapshot) => {
      let tickets = [];
      snapshot.docs.forEach((docu) => {
        if(docu.data().claimed){
          tickets.push({...docu.data(), id: docu.id});
          
        }
      })
      const getItems = async () => {
        const ticketDocs = await Promise.all(tickets.map(c => getDoc(doc(getFirestore(), 'tickets', c.ticket_id))));
        const eventDocs = await Promise.all(ticketDocs.map(c => getDoc(doc(getFirestore(), 'events', c.data().event_id))));
        let items = [];
        for(i = 0; i < ticketDocs.length; i++){
                items.push({...ticketDocs[i].data(), time: eventDocs[i].data().time, place: eventDocs[i].data().place,  event_name: eventDocs[i].data().name, id: tickets[i].id});
                
        }
        setTickets(items);
      }
      getItems();
      
    })
    return () => subscriber();
  }, [])

  if (!tickets) {
    return (
      <View style={[{flex:1, justifyContent: 'center', alignItems: 'center'}, globalStyles.backgroundColor]}>
        <ActivityIndicator size='large' color='black'/> 
      </View>
    );
  }
  else{
    return (
        <View style={[globalStyles.backgroundColor, {flex: 1}]}>
          {tickets.length === 0?
              <View style={[{flex:1, justifyContent: 'center', alignItems: 'center'}, globalStyles.backgroundColor]}>
                <Text style={globalStyles.bigTitleText}>You don't have any tickets now, go ahead and buy some!</Text>
              </View>
            :
              <FadeInFlatList
              initialDelay={100}
              durationPerItem={500}
              parallelItems={5}
              style={[globalStyles.backgroundColor, {
                paddingVertical: 20,
              }]}
              data={tickets}
              renderItem={({item}) => (
                <TicketQRCard
                  ticketType={item.title}
                  eventTitle={item.event_name}
                  ticketNumber={item.id}
                  time={item.time}
                  place={item.place}
                />
              )}
              ListFooterComponent={
                <Text style={[globalStyles.paragraphText, {color: '#707070', paddingLeft: '3%', paddingBottom: 30}]}>
                  Tickets history page 
                </Text>
              }
              />
          }
        </View>
    );
  }
}