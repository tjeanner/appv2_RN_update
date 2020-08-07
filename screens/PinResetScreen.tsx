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

export default class PinResetScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pin: null};
		this._onChangePin = this._onChangePin.bind(this);
		this.setNewPin = this.setNewPin.bind(this);
		this.goPinCo = this.goPinCo.bind(this);
	}
	static navigationOptions = {
		header: null
	};

	_onChangePin(pin) {
		this.setState({pin: pin});
	}

	goPinCo() {
		this.props.navigation.navigate('PinCo');
	}

	async setNewPin() {
		if (this.state.pin && this.state.pin.length === 4) {
			await AsyncStorage.setItem('pin', JSON.stringify(this.state.pin))
				.then(() => {})
				.catch(error => {
					console.error(error);
				});
			await AsyncStorage.setItem('account', JSON.stringify('yes'))
				.then(() => {})
				.catch(error => {
					console.error(error);
				});
			await AsyncStorage.removeItem('tmpPin')
				.then(() => {})
				.catch(error => {
					console.error(error);
				});
			this.goPinCo();
		} else {
			Alert.alert('Veuillez renseigner un nouveau pin (4 chiffres)');
		}
	}

	render() {
		return (
			<ScrollView style={StyleSheet.scrollView}>
				<View style={StyleSheet.fnacContainer}>
					<Text style={StyleSheet.bienvenueText}>Nouveau Pin ?</Text>
					<Text style={StyleSheet.connectezVousText}>
						Veuillez entrer votre nouveau PIN.
					</Text>
				</View>
				<View style={StyleSheet.mainContainer}>
					<Text style={StyleSheet.VeuillezEntrerText}>
						Veuillez entrer un PIN
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
						onSubmitEditing={() => this.setNewPin()}
						keyboardAppearance="dark"
					/>
					<Button
						title="Définir mon nouveau Pin"
						onPress={() => this.setNewPin()}
					/>
					{/*<Button title="DEV" onPress={() => this.dev()} />*/}
				</View>
			</ScrollView>
		);
	}
}
