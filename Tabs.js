import React from 'react';
import store from './store';
import { auth } from './firebase';
import {logoutUser} from './reducers/login';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import ToDo from './components/ToDo';
import PetsContainer from './components/Pets';
import PetMap from './components/PetMap';
import Treats from './components/Treats';
import FormView from './components/LocationSearchForm';
import PetContainer from './components/Pet';
import EditPet from './components/EditPet';
import RenamePet from './components/RenamePet';

// Get permission to use the user's location
import { _getLocationAsync } from './components/helpers/distance';
_getLocationAsync();

const Logout = () => {
  return (
    <TouchableOpacity onPress={() => { auth.signOut().then(() => {
      logoutUser()
    })}}>
      <Image style={{height: 20, width: 20}} source={require('./images/signout_icon.png')}/>
    </TouchableOpacity>
  )

}

const TaskNavigator = StackNavigator({
  Todos: {
    screen: ToDo,
    navigationOptions: {
      title: 'ToDo List',
      headerRight: Logout(),
      headerStyle: {
        backgroundColor: '#8061A9',
        borderBottomWidth: 1,
        borderBottomColor: '#6D45AD',
        paddingRight: 10
      },
      headerTitleStyle: { color: 'white' },
    }
  }
})

const PetNavigator = StackNavigator({
    Pets: {
      screen: PetsContainer,
      navigationOptions: {
        title: 'Pets',
        headerRight: Logout(),
        headerStyle: {
          backgroundColor: '#F0B52D',
          borderBottomWidth: 1,
          borderBottomColor: '#EAA00C',
          paddingRight: 10
        },
        headerTitleStyle: {color: 'white'},
      }
    },
    Pet: {
      screen: PetContainer,
      navigationOptions: {
        headerRight: Logout(),
        headerStyle: {
          backgroundColor: '#F0B52D',
          borderBottomWidth: 1,
          borderBottomColor: '#EAA00C',
          paddingRight: 10
        },
        headerTitleStyle: {color: 'white'},
      }
    },
    EditPet: {
      screen: EditPet,
      navigationOptions: {
        title: 'Update Pet',
        headerRight: Logout(),
        headerStyle: {
          backgroundColor: '#F0B52D',
          borderBottomWidth: 1,
          borderBottomColor: '#EAA00C',
          paddingRight: 10
        },
        headerTitleStyle: {color: 'white'},
      }
    },
    RenamePet: {
      screen: RenamePet,
      navigationOptions: {
        title: 'Rename Pet',
        headerRight: Logout(),
        headerStyle: {
          backgroundColor: '#F0B52D',
          borderBottomWidth: 1,
          borderBottomColor: '#EAA00C',
          paddingRight: 10
        },
        headerTitleStyle: {color: 'white'},
      }
    },
    Form: {
      screen: FormView,
      navigationOptions: {
        title: 'Update Pet',
        headerRight: Logout(),
        headerStyle: {
          backgroundColor: '#EA7C8B',
          borderBottomWidth: 1,
          borderBottomColor: '#E16177',
          paddingRight: 10
        },
        headerTitleStyle: {color: 'white'},
      }
    }
})

const MapNavigator = StackNavigator({
  Map: {
    screen: PetMap,
    navigationOptions: {
      title: 'Map',
      headerRight: Logout(),
      headerStyle: {
        backgroundColor: '#EA7C8B',
        borderBottomWidth: 1,
        borderBottomColor: '#E16177',
        paddingRight: 10
      },
      headerTitleStyle: { color: 'white' },
    },
  },
  Form: {
    screen: FormView,
    navigationOptions: {
      title: 'Location Form',
      headerRight: Logout(),
      headerStyle: {
        backgroundColor: '#EA7C8B',
        borderBottomWidth: 1,
        borderBottomColor: '#E16177',
        paddingRight: 10
      },
      headerTitleStyle: { color: 'white' },
    },
  },
  Pet: {
    screen: PetContainer,
    navigationOptions: {
      headerRight: Logout(),
      headerStyle: {
        backgroundColor: '#F0B52D',
        borderBottomWidth: 1,
        borderBottomColor: '#EAA00C',
        paddingRight: 10
      },
      headerTitleStyle: { color: 'white' },
    }
  }
})

const TreatNavigator = StackNavigator({
  Treats: {
    screen: Treats,
    navigationOptions: {
      title: 'Treats',
      headerRight: Logout(),
      headerStyle: {
        backgroundColor: '#4A8CAD',
        borderBottomWidth: 1,
        borderBottomColor: '#057BAA',
        paddingRight: 10
      },
      headerTitleStyle: { color: 'white' },
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
          style={[{ marginBottom: 10 }, { tintColor: tintColor }]}
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
          style={[{ marginBottom: 10 }, { tintColor: tintColor }]}
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
          style={[{ marginBottom: 10 }, { tintColor: tintColor }]}
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
          style={[{ marginBottom: 0, height: 17, width: 46 }, { tintColor: tintColor }]}
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
          activeTintColor={activeColor[index]}
          inactiveTintColor={"#737373"}
          activeBackgroundColor={"#FFF"}
          inactiveBackgroundColor={"#FFF"}
          style={{
            backgroundColor: '#FFF',
            height: 60
          }}
        />
      );
    },
  })

