import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ToDo from './components/ToDo';
import Pets from './components/Pets';
import PetMap from './components/PetMap';
import Treats from './components/Treats';

export const Tabs = TabNavigator({
  Main: {
    screen: ToDo,
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
