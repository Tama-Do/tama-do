import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { ToDo } from './components/ToDo';
import Pets from './components/Pets';
import PetMap from './components/PetMap';
import Treats from './components/Treats';
import Form from './components/LocationSearchForm';

import { TaskNavigator } from './components/ToDo'

export const Tabs = TabNavigator({
  Main: {
    screen: TaskNavigator,
    navigationOptions: {
      tabBarLabel: 'ToDo'
    },
  },
  Pets: {
    screen: Pets,
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
