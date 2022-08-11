import React, { useEffect, useState } from 'react';
import {View, Text, FlatList} from 'react-native';
import { globalStyles } from '../../assets/styling/globalStyles';
import OrderCard from '../../assets/OrderCard/OrderCard';
import { collection, getFirestore, query, where,  getDoc, doc, onSnapshot} from '@firebase/firestore';
import { getAuth } from 'firebase/auth';


export default function OrderHistoryScreen(){

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const subscriber = onSnapshot(collection(getFirestore(), 'Users', getAuth().currentUser.uid, 'payments'), (snapshot) => {
            let orders = [];
            snapshot.docs.forEach((doc) => {
                orders.push({...doc.data(), id: doc.id});
            })
            setOrders(orders);
        })
        return () => subscriber;
    },[]);

    if(orders.length === 0){
        return(
            <View style={[globalStyles.mainBackgroundView, {flex:1}]}>
                <Text style={[globalStyles.paragraphText, {color: '#707070', paddingLeft: '3%', paddingBottom: 30}]}>You don't have any orders yet. Go get yourself a ticket!</Text>
            </View>
        )

    } else {
        return(
            <View style={{flex: 1}}>
                <FlatList
                    style={[globalStyles.backgroundColor, {
                        flex: 1,
                        paddingVertical: 20,
                    }]}
                    data={orders}
                    renderItem={({item}) => (
                        <OrderCard
                            amount={item.amount}
                            paymentIntent={item.paymentIntent}
                            date={item.date}
                        />
                    )}
                    ListFooterComponent={
                        <Text style={[globalStyles.paragraphText, {color: '#707070', paddingLeft: '3%', paddingBottom: 30}]}>
                            Long press the payment number to copy it.
                        </Text>
                    }
                />
            </View>
        )
    }
}