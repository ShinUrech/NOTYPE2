import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import { auth} from '../../firebase';
import EventStack from './EventStack';
import { ColorThemeContext } from './ColorThemeProvider';

export default function RootNavigator(){

    const {user, setUser} = useContext(AuthenticatedUserContext);
    const {globalStyles} = useContext(ColorThemeContext)

    const [isLoading, setIsLoading] = useState(true);
 
    useEffect(() => {
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
        
        try {
          await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
        
      });
      // unsubscribe auth listener on unmount
      return unsubscribeAuth ;
      
    }, []);
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
  
    return (
      <NavigationContainer>
        <EventStack/>
      </NavigationContainer>
    );
}