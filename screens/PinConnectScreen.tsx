import React from 'react';
import {
	View,
	TouchableOpacity,
	Alert,
	ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Text from '../components/MyText';
import Button from '../components/MyButton';
import StyleSheet from '../styles/PinConnectScreenStyles';
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import { NavigationScreenProp } from 'react-navigation';
import { Input } from 'react-native-elements';
import { UserInfo } from '../helpers/interfaces';

interface Props {
	navigation: NavigationScreenProp<any, any>,
}

interface State {
	isLoading:boolean,
}

export default class PinConnectScreen extends React.Component<Props, State> {
	_pin;
	_pinInput;
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			isLoading:false,
		};
		this._pin = '';
		this._pinInput = null;
		this.validPin = this.validPin.bind(this);
		this.goCardStack = this.goCardStack.bind(this);
		this.goPinForgot = this.goPinForgot.bind(this);
		this.goFirstCo = this.goFirstCo.bind(this);
		this.resetAccount = this.resetAccount.bind(this);
		this.manageResetAccount = this.manageResetAccount.bind(this);
		this.managePinForgot = this.managePinForgot.bind(this);
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

	async sendEmail(userId, tmpPin) {
		//Alert.alert('Un PIN temporaire a été envoyé à votre adresse email.\n');
		//Alert.alert(tmpPin.toString());
		const url = 'http://app.suisse.fnac.ch/customers/pintransfer/';
		const body = {Id: userId, E_MAIL: tmpPin};
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
		let tmpPin = '0';
		while (tmpPin.length < 4) {
			tmpPin = Math.floor(Math.random() * 10000).toString();
		}
		await AsyncStorage.setItem('tmpPin', JSON.stringify(tmpPin))
			.then(() => {})
			.catch(error => {
				console.error(error);
			});
		await AsyncStorage.setItem('account', 'reset')
			.then(() => {})
			.catch(error => {
				console.error(error);
			});
		let id = await AsyncStorage.getItem('userId');
		id = JSON.parse(id);
		await this.sendEmail(id, tmpPin);
		this.props.navigation.navigate('PinTmp');
	}

	managePinForgot() {
		Alert.alert(
			'Confirmation',
			'Voulez-vous recevoir un PIN temporaire par email afin de reinitialiser le vôtre ?',
			[{text: 'Non'}, {text: 'Oui', onPress: () => this.sendNewPin()}],
			{cancelable: true}
		);
	}

	//TODO: Client side validation ?
	async validPin() {
		if (this._pin && this._pin.length === 4) {
			var pinStored = await AsyncStorage.getItem('pin');
			pinStored = JSON.parse(pinStored);
			if (pinStored === this._pin) {
				this.goCardStack();
			} else {
				Alert.alert('Pin incorrect');
			}
		} else {
			Alert.alert('Veuillez entrer votre PIN à 4 chiffres');
		}
	}

	goCardStack() {
		this.props.navigation.navigate('Connected');
	}

	goPinForgot() {
		this.props.navigation.navigate('Details');
	}

	goFirstCo() {
		this.props.navigation.navigate('FirstCo');
	}

	render() {
		if (this.state.isLoading) {
			return <FullPageActivityIndicator />;
		}
		return (
			<ScrollView style={StyleSheet.scrollView}>
				<View style={StyleSheet.fnacContainer}>
					<View style={StyleSheet.bienvenueView}>
						<View style={StyleSheet.bienvenueEachView}>
							<Text style={StyleSheet.bienvenueText}>Bienvenue,</Text>
						</View>
						<View style={StyleSheet.bienvenueEachView}>
							<Text style={StyleSheet.bienvenueText}>on se connaît</Text>
						</View>
						<View style={StyleSheet.bienvenueEachView}>
							<Text style={StyleSheet.bienvenueText}>déjà ?</Text>
						</View>
					</View>
					<Text style={StyleSheet.connectezVousText}>
						Connectez-vous pour retrouver tous vos avantages.
					</Text>
				</View>
				<View style={StyleSheet.mainContainer}>
					<Input
						ref="textInputRef"
						label="Veuillez entrer votre code PIN"
						labelStyle={StyleSheet.VeuillezEntrerText}
						clearTextOnFocus={true}
						keyboardType="numeric"
						maxLength={4}
						style={StyleSheet.textInput}
						underlineColorAndroid="#cccccc"
						placeholder="1234"
						placeholderTextColor="#cccccc"
						onChangeText={(text) => this._pin = text }
						keyboardAppearance="dark"
						returnKeyType="done"
						onSubmitEditing={() => this.validPin()}
					/>
					<Button title="C'est parti !" onPress={() => this.validPin()} />
					<TouchableOpacity onPress={() => this.managePinForgot()}>
						<View style={StyleSheet.pinOublieView}>
							<Text style={StyleSheet.pinOublieText}>Code PIN oublié ?</Text>
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
