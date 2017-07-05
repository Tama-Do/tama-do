import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { View, Image } from 'react-native'

import ToDo from './components/ToDo';
import PetsContainer from './components/Pets';
import PetMap  from './components/PetMap';
import Treats from './components/Treats';
import FormView from './components/LocationSearchForm';
import PetContainer from './components/Pet';
import EditPet from './components/EditPet';


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
      screen: PetContainer,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#F0B52D',
          borderBottomWidth: 1,
          borderBottomColor: '#EAA00C'
        },
        headerTitleStyle: {color: 'white'},
      }
    },
    EditPet: {
      screen: EditPet,
      navigationOptions:{
        title: 'Pets'
      }
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
        title: 'Location Form',
        headerStyle: {
          backgroundColor: '#EA7C8B',
          borderBottomWidth: 1,
          borderBottomColor: '#E16177'
        },
        headerTitleStyle: {color: 'white'},
      },
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

let index = 0

export const Tabs = TabNavigator({
  Main: {
    screen: TaskNavigator,
    navigationOptions: {
      tabBarLabel: 'ToDo',
      tabBarIcon: ({ tintColor }) => (
      <Image
        source={index === 0 ? require('./images/task_icon.png') : require('./images/task_icon_inactive.png')}
        style={[{marginBottom: -3}, {tintColor: tintColor}]}
      />
    ),
    },
  },
  Pets: {
    screen: PetNavigator,
    navigationOptions: {
      tabBarLabel: 'Pets',
      tabBarIcon: ({ tintColor }) => (
      <Image
        source={index === 1 ? require('./images/pet_icon.png') : require('./images/pet_icon_inactive.png')}
        style={[{marginBottom: -3}, {tintColor: tintColor}]}
      />
    ),
    },
  },
  Map: {
    screen: MapNavigator,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => (
      <Image
        source={index === 2 ? require('./images/map_icon.png') : require('./images/map_icon_inactive.png')}
        style={[{marginBottom: -3}, {tintColor: tintColor}]}
      />
    ),
    },
  },
  Treats: {
    screen: TreatNavigator,
    navigationOptions: {
      tabBarLabel: 'Treats',
      tabBarIcon: ({ tintColor }) => (
      <Image
        source={index === 3 ? require('./images/treat_icon.png') : require('./images/treat_icon_inactive.png')}
        style={[{marginBottom: -7, height: 17, width: 46},{tintColor: tintColor}]}
      />
    ),
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
          style = {{
            backgroundColor: '#FFF',
            height: 60
          }}
        />
      );
    },

})
