import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import LoginOldUser from './LoginOldUser'
import { loginUser } from '../reducers/login';
import AnimatedSprite from 'react-native-animated-sprite';
import monsterSprite from '../sprites/monster/monsterSprite';
import { CardLogin, CardSectionLogin, InputLogin } from './common';
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
      <KeyboardAvoidingView  style={{height: 30, flex: 1}} behavior="position">
      <CardLogin/>
        <Text style={styles.helloText}>Tama-Do</Text>
        <View style={styles.hello}/>
          <View style={styles.circle}/>
            <AnimatedSprite 
            ref={'monsterRef'}
            sprite={monsterSprite}
            animationFrameIndex={monsterSprite.animationIndex(this.state.animationType)}
            loopAnimation={true}
            coordinates={{
              top: 30,
              left: 45,
            }}
            size={{
              width: monsterSprite.size.width * 1.25,
              height: monsterSprite.size.height * 1.25,
            }}
            draggable={false}
          />

        <CardSectionLogin>
          <InputLogin
            label="EMAIL"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            keyboardType='email-address'
            autoCapitalize="none"
            autoCorrect={false}
          />
        </CardSectionLogin>

        <CardSectionLogin>
          <InputLogin
            secureTextEntry
            label="PASSWORD"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </CardSectionLogin>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSectionLogin>
          {this.renderButton()}
        </CardSectionLogin>

        <View style={styles.text2Container}>
          <Text style={styles.text2}>
            already a member? {"\n"} {"\n"}            ______{"\n"}
          </Text>
        {/*</View>

        <View style={styles.text1Container}>*/}
          <TouchableOpacity onPress={() => {navigate('LoginOldUser')}}>
            <Text style={styles.text1}>
              LOG IN
            </Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>

    );
  }
}


const styles = {
  hello: {
    height:250,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  helloText: {
    fontSize:50,
    color: '#FFF',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    top: 30,
    fontFamily: "Courier"
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  },
  text1: {
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: 18,
    alignSelf: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  text1Container:{
    // left: 0,
    // right: 0,
    justifyContent: 'center',
    backgroundColor: "rgba(0,0,0,0)",
    position: 'absolute',
    bottom: 0,
    top: -200,
    left: 0,
    right: 0,
    height: 800
  },
  text2:{
    fontSize: 12,
    alignSelf: 'center',
    color: '#FFF',
    fontStyle: 'italic',
    backgroundColor: "rgba(0,0,0,0)",
  },
  text2Container:{
    position: 'relative',
    margin: 100,
    top: 330,
    paddingTop: 5,
    padding: 5,
    // justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  circle: {
    position: 'absolute',
    top: 80,
    width: 285,
    height: 285,
    borderRadius: 285/2,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,.15)'
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
