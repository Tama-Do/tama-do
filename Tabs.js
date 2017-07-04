import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { View } from 'react-native'

import ToDo from './components/ToDo';
import PetsContainer from './components/Pets';
import PetMap  from './components/PetMap';
import Treats from './components/Treats';
import FormView from './components/LocationSearchForm';
import PetContainer from './components/Pet';

import { TaskNavigator } from './components/ToDo';

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

const MapNavigator = StackNavigator({
    Map: {
      screen: PetMap,
      navigationOptions: {
        title: 'Map',
        headerStyle: {backgroundColor: '#EA7C8B', borderBottomWidth: 1, borderBottomColor: '#E16177'},
        headerTitleStyle: {color: 'white'},
      },
    },
    Form: {
      screen: FormView,
      navigationOptions: {
        title: 'Location Form'
    }
  }
})

let index = 0

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
    }
  },
  Map: {
    screen: MapNavigator,
    navigationOptions: {
      tabBarLabel: 'Map',
    }
  },
  Treats: {
    screen: Treats,
    navigationOptions: {
      tabBarLabel: 'Treats'
    },
  }
},
   {
    tabBarComponent: props => {
      index = props.navigation.state.index
      const activeColor = ["#8061A9", "#F0B52D", "#EA7C8B", "#4A8CAD"]
      return (
        <TabBarBottom
          {...props}
          activeTintColor = {activeColor[index]}
          inactiveTintColor = {"#737373"}
          activeBackgroundColor= {"#FFF"}
          inactiveBackgroundColor= {"#FFF"}
        />
      );
    },
  
})

