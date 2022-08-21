import RootNavigator from "./App/Navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./App/Navigation/AuthenticatedUserProvider";
import { ColorThemeContextProvider } from "./App/Navigation/ColorThemeProvider";
import React, {useEffect, useState, useCallback} from "react";
import {StripeProvider} from '@stripe/stripe-react-native';
import NetInfo from '@react-native-community/netinfo';
import { Text, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

function App() {

    SplashScreen.preventAutoHideAsync()

    const [connection, setConnection] = useState(true);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    

    useEffect(()=>{
      const unsubscribe = NetInfo.addEventListener(state => {
        setConnection(state.isConnected);
      });
      return () => unsubscribe(
      );
    }, [])

    useEffect(() => {
      async function prepare() {
        try {
          await Font.loadAsync({
            'Poppins-Regular': require('./App/assets/fonts/Poppins-Regular.ttf'),
            'RedHat-Regular': require('./App/assets/fonts/RedHatDisplay-Regular.ttf'),
            'RedHat-SemiBold': require('./App/assets/fonts/RedHatDisplay-SemiBold.ttf'),
            'Gilroy-Light': require('./App/assets/fonts/Gilroy-Light.otf'),
            'Gilroy-SemiBold': require('./App/assets/fonts/Gilroy-ExtraBold.otf'),
          });
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.warn(e);
        } finally {
          setFontsLoaded(true);
        }
      }
  
      prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
      if (connection && fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [connection, fontsLoaded])
  
    if (!(connection && fontsLoaded)) {
      return null;
    }
      return(
        <StripeProvider
          publishableKey="pk_test_51K54gUEPGBB5DQpHoqkYYDGKegvZvza8l1QUZr75ZP6aRhQYceN9IR8iFYQdELk1mZhGMp40O28UKzCt7vXYzndr003jft0aIc"
        >
          {connection?
            <ColorThemeContextProvider>
              <AuthenticatedUserProvider>
                <RootNavigator onReady={onLayoutRootView()}/>
              </AuthenticatedUserProvider>
            </ColorThemeContextProvider>
            
          :
            <View style={{flex:1, backgroundColor: '#292929', justifyContent: 'center', alignItems: 'center'}}>
              <Text>Connection lost...</Text>
              <ActivityIndicator size='large' color='white'/>
            </View>
          }
        </StripeProvider>
      );
    
}

export default App;
