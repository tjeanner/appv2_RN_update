import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationScreenProp, NavigationEvents } from 'react-navigation';


export interface Props {
  navigation: NavigationScreenProp<any,any>
}


export default class WebViewer extends Component<Props,any> {
  constructor(props){
    super(props)

  }
  render() {
    return (
        <WebView source={{ uri: this.props.navigation.getParam('uri') }}  sharedCookiesEnabled={true} />
    );
  }
}