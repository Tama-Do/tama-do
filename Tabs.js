import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { ToDo } from './components/ToDo';
import PetsContainer from './components/Pets';
import PetMap from './components/PetMap';
import Treats from './components/Treats';
import Form from './components/LocationSearchForm';
import PetContainer from './components/Pet';

import { TaskNavigator } from './components/ToDo'

const PetNavigator = StackNavigator({
    Pets: {
      screen: PetsContainer,
      navigationOptions: {
        title: 'My Monsters'
      }
    },
    Pet: {
      screen: PetContainer
    }
})

export const Tabs = TabNavigator({
  Main: {
    screen: ToDo,
    navigationOptions: {
      tabBarLabel: 'ToDo'
    },
  },
  Pets: {
    screen: PetNavigator,
    navigationOptions: {
      tabBarLabel: 'Pets'
    },
  },
  Map: {
    screen: PetMap,
    navigationOptions: {
      tabBarLabel: 'Map'
    },
  },
  Treats: {
    screen: Treats,
    navigationOptions: {
      tabBarLabel: 'Treats'
    },

  }
})
