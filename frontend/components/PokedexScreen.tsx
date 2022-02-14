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

// type PokemonType = 'Grass' | 'Fire' | 'Water' | 'Bug' | 'Normal';

const categories = [
  {
    itemName: 'Grass',
  },
  {
    itemName: 'Fire',
  },
  {
    itemName: 'Water',
  },
  {
    itemName: 'Bug',
  },
  {
    itemName: 'Normal',
  },
];

const PokedexScreen: React.FC = () => {
  // navigationNULL_POKEMONn, setPokemon] = useState<Pokemon>(NULL_POKEMON);

  const [category, setCategory] = useState<string>('Grass');
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([NULL_POKEMON]);

  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      input: {
        type: category,
      },
    },
  });
  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      setPokemons(data.listPokemon.pokemon);
      console.log('data', pokemons, loading, data, '2nd');
    }
    // console.log(loading, loading == false, data, 'lod', error);
  }, [loading, data, pokemons, category]);

  return (
    <View style={styles.viewStyle}>
      <View>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.textStyle}>Type</Text>
        </View>
        <View style={{ flex: 0.7, fontSize: 14 }}>
          <Picker
            itemStyle={styles.itemStyle}
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={category}
            onValueChange={setCategory}
          >
            {categories.map((item, index) => (
              <Picker.Item
                color="#0087F0"
                label={item.itemName}
                value={item.itemName}
                key={index}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        {/* why the fuck is react native so messy... https://reactnative.dev/docs/flatlist#required-renderitem */}
        <FlatList
          data={pokemons}
          renderItem={({ item, index, separators }) => (
            <PokedexEntry
              id={item.id}
              name={item.name}
              type={item.type}
              totalPoints={item.totalPoints}
            />
          )}
          // keyExtractor={(item: Pokemon) => item.id}
        />
      </View>
    </View>
  );
};

{
  /* <View>
  <FlatList
    data={pokemon}
    renderItem={PokedexEntry}
    keyExtractor={(item) => item.id}
  />
</View> */
}

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
