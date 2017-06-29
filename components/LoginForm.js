import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import LoginOldUser from './LoginOldUser'
import { loginUser } from '../reducers/login';
import { Card, CardSection, Input, Button, Spinner } from './common';
import AnimatedSprite from 'react-native-animated-sprite';
import monsterSprite from '../sprites/monster/monsterSprite';



class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      animationType: 'WALK',
    }

    this.onButtonPress = this.onButtonPress.bind(this)

  }

  onButtonPress() {
    this.props.loginUser(this.state.email, this.state.password);
  }

  renderButton() {
    return (
      <Button onPress={this.onButtonPress}>
        Sign Up
      </Button>
    );
  }


  render() {
    console.log("PROPSSSSSS", this.props)
    const { navigate } = this.props.navigation;

    return (
      <Card>
        <View style={styles.hello}>
          <Text style={styles.helloText}>Tama-Do</Text>
            <AnimatedSprite
            ref={'monsterRef'}
            sprite={monsterSprite}
            animationFrameIndex={monsterSprite.animationIndex(this.state.animationType)}
            loopAnimation={true}
            coordinates={{
              top: 10,
              left: 40,
            }}
            size={{
              width: monsterSprite.size.width * 1.5,
              height: monsterSprite.size.height * 1.5,
            }}
            draggable={false}
          />
        </View>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <TouchableOpacity onPress={() => {navigate('LoginOldUser')}}>
          <Text style={styles.loginTest}>
            Already Have An Account?
          </Text>
        </TouchableOpacity>

      </Card>
    );
  }
}


const styles = {
  hello: {
    height:425
  },
  helloText: {
    fontSize:50,
    alignSelf: 'center',
    fontFamily: "Courier"
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  },
  loginTest: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#3B5998'
  }
};


const mapStateToProps = ({email, password}) => {
  return {email, password}
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => {
    dispatch(loginUser(email, password))
  }
})


const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginNavigator = StackNavigator({
    LoginForm: { screen: LoginFormContainer,
      navigationOptions:{
        headerStyle:{
            backgroundColor: '#66ccff'
        }
      }
    },
    LoginOldUser: { screen: LoginOldUser,
      navigationOptions:{
        title: "Back To Sign Up",
        headerStyle:{
            backgroundColor: '#66ccff'
        }
      }
    }
})
