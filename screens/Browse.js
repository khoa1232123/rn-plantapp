import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Block, Text, Button } from '../components';
import { mocks, theme } from '../constants';
import { categories } from '../constants/mocks';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default class Browse extends Component {
  state = {
    active: 'Products',
    categories: [],
  };
  componentDidMount() {
    const filtered = categories.filter((category) =>
      category.tags.includes('products')
    );
    this.setState({
      categories: filtered,
    });
  }
  handleTab = (tab) => {
    const filtered = categories.filter((category) =>
      category.tags.includes(tab.toLowerCase())
    );
    this.setState({
      active: tab,
      categories: filtered,
    });
  };
  renderTab(tab) {
    const { active } = this.state;
    let isActive = active === tab;
    return (
      <Block key={`tab-${tab}`} margin={[0, 20, 0, 0]}>
        <Button
          color="transparent"
          style={[styles.tab, isActive ? styles.active : null]}
          onPress={() => this.handleTab(tab)}
        >
          <Text size={18} bold secondary={isActive}>
            {tab}
          </Text>
        </Button>
      </Block>
    );
  }
  renderCategory(category) {
    const { navigation } = this.props;
    return (
      <Block flex={0.5} center middle style={styles.bgCat}>
        <Button
          middle
          style={styles.btnCat}
          onPress={() => navigation.navigate('Explore')}
        >
          <Block
            color={theme.colors.tertiary}
            style={{ padding: 15, borderRadius: 100 }}
          >
            <Image style={styles.imageCat} source={category.image} />
          </Block>
          <Text bold style={{ marginTop: 10, fontSize: 16 }}>
            {category.name}
          </Text>
          <Text gray>{category.count} Products</Text>
        </Button>
      </Block>
    );
  }
  render() {
    const { navigation } = this.props;
    const { categories } = this.state;
    const tabs = ['Products', 'Shop', 'Inspirations'];
    return (
      <Block margin={[20, 20, 0, 20]} flex={1}>
        <Block flex={false} row center space="between">
          <Text h1 bold>
            Browse
          </Text>
          <Button style={{ width: 50, height: 50, borderRadius: 50 }} onPress={() => navigation.navigate('Settings')}>
            <Image
              style={{ flex: 1, width: 50, height: 50 }}
              resizeMode="contain"
              source={require('../assets/images/avatar.png')}
            />
          </Button>
        </Block>
        <Block flex={false} row style={styles.tabs}>
          {tabs.map((tab) => this.renderTab(tab))}
        </Block>
        <Block flex={1}>
          <FlatList
            style={styles.listCat}
            data={categories}
            numColumns={2}
            renderItem={({ item }) => this.renderCategory(item)}
            keyExtractor={(item) => item.id}
          />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    borderBottomWidth: 3,
    borderColor: theme.colors.gray2,
  },
  tab: {
    borderBottomWidth: 3,
    borderRadius: 0,
    marginBottom: -3,
    borderColor: 'transparent',
  },
  active: {
    borderColor: theme.colors.secondary,
  },
  listCat: {
    marginHorizontal: -10,
  },
  bgCat: {
    marginHorizontal: 10,
  },
  imageCat: {
    width: width / 7,
    height: width / 7,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnCat: {
    width: '100%',
    height: width / 2.3,
    alignItems: 'center',
  },
});
