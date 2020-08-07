import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Text from './MyText';
import StyleSheet from '../styles/FakeTextInputStyles';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>,
  event:boolean
}

export default class FakeTextInput extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props)
    this.goSearchScreen = this.goSearchScreen.bind(this);
  }

  goSearchScreen() {
    this.props.navigation.navigate('Research');
  }

  render() {
	  if(!this.props.event){
      return (
        <TouchableOpacity onPress={this.goSearchScreen}>
          <View style={StyleSheet.mainView}>
            <View style={{margin: 10}}>
              <Icon name="search" size={17} color="white" type="font-awesome" />
            </View>
            <View style={StyleSheet.whiteBarView} />
            <View style={{ overflow: 'hidden' }} >
              <Text style={StyleSheet.text}>Que recherchez-vous ?</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } 
    return (
      <TouchableOpacity onPress={this.goSearchScreen}>
        <View style={StyleSheet.mainView2}>
          <Icon name="search" size={17} color="white" type="font-awesome"/>
        </View>
      </TouchableOpacity>
    );

  }
}
