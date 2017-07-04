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




const TaskNavigator = StackNavigator({
  Todos: {
    screen: ToDo,
    navigationOptions: {
      title: 'ToDo List',
      headerStyle: {
          backgroundColor: '#8061A9',
          borderBottomWidth: 1,
          borderBottomColor: '#6D45AD'
        },
        headerTitleStyle: {color: 'white'},
    }
  }
})


const PetNavigator = StackNavigator({
    Pets: {
      screen: PetsContainer,
      navigationOptions: {
        title: 'Pets',
        headerStyle: {
          backgroundColor: '#F0B52D',
          borderBottomWidth: 1,
          borderBottomColor: '#EAA00C'
        },
        headerTitleStyle: {color: 'white'},
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
        headerStyle: {
          backgroundColor: '#EA7C8B',
          borderBottomWidth: 1,
          borderBottomColor: '#E16177'
        },
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

const TreatNavigator = StackNavigator({
  Treats: {
    screen: Treats,
    navigationOptions: {
      title: 'Treats',
      headerStyle: {
          backgroundColor: '#4A8CAD',
          borderBottomWidth: 1,
          borderBottomColor: '#057BAA'
        },
        headerTitleStyle: {color: 'white'},
      },
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
    }
  },
  Map: {
    screen: MapNavigator,
    navigationOptions: {
      tabBarLabel: 'Map',
    }
  },
  Treats: {
    screen: TreatNavigator,
    navigationOptions: {
      tabBarLabel: 'Treats',
      headerStyle: {
          backgroundColor: '#EA7C8B',
          borderBottomWidth: 1,
          borderBottomColor: '#E16177'
        },
        headerTitleStyle: {color: 'white'}
    },
  }
},
   {
    tabBarComponent: props => {
      const backgroundColor = props.position.interpolate({
        inputRange: [0,1,2],
        outputRange: ['#e74c3c','#9b59b6','#3498db'],
      })
      return (
        <TabBarBottom
          {...props}
          style={{backgroundColor}}
        />
      );
    },

})

