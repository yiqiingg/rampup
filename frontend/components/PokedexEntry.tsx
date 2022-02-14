import React, { Component, useState, useEffect } from 'react';
import { View, Text } from 'react-native';

type Pokemon = {
  id: number;
  name: string;
  type: string;
  totalPoints: number;
};

const PokedexEntry: React.FC = ({ id, name, type, totalPoints }: Pokemon) => {
  return (
    <View
      style={{
        backgroundColor: '#C0C0C0',
        width: '80%',
        margin: 'auto',
        marginTop: '3%',
      }}
    >
      <Text>{name}</Text>
      <Text>{type}</Text>
      <Text>{totalPoints}</Text>
    </View>
  );
};

export default PokedexEntry;
