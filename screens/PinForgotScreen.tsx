import React from 'react';
import {
	View,
	Alert,
	ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Text from '../components/MyText';
import Button from '../components/MyButton';
import StyleSheet from '../styles/PinForgotScreenStyles';
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import {UserInfo} from'../helpers/interfaces'

export default class PinForgotScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {email: null, isLoading: false};
		this.sendNewPin = this.sendNewPin.bind(this);
		this.getUserEmail = this.getUserEmail.bind(this);
		this.sendEmail = this.sendEmail.bind(this);
		this.goPinCo = this.goPinCo.bind(this);
	}
	static navigationOptions = {
		header: null
	};

	//TODO: getUserFromAPI then store it
	async getUserEmail() {

	}

	sendEmail(email, tmpPin) {
		Alert.alert('Un PIN temporaire a été envoyé à votre adresse email.\n');
		Alert.alert(tmpPin.toString());
	}

	async sendNewPin() {
		this.setState({isLoading: true});
		tmpPin = '0';
		while (tmpPin.length < 4) {
			tmpPin = Math.floor(Math.random() * 10000).toString();
		}
		await AsyncStorage.setItem('tmpPin', JSON.stringify(tmpPin))
			.then(() => {})
			.catch(error => {
				console.error(error);
			});
		await AsyncStorage.setItem('account', JSON.stringify('reset'))
			.then(() => {})
			.catch(error => {
				console.error(error);
			});
		var email = await this.getUserEmail();
		this.sendEmail(email, tmpPin);
		this.props.navigation.navigate('PinTmp');
	}

	goPinCo() {
		this.props.navigation.navigate('PinCo');
	}

	render() {
		if (this.state.isLoading) {
			Elem = <FullPageActivityIndicator />;
		} else {
			Elem = (
				<Button
					title="Oui, envoyez moi un PIN temporaire"
					onPress={() => this.sendNewPin()}
				/>
			);
		}
		return (
			<ScrollView style={StyleSheet.scrollView}>
				<View style={StyleSheet.fnacContainer}>
					<Text style={StyleSheet.bienvenueText}>
						Code PIN oublié ?
					</Text>
					<Text style={StyleSheet.connectezVousText}>
						Si vous avez oublié votre PIN nous pouvons vous en
						envoyer un temporaire par email afin de le resetter.
					</Text>
				</View>
				<View style={StyleSheet.mainContainer}>{Elem}</View>
			</ScrollView>
		);
	}
}
