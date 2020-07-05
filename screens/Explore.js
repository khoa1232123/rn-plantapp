import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { Block, Text, Button, Input } from '../components';
import * as Icon from '@expo/vector-icons';
import { mocks, theme } from '../constants';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');

export default class Explore extends Component {
  renderSearch() {
    return (
      <Block>
        <Input
          rightLabel={<Icon.FontAwesome5 name="search" size={16} />}
          rightStyle={styles.inputRight}
          style={styles.input}
          placeholder="Search"
        />
      </Block>
    );
  }
  renderImages() {
    const { explore } = mocks;
    return (
      <Block flex={1} wrap style={styles.mainExplore}>
        {explore.map((item, index) => (
          <Block key={index} style={styles.bgImage}>
            <TouchableOpacity>
              <Image key={index} source={item} style={styles.image} />
            </TouchableOpacity>
          </Block>
        ))}
      </Block>
    );
  }
  render() {
    const { navigation } = this.props;
    return (
      <Block margin={[20, 20, 0, 20]} flex={1}>
        <Block flex={false} row center space="between">
          <Text h1 bold>
            Explore
          </Text>
          {this.renderSearch()}
        </Block>
        <ScrollView>{this.renderImages()}</ScrollView>
        <Block color="transparent" center>
          <Button color="transparent" gradient style={styles.btnFilter} onPress={() => navigation.navigate('Product')}>
            <Text center color="#fff">Filter</Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: width / 2,
    height: 35,
    backgroundColor: '#fff',
  },
  inputRight: {
    top: -7,
    right: 1,
  },
  mainExplore: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  bgImage: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    padding: 8,
  },
  image: {
    maxWidth: width,
  },
  btnFilter: {
    position: 'absolute',
    bottom: 10,
    width: 200,

  }
});
