import React, { Component } from 'react';
import { StyleSheet, Dimensions, Animated, Image } from 'react-native';
import { Block, Text, Button } from '../components';
import { mocks } from '../constants';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class Product extends Component {
  renderImages(images) {
    return (
      <Block flex={1} wrap style={styles.mainExplore}>
        {images.map((item, index) => (
          <Block key={index} style={styles.bgImage}>
            <Image key={index} source={item} style={styles.image} />
          </Block>
        ))}
      </Block>
    );
  }
  render() {
    const { products } = mocks;
    const { name, description, tags, images } = products[0];
    console.log(tags);
    return (
      <ScrollView>
        <Block margin={[0, 0, 0, 0]}>
          <Image
            source={images[0]}
            style={{ width, height: height / 2.5 }}
            resizeMode="cover"
          />
          <Block flex={false} margin={[20, 20, 0, 20]} space="between">
            <Text h2>{name}</Text>
            <Block style={styles.tags}>
              {tags.map((item, index) => {
                console.log(item);
                return (
                  <Button key={index} style={styles.tag}>
                    <Text gray>{item}</Text>
                  </Button>
                );
              })}
            </Block>
            <Text gray>{description}</Text>
            <Block flex={1} wrap style={styles.mainExplore}>
              {images.map((item, index) => {
                return <Image key={index} style={styles.image} source={item} />;
              })}
            </Block>
            {/* {this.renderImages(images)} */}
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tags: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginVertical: 10,
  },
  tag: {
    paddingHorizontal: 10,
    height: 35,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ebebeb',
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
    width: '50%',  //its same to '20%' of device width
    aspectRatio: 2, // <-- this
    resizeMode: 'cover', //optional
  },
});
