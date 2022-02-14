import React, { Component, useState, useEffect } from 'react';
import { Picker, View, Text, StyleSheet, FlatList } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import PokedexEntry from './PokedexEntry';

type Pokemon = {
  id: number;
  name: string;
  type: string;
  totalPoints: number;
};

const NULL_POKEMON: Pokemon = {
  id: -1,
  name: 'you did an oopsie',
  type: 'you did an oopsie',
  totalPoints: -1,
};

const GET_POKEMON = gql`
  query Query($input: ListPokemonRequest) {
    listPokemon(input: $input) {
      pokemon {
        id
        name
        type
        totalPoints
      }
    }
  }
`;

const categories = ['Grass', 'Fire', 'Water', 'Bug', 'Normal'];

const PokedexScreen: React.FC = () => {
  // Variables to query by
  const [category, setCategory] = useState<string>('Grass');
  // const [totalPoints, setTotalPoints] = useState<number>(0); // Note: should query for points > totalPoints
  // const [name, setName] = useState<string>('');

  // List of returned pokemon objects
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([NULL_POKEMON]);

  // Set up page navigation
  const navigation = useNavigation();

  // Set up graphql stuff
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      input: {
        type: category,
      },
    },
  });

  // Update `pokemons` state variable to reflect data returned by server, when the server responds with new data.
  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      setPokemons(data.listPokemon.pokemon);
      console.log('data', pokemons, loading, data, '2nd');
    }
    // console.log(loading, loading == false, data, 'lod', error);
  }, [loading, data, pokemons, category]); // if any of the state variables in array change, rerun function passed to useEffect

  return (
    <View>
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',
        }}
      >
        <View style={{ flex: 0.3 }}>
          <Text style={styles.textStyle}>Type</Text>
        </View>
        <View style={{ flex: 0.3, fontSize: 14 }}>
          <Picker
            itemStyle={styles.itemStyle}
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={category}
            onValueChange={setCategory}
          >
            {categories.map((category, index) => (
              <Picker.Item
                color="#0087F0"
                label={category}
                value={category}
                key={index}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        {/* https://reactnative.dev/docs/flatlist#required-renderitem */}
        <FlatList
          data={pokemons} // [{}, {}, {}] <= each of these objects is "item"
          renderItem={({ item, index, separators }) => (
            <PokedexEntry
              id={item.id}
              name={item.name}
              type={item.type}
              totalPoints={item.totalPoints}
            />
          )}
          // keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default PokedexScreen;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '92%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#007aff',
  },
  pickerStyle: {
    width: '100%',
    height: 40,
    color: '#007aff',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
