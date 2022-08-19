import React, {useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity ,ScrollView, SafeAreaView, Text, View, FlatList} from 'react-native';
import { collection, getFirestore,  query, where, deleteDoc, getDoc, doc, getDocs, updateDoc, addDoc } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { ColorThemeContext } from '../../Navigation/ColorThemeProvider';


export default function CheckoutScreen() {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const {globalStyles} = useContext(ColorThemeContext)
  
    const fetchPaymentSheetParams = async () => {

        const checkoutSessionDoc = await getDoc(doc(getFirestore(), 'customers', getAuth().currentUser.uid, 'checkout_sessions', getAuth().currentUser.uid));
        const paymentIntent = checkoutSessionDoc.data().paymentIntentClientSecret;
        const ephemeralKey = checkoutSessionDoc.data().ephemeralKeySecret;
        const customer = checkoutSessionDoc.data().customer;
    
        return{
            paymentIntent: paymentIntent,
            ephemeralKey: ephemeralKey,
            customer: customer,
        };
    };
  
    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();
    
        const init = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
        });
        
        if(!init){
            setLoading(true);
        }
        else{
            setLoading(false);
        }

    };
  
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            //Inform about the error
            showMessage({
                message: 'Payment unsuccessful:' + error.code,
                description: error.message,
                type: 'danger',
            });

            //Delete a checkout_session
            await deleteDoc(doc(getFirestore(), 'customers', getAuth().currentUser.uid, 'checkout_sessions', getAuth().currentUser.uid));

            //Go back to the cart screen
            navigation.navigate('cart');
        } else {
            //Inform about success
            showMessage({
                message: "Success!",
                description: "Your order is confirmed!",
                type: "success",
            });

            //Fetch cartItems
            let cartItems = [];
            (await getDocs(query(collection(getFirestore(), 'cartItems'), where('user_id', '==', getAuth().currentUser.uid))))
                .forEach((doc) =>{
                    cartItems.push({...doc.data(), id: doc.id});
            })

            
            //add each item as a boughtTicket
            const addDocs = await Promise.all(cartItems.map(c => addDoc(collection(getFirestore(), 'ticketsBought'), {
                ticket_id: c.ticket_id,
                user_id: c.user_id,
                time:c.time, 
                claimed: false,
            })));
            addDocs;

            //delete each cartItem
            const deleteDocs = await Promise.all(cartItems.map(c => deleteDoc(doc(getFirestore(), 'cartItems', c.id))));
            deleteDocs;

            //update User info
            const updateInfo = await updateDoc(doc(getFirestore(), 'Users', getAuth().currentUser.uid), {
                cart: 0,
                total: 0,
            })
            updateInfo;

            //Remove a checkout_session
            await deleteDoc(doc(getFirestore(), 'customers', getAuth().currentUser.uid, 'checkout_sessions', getAuth().currentUser.uid));

            //go back and then to the bought tickets section
            navigation.navigate('Tickets');
        }
  };
  
    useEffect(() => {
        initializePaymentSheet();
    }, []);
  
    return (
        <View style={[{flex: 1, justifyContent: 'center'}, globalStyles.backgroundColor]}>
            <TouchableOpacity
                disabled={loading}
                onPress={openPaymentSheet}
            >
                <View style={[globalStyles.eventButton, globalStyles.elevate, {height: 80, width: '90%', alignSelf: 'center'}]}>
                        <Text style={[globalStyles.headerText]}>Start a payment</Text>
                        <Ionicons name={"chevron-forward-outline"} size={30} color={'white'}/>
                </View>
            </TouchableOpacity>
            <Text style={[globalStyles.paragraphText, {paddingHorizontal: '5%', paddingVertical: 10}]}>Press the button to start your payment powered by Stripe.</Text>
        </View>
        
    );
  }