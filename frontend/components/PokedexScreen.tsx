import React, { Component } from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';

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

type PokemonType

export default const CategoryScreen: React.FC = ({ navigation }) => {
  const [category, setCategory] = useState<PokemonType>();
}

export default class CategoryScreen extends Component {
  state = {
    selectedcat: '',
    category: [
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
    ],
  };

  async onValueChangeCat(value) {
    this.setState({ selectedcat: value });
  }

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { type:"Grass" },
  });

  console.log(error,data,loading)

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.textStyle}>Type</Text>
        </View>
        <View style={{ flex: 0.7, fontSize: 14 }}>
          <Picker
            itemStyle={styles.itemStyle}
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={this.state.selectedcat}
            onValueChange={this.onValueChangeCat.bind(this)}
          >
            {this.state.category.map((item, index) => (
              <Picker.Item
                color="#0087F0"
                label={item.itemName}
                value={item.itemName}
                index={index}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '92%',
    justifyContent: 'space-between',
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
