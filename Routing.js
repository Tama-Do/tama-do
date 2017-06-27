import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import PetsContainer from './components/Pets';
import PetContainer from './components/Pet';
import ToDoContainer from './components/ToDo';
import AddTask from './components/AddTask';
import PetMap from './components/PetMap';
import Treats from './components/Treats';
import Form from './components/LocationSearchForm';

const TaskNavigator = StackNavigator({
    ToDo: {
      screen: ToDoContainer,
      navigationOptions: {
        title: 'My To-Do List'
      }
    },
    AddTask: { screen: AddTask }
})

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
    screen: TaskNavigator,
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
  Form: {
    screen: Form,
    navigationOptions: {
      tabBarLabel: 'Form'
    }
  },
  Treats: {
    screen: Treats,
    navigationOptions: {
      tabBarLabel: 'Treats'
    },
  }
})
