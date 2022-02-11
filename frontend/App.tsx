import React from 'react';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import PokedexScreen from './components/PokedexScreen.tsx';

/** Set up navigation between pages */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
        <Stack.Screen name="Pokedex" component={PokedexScreen} />
      </Stack.Navigator>
      {/* <View style={styles.container}>
        <PokedexScreen />
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
