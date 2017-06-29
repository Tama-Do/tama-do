import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import LoginForm from './LoginForm'
import {
  emailChanged,
  passwordChanged,
  loginUser } from '../reducers/login';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginOldUser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onButtonPress() {
    this.props.loginUser(this.state.email, this.state.password);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress}>
        Login
      </Button>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Card>
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

      </Card>
    );
  }
}

const styles = {
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
  emailChanged: (text) => {
    dispatch(emailChanged(text))
  },
  passwordChanged: (text) => {
    dispatch(passwordChanged(text))
  },
  loginUser: (email, password) => {
    dispatch(loginUser(email, password))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginOldUser);
