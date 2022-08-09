import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import {auth, database } from '../../../firebase'
import { getDoc, doc, updateDoc} from 'firebase/firestore' 
import {globalStyles} from '../../assets/styling/globalStyles'

export default function QrCodeScanner() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {

    setScanned(true);

    try{
      const ref1 = doc(database, 'ticketsBought', data) 
      
      updateDoc(ref1, { claimed: true})
      const ref2 = doc(database, 'Users', auth.currentUser.uid)
      const document =  (await getDoc(ref2)).data();
      navigation.navigate('DisplayTicket', {name: document.name, surname: document.surname, birthdate: document.birthdate, phoneNumber: document.phoneNumber, claimed: document.claimed})
      setScanned(false)
    } catch(error){
      console.log(error)
      Alert.alert('No matching ticket found','No matching ticket was found. You might have shown the wrong ticket',[{
        title:'ok',
        onPress: () => setScanned(false)
      }])
    }
    
    
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  

  return (
    <View style={[styles.container, globalStyles.backgroundColor]}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
