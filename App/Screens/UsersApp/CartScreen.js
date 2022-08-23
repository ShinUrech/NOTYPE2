import React , {useContext}from 'react';
import { StyleSheet, TouchableOpacity ,ScrollView, SafeAreaView, Text, View, FlatList, ActivityIndicator } from 'react-native';
import CartItemCard from '../../assets/CartItemCard/CartItemCard';
import { Ionicons } from '@expo/vector-icons';
import { collection, getFirestore, onSnapshot, query, where, getDoc, doc, setDoc} from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';
import { globalStyles } from '../../assets/styling/globalStyles';
import { AuthenticatedUserContext } from '../../Navigation/AuthenticatedUserProvider';
import { ColorThemeContext } from '../../Navigation/ColorThemeProvider';
import { auth } from '../../../firebase';

export default function CartScreen() {

    const [ItemData, setItemData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [itemNumber, setItemNumber] = useState(0);
    
    const {globalStyles} = useContext(ColorThemeContext)
    const {user} = useContext(AuthenticatedUserContext)
   

    const navigation = useNavigation();

    useEffect(() => {
        if(auth.currentUser !== null) {
        const collRef = collection(getFirestore(), 'cartItems');
        const q = query(collRef, where('user_id', '==', getAuth().currentUser.uid));
       try{ const subscriber = onSnapshot(q, (snapshot) => {
            let cartItems = [];
            snapshot.docs.forEach((document) => {
                cartItems.push({...document.data(), id: document.id});
            })
            const getItems = async () => {
                const ticketDocs = await Promise.all(cartItems.map(c => getDoc(doc(getFirestore(), 'tickets', c.ticket_id))));
                const eventDocs = await Promise.all(ticketDocs.map(c => getDoc(doc(getFirestore(), 'events', c.data().event_id))));
                let items = [];
                for(let i = 0; i < ticketDocs.length; i++){
                    items.push({...ticketDocs[i].data(), ticket_id: ticketDocs[i].id, event_name: eventDocs[i].data().name, id: cartItems[i].id});
                }
                setItemData(items);
            }
            getItems();
        })
        return () => subscriber();} catch(error){}
        
    }}, [auth.currentUser])

    //Updating cart SubTotal
    useEffect(() => {
         if(auth.currentUser !== null) {
            try{const subscriber = onSnapshot(doc(getFirestore(), 'Users', getAuth().currentUser.uid), (snapshot) => {
            setTotal(snapshot.data().total);
            setItemNumber(snapshot.data().cart);
        })
        return () => subscriber();}catch(error){}}
    }, [auth.currentUser]);
    //Proceeding to checkout screen
    
    const initializeCheckout = () => {
     
        if(auth.currentUser !== null){
            setLoading(true);  
        
        //write initial payment data
        const writePaymentDetails = async () => {
                await setDoc(doc(getFirestore(), 'customers', getAuth().currentUser.uid, 'checkout_sessions', getAuth().currentUser.uid),{
                client: 'mobile',
                mode: 'payment',
                amount: total*100,
                currency: 'chf',
            });}
        writePaymentDetails();
    }

    
    }

    //Wait for the firebase functions to add additional data before moving forward
    useEffect(() => {
        
        if(auth.currentUser !== null) {   
            try {const subscriber = onSnapshot(doc(getFirestore(), 'customers', getAuth().currentUser.uid, 'checkout_sessions', getAuth().currentUser.uid), (snapshot) => {

                try{
                    if(typeof snapshot.data().ephemeralKeySecret !== 'undefined' && typeof snapshot.data().paymentIntentClientSecret !== 'undefined' && typeof snapshot.data().customer !== 'undefined'){
                       
                        setLoading(false);
                    navigation.navigate('Checkout');
                    return () => subscriber();
                }} catch(error){
                    setLoading(false)
                }
        })
        return () => subscriber();}
        catch(error){}
    }
        
    }, [auth.currentUser]);

    //Fetching and updating cart items
    if(user !== null){
    if (!ItemData) {
        return(
            <View style={[globalStyles.mainBackgroundView, globalStyles.backgroundColor, {flex: 1}]}>
                <ActivityIndicator size='large' color={globalStyles.iconColor.iconColor}/>
            </View>
        );
    } else {
        return (
            <View style={{flex: 1}}>
                {ItemData.length == 0?
                    <View style={[{flex:1, justifyContent: 'center', alignItems: 'center'}, globalStyles.backgroundColor]}>
                        <Text style={[globalStyles.bigTitleText, {paddingHorizontal: '5%'}]}>You have no items in your cart, add some!</Text>
                    </View>
                :
                    <FadeInFlatList
                        initialDelay={100}
                        durationPerItem={500}
                        parallelItems={5}
                        data={ItemData}
                        renderItem={({item}) => (
                            <CartItemCard
                                event={item.event_name}
                                ticketType={item.title}
                                ticketImage={item.image}
                                price={item.price}
                                itemID={item.id}
                                ticket_id={item.ticket_id}
                                place={item.place}
                                globalStyles={globalStyles}
                            />
                        )}
                        keyExtractor={item => item.id}
                        style={[{
                            flex: 1,
                            paddingTop: 20,
                            paddingBottom: 30,
                        }, globalStyles.backgroundColor]}
                        ListFooterComponent={
                            <View style={globalStyles.backgroundColor}>
                                <View style={globalStyles.leftRightView}>
                                    <Text style={[globalStyles.titleText, {paddingLeft: '5%'}]}>Total:</Text>
                                    <Text style={[globalStyles.titleText, {paddingRight: '5%'}]}>{total} CHF</Text>
                                </View>
                                <View style={[globalStyles.leftRightView, {marginBottom:10}]}>
                                    <Text style={[globalStyles.titleText, {paddingLeft: '5%'}]}>Items:</Text>
                                    <Text style={[globalStyles.titleText, {paddingRight: '5%'}]}>x{itemNumber}</Text>
                                </View>
                                <TouchableOpacity onPressOut={initializeCheckout} disabled={loading || total == 0} style={{paddingBottom: 30}}>
                                    {loading? 
                                        <View style={[globalStyles.eventButton, {justifyContent: 'center', width: '95%', alignSelf: 'center'}]}>
                                            <ActivityIndicator size='large' color={globalStyles.iconColor.iconColor}/> 
                                        </View>
                                    :
                                        <View style={[globalStyles.eventButton,globalStyles.elevate, {width: '95%', alignSelf: 'center'}]}>
                                            <Text style={[globalStyles.titleText, { paddingVertical: 0}]}>To Checkout</Text>
                                            <Ionicons name={"chevron-forward-outline"} size={30} color={globalStyles.iconColor.iconColor}/>
                                        </View>
                                    }  
                                </TouchableOpacity> 
                            </View>
                        }
                    />    
                }
            </View>
        );
    }
    } else {
        return (
        
        <View style={[{flex:1, justifyContent: 'center', alignItems: 'center'}, globalStyles.backgroundColor]}>
            <Text style={[globalStyles.bigTitleText, {paddingHorizontal: '5%'}]}>Create your NOTYPE. to get your tickets!</Text>
        </View>)
    }
}