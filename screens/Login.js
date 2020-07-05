import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { Block, Text, Input, Button } from '../components';

const accountLogin = {
  email: 'khoa@gmail.com',
  password: '123456',
};

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    isLoading: false,
  };
  hasErrors(key) {
    errors.includes(key) ? true : false;
  }
  checkLogin() {
    const { navigation } = this.props;
    navigation.navigate('Browse');
    const errors = [];
    if (accountLogin.email !== this.state.email) {
      errors.push('email');
    }
    if (accountLogin.password !== this.state.password) {
      errors.push('password');
    }
    // if (errors.includes('email')) {
    //   alert('Tài khoản bạn nhập không hợp lệ!!!');
    // } else if (errors.includes('password')) {
    //   alert('Password của bạn bị sai!!!');
    // }
    this.setState({ errors, isLoading: false });
    if (!errors.length) {
      navigation.navigate('Browse');
    }
  }
  render() {
    const { errors, isLoading } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? true : false);
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={50}
      >
        <Block margin={20} middle flex={1}>
          <Block>
            <Text h1 bold center>
              Login
            </Text>
          </Block>
          <Block>
            <Input
              label="Email"
              email
              error={hasErrors('email')}
              onChangeText={(text) => this.setState({ email: text })}
              style={styles.input}
            />
            <Input
              label="Password"
              secure
              style={styles.input}
              error={hasErrors('password')}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <Block>
              <Button gradient onPress={() => this.checkLogin()}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Login
                  </Text>
                )}
              </Button>
              <Button color="transparent">
                <Text center gray style={{ textDecorationLine: 'underline' }}>
                  Forget your password?
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 0,
  },
});
