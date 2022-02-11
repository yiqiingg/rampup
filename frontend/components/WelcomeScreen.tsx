import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {}; // TODO: ???

const WelcomeScreen: React.FC = () => {
  const [name, setName] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamList>>();

  return (
    <View>
      <Text>Please enter trainer name to login!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <Button
        onPress={() => {
          console.log(name);
          console.log('Navigating to Pokedex screen');

          navigation.navigate('Pokedex');
          /**
           * TODO: empty text input, display error
          if (name) {
            navigation.navigate('Pokedex');
          } else {
            
          } */
        }}
        title="Enter"
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default WelcomeScreen;
