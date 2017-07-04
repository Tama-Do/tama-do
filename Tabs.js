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
      console.log('props', props.navigation.state.index)
      const activeColor = props.position.interpolate({
        inputRange: [0,1,2],
        outputRange: ['#e74c3c','#9b59b6','#3498db'],
      })
      return (
        <TabBarBottom
          {...props}
        />
      );
    },
  
})

