import {StyleSheet} from 'react-native';
import {fontMaker} from '../components/fontMaker';

export default StyleSheet.create({
  headerStyle: {
    elevation: 0
  },
  headerForceInset: {
    top: 'never',
    bottom: 'never'
  },
  cardStackHeaderText: {
    ...fontMaker({weight: 'Bold'}),
    color: 'black',
    fontSize: 22
  },
  cardStackHeaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoTitleView: {
    flex: 1,
    alignItems: 'center'
  },
  logoTitleImage: {
    width: 120,
    height: 30,
    resizeMode: 'cover'
  },
  fnacCardIcon: {
    width: 24,
    height: 24
  },
  tabStyle: {
    backgroundColor: 'white',
    height: 50,
    padding: 0
  },
  tabBarStyle: {
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'gray'
  },
  tabBarLabelStyle: {
    ...fontMaker({}),
    fontSize: 10,
    margin: 0
  },
  appView: {
    flex: 1
  },
  topSafeAreView: {
    flex: 0,
    backgroundColor: 'black'
  },
  bottomSafeAreView: {
    flex: 1,
    backgroundColor: 'white'
  }
});
