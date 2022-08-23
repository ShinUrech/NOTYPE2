import React, { useEffect, useState, useContext } from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import OrderCard from '../../assets/OrderCard/OrderCard';
import { collection, getFirestore, onSnapshot} from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ColorThemeContext } from '../../Navigation/ColorThemeProvider';
import { auth } from '../../../firebase';
import { AuthenticatedUserContext } from '../../Navigation/AuthenticatedUserProvider';


export default function OrderHistoryScreen(){

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true)
    const {globalStyles} = useContext(ColorThemeContext)
    const {user} = useContext(AuthenticatedUserContext)

    useEffect(() => {

        if(user !== null){
            
            const subscriber = onSnapshot(collection(getFirestore(), 'Users', user.uid, 'payments'), (snapshot) => {
            
            let orders = [];
            snapshot.docs.forEach((doc) => {
                orders.push({...doc.data(), id: doc.id});
            })
            setOrders(orders);
            setLoading(false)
        })
        return () => subscriber();
        
            }
    },[user]);

    if(loading){
        return(
        <View style={[{flex:1, justifyContent: 'center', alignItems: 'center'}, globalStyles.backgroundColor]}>
        <ActivityIndicator size='large' color='black'/> 
      </View>)
    }else {
        if(orders.length === 0){
        return(
            <View style={[globalStyles.mainBackgroundView,globalStyles.backgroundColor, {flex:1}]}>
                <Text style={[globalStyles.paragraphText, {paddingLeft: '3%', paddingBottom: 30}]}>You don't have any orders yet. Go get yourself a ticket!</Text>
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
                            globalStyles={globalStyles}
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
    }}
}