import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  Animated,
} from 'react-native';
import { Block, Text, Button } from '../components';
import { theme } from '../constants';

const dataSliders = [
  { id: 1, image: require('../assets/images/illustration_1.png') },
  { id: 2, image: require('../assets/images/illustration_2.png') },
  { id: 3, image: require('../assets/images/illustration_3.png') },
];

const { width, height } = Dimensions.get('window');

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerms: false,
    };
  }
  scrollX = new Animated.Value(1);

  renderSliders = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={dataSliders}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={{ width, height: height / 2 }}
            resizeMode="contain"
          />
        )}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: this.scrollX } },
            },
          ],
          { useNativeDriver: true }
        )}
      />
    );
  };
  renderPagination() {
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {dataSliders.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }
  render() {
    const { navigation } = this.props;
    const { showTerms } = this.state;
    console.log(showTerms);
    return (
      <Block flex={1} middle>
        <Block center middle>
          <Text h1 bold>
            Your Home.{' '}
            <Text h1 primary>
              Greener.
            </Text>
          </Text>
          <Text h2 gray>
            Enjoy the experience.
          </Text>
        </Block>
        <Block>
          {this.renderSliders()}
          {this.renderPagination()}
        </Block>
        <Block middle margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>
              Login
            </Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('SignUp')}>
            <Text center semibold>
              Signup
            </Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 4,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
