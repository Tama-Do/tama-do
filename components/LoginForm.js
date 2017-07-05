import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import LoginOldUser from './LoginOldUser'
import { loginUser } from '../reducers/login';
import AnimatedSprite from 'react-native-animated-sprite';
import monsterSprite from '../sprites/monster/monsterSprite';
import { Card, CardSection, Input } from './common';
import { Button } from './common/LoginButton'


class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      animationType: 'WALK'
    }

    this.onButtonPress = this.onButtonPress.bind(this)

  }

  onButtonPress() {
    this.props.loginUser(this.state.email, this.state.password);
  }

  renderButton() {
    return (
      <Button onPress={this.onButtonPress}>
        SIGN UP
      </Button>
    );
  }


  render() {
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
              top:-30,
              left: 45,
            }}
            size={{
              width: monsterSprite.size.width * 1.25,
              height: monsterSprite.size.height * 1.25,
            }}
            draggable={false}
          />
        </View>

        <CardSection>
          <Input
            label="EMAIL"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            keyboardType='email-address'
            autoCapitalize="none"
            autoCorrect={false}
          />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="PASSWORD"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          autoCapitalize="none"
          autoCorrect={false}
        />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <View style={styles.text2Container}>
          <Text style={styles.text2}>
            already a member? {"\n"} {"\n"}            ______
          </Text>
        </View>

        <View style={styles.text1Container}>
          <TouchableOpacity onPress={() => {navigate('LoginOldUser')}}>
            <Text style={styles.text1}>
              LOG IN
            </Text>
          </TouchableOpacity>
        </View>

      </Card>
    );
  }
}


const styles = {
  hello: {
    height:250
  },
  helloText: {
    fontSize:50,
    color: '#FFF',
    alignSelf: 'center',
    fontFamily: "Courier"
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  },
  text1: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  text1Container:{
    // left: 0,
    // right: 0,
    bottom: -80
  },
  text2:{
    fontSize: 12,
    alignSelf: 'center',
    color: '#FFF',
    fontStyle: 'italic'
  },
  text2Container:{
    bottom:-60
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
        header: null
      }
    },
    LoginOldUser: { screen: LoginOldUser,
      navigationOptions:{
        header: null
      }
    }
})
