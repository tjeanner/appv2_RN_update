import React from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	Alert,
	ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import Text from '../components/MyText';
import Button from '../components/MyButton';
import StyleSheet from '../styles/PinForgotScreenStyles';
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';

export default class PinTmpConfirmScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {pin: null};
		this._onChangePin = this._onChangePin.bind(this);
		this.validPin = this.validPin.bind(this);
		this.goPinForgot = this.goPinForgot.bind(this);
		this.goFirstCo = this.goFirstCo.bind(this);
		this.resetAccount = this.resetAccount.bind(this);
		this.manageResetAccount = this.manageResetAccount.bind(this);
		this.managePinForgot = this.managePinForgot.bind(this);
		this.sendNewPin = this.sendNewPin.bind(this);
		this.sendEmail = this.sendEmail.bind(this);
		this.getUserEmail = this.getUserEmail.bind(this);
	}

	_onChangePin(pin) {
		this.setState({pin: pin});
	}

	async validPin() {
		var tmpPin = await AsyncStorage.getItem('tmpPin');
		tmpPin = JSON.parse(tmpPin);
		if (this.state.pin && this.state.pin === tmpPin) {
			this.props.navigation.navigate('PinReset');
		} else {
			Alert.alert('Pin incorrect');
		}
	}

	async getUserEmail() {
		var userId = await AsyncStorage.getItem('userId');
		userId = JSON.parse(userId);
		const url =
			'http://app.suisse.fnac.ch/customers/' + userId + '/props/email';
		try {
			let response = await fetch(url, {
				method: 'PROPFIND',
				headers: {
					Accept: 'application/json'
				}
			});
			let responseJson = await response.json();
			console.log(responseJson.E_MAIL);
			return responseJson.E_MAIL;
		} catch (error) {
			console.error(error);
		}
	}

	async sendEmail(userId, tmpPin) {
		//Alert.alert('Un PIN temporaire a été envoyé à votre adresse email.\n');
		//Alert.alert(tmpPin.toString());
		const url = 'http://app.suisse.fnac.ch/customers/pintransfer/';
		const body = {id: userId, E_MAIL: tmpPin};
		try {
			let response = await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-type': 'application/json'
				},
				body: JSON.stringify(body)
			});
			console.log(response);
			Alert.alert(
				response.ok
					? "L'email a bien été envoyé"
					: "Un problème est survenu et l'email n'a pas pu être envoyé"
			);
			this.setState({isLoading: false});
		} catch (error) {
			console.error(error);
		}
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
		var userId = await AsyncStorage.getItem('userId');
		userId = JSON.parse(userId);
		//var email = await this.getUserEmail();
		await this.sendEmail(userId, tmpPin);
		//this.props.navigation.navigate('PinTmp');
	}

	manageResetAccount() {
		Alert.alert(
			'Confirmation',
			'Voulez-vous vraiment reinitialiser vôtre compte ?',
			[{text: 'Non'}, {text: 'Oui', onPress: () => this.resetAccount()}],
			{cancelable: true}
		);
	}

	async resetAccount() {
		await AsyncStorage.removeItem('account')
			.then(() => {})
			.catch(error => {
				console.error(error);
			});
		await AsyncStorage.removeItem('pin')
			.then(() => {})
			.catch(error => {
				console.error(error);
			});
		await AsyncStorage.removeItem('tmpPin')
			.then(() => {})
			.catch(error => {
				console.error(error);
			});
		await AsyncStorage.removeItem('userId')
			.then(() => {})
			.catch(error => {
				console.error(error);
			});
		this.goFirstCo();
	}

	managePinForgot() {
		Alert.alert(
			'Confirmation',
			'Voulez-vous à nouveau recevoir un PIN temporaire par email afin de reinitialiser le vôtre ?',
			[{text: 'Non'}, {text: 'Oui', onPress: () => this.sendNewPin()}],
			{cancelable: true}
		);
	}
	goFirstCo() {
		this.props.navigation.navigate('FirstCo');
	}

	goPinForgot() {
		this.props.navigation.navigate('Details');
	}

	render() {
		if (this.state.isLoading) {
			return <FullPageActivityIndicator />;
		}
		return (
			<ScrollView style={StyleSheet.scrollView}>
				<View style={StyleSheet.fnacContainer}>
					<Text style={StyleSheet.bienvenueText}>
						Code PIN oublié ?
					</Text>
					<Text style={StyleSheet.connectezVousText}>
						Nous avons envoyé un PIN temporaire à votre adresse
						email.
					</Text>
				</View>
				<View style={StyleSheet.mainContainer}>
					<Text style={StyleSheet.VeuillezEntrerText}>
						Veuillez entrer le PIN temporaire
					</Text>
					<TextInput
						ref="textInputRef"
						clearTextOnFocus={true}
						textAlign="center"
						keyboardType="numeric"
						maxLength={4}
						style={StyleSheet.textInput}
						underlineColorAndroid="#cccccc"
						placeholder="1234"
						placeholderTextColor="#cccccc"
						onChangeText={this._onChangePin}
						onSubmitEditing={() => this.validPin()}
						keyboardAppearance="dark"
					/>
					<Button
						title="Vérifier le PIN temporaire"
						onPress={() => this.validPin()}
					/>
					<TouchableOpacity onPress={() => this.managePinForgot()}>
						<View style={StyleSheet.pinOublieView}>
							<Text style={StyleSheet.pinOublieText}>
								Email non reçu ?
							</Text>
							<Text style={StyleSheet.pinOublieText}>
								Renvoyer un PIN temporaire
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.manageResetAccount()}>
						<View style={StyleSheet.pinOublieView}>
							<Text style={StyleSheet.pinOublieText}>
								Reinitialiser mon compte
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}
