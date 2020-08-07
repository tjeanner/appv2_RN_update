import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import { NavigationEvents } from 'react-navigation';
import { View } from 'react-native';


//this screen is only used to redirect to the correct screen
export default class AccountScreen extends React.Component<any,any> {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this._changeScreen = this._changeScreen.bind(this);
	}

	async _changeScreen() {
		try {
			const isAccountCreated = await AsyncStorage.getItem('account');
			if (isAccountCreated =='yes'){
				this.props.navigation.navigate('PinCo');
			} else if (isAccountCreated == 'reset'){
				this.props.navigation.navigate('PinTmp');
			} else	{
				this.props.navigation.navigate('FirstCo');
			}
		} catch (error) {
			console.error(error);
		}
	}
	render() {
		return (
			<View>
				<FullPageActivityIndicator />
				<NavigationEvents
					style={{ flex: 0 }}
					onDidFocus={payload => this._changeScreen()}
				/>
			</View>
		);
	}
}
