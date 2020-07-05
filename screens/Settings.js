import React, { Component } from 'react';
import { StyleSheet, Image, Slider } from 'react-native';
import { Block, Text, Button, Input } from '../components';

export default class Product extends Component {
  state = {
    name: 'Paul',
    location: 'Minal',
    email: 'paul.jameson@work.com',
  };
  render() {
    const { name, location, email } = this.state;
    return (
      <Block margin={[20, 20, 0, 20]} flex={1}>
        <Block flex={false} row center space="between">
          <Text h1 bold>
            Settings
          </Text>
          <Button style={{ width: 50, height: 50, borderRadius: 50 }}>
            <Image
              style={{ flex: 1, width: 50, height: 50 }}
              resizeMode="contain"
              source={require('../assets/images/avatar.png')}
            />
          </Button>
        </Block>
        <Block flex={false}>
          <Input
            label="Username"
            style={styles.input}
            rightLabel={<Text color="#0AC4BA">Edit</Text>}
            rightStyle={styles.inputRight}
            value={name}
          />
          <Input
            label="Location"
            style={styles.input}
            rightLabel={<Text color="#0AC4BA">Edit</Text>}
            rightStyle={styles.inputRight}
            value={location}
          />
          <Input label="Email" style={styles.input} value={email} />
        </Block>
        <Block>
          <Slider value={75} minimumValue={0} maximumValue={100} />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    paddingHorizontal: 0,
    marginBottom: -20,
  },
  inputRight: {
    backgroundColor: 'transparent',
  },
});
