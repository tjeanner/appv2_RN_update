import React from 'react';
import {
	View,
	ScrollView,
	Alert,
	Dimensions,
	Keyboard,
	Modal,
	TouchableOpacity,
} from 'react-native';
import { CheckBox, Input } from 'react-native-elements'
import { Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import DatePicker from 'react-native-datepicker'
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';

import Button from "../components/MyButton"
import Text from '../components/MyText';
import StyleSheet from '../styles/FirstConnectionScreenStyles';
import { months } from '../helpers/Tools';
import { fontMaker } from '../components/fontMaker';
import { FullPageActivityIndicator } from '../components/MyActivityIndicator';
import CommonStyleSheet from '../styles/CommonStyles';
import { FormInfo } from '../helpers/interfaces';
import { getStoresList } from '../helpers/StoreService'
import { retrieveFnacId } from '../helpers/UserService';
import ScannerModal from '../components/ScannerModal';
import CommonStyles from '../styles/CommonStyles';

const Height_Layout = Dimensions.get('window').height;
const Width_Layout = Dimensions.get('window').width;
const CURRENT_YEAR = new Date().getFullYear().toString();

//TODO replace any with real types
interface State {
	isLoading: boolean,
	isLoading2: boolean,
	stores: any,
	formInfo: FormInfo,
	overLayVisible: boolean,
	pin: string,
}

export default class FirstConnectionScreen extends React.Component<any, State> {
	static navigationOptions = {
		header: null
	};

	tmpDate;
	data;
	_formikHandlers;
	_cardNumberInput;
	constructor(props) {
		super(props);
		this.tmpDate = new Date();
		this.tmpDate.setFullYear(this.tmpDate.getFullYear(), 0, 1);
		this.state = {
			isLoading: true,
			isLoading2: false,
			stores: null,
			formInfo: null,
			overLayVisible: false,
			pin:'',
		};

		this.loadStores = this.loadStores.bind(this);
		this.goPinCo = this.goPinCo.bind(this);
		this.postUser = this.postUser.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setFieldsFromOverlay = this.setFieldsFromOverlay.bind(this);
		this.openCameraOverlay = this.openCameraOverlay.bind(this);
		this.handlePinChange = this.handlePinChange.bind(this);
	}

	componentDidMount() {
		this.loadStores();
	}

	loadStores() {
		getStoresList().then((stores) => {
			//we need to set it so that we can access it from ModalSelector
			let data = stores.map((store, index) => {
				return {
					key: index,
					label: store.StoreName.substr(0, 5) == 'Fnac ' ? 'FNAC ' + store.StoreName.substr(5) : 'FNAC ' + store.StoreName,
					//we need to test this because storeNames from fnac are inconsistents
					customKey: store.StoreGu,
				}
			})
			this.setState({
				isLoading: false,
				stores: data,
			});
		})
	}

	async postUser() {
		let userId = await retrieveFnacId(this.state.formInfo);
		if (userId == null) {
			this.alertNotFound();
		} else {
			await AsyncStorage.setItem('userId', JSON.stringify(userId))
				.then(() => { })
				.catch(error => {
					console.error(error);
				});
			await AsyncStorage.setItem('account', 'yes')
				.then(() => { })
				.catch(error => {
					console.error(error);
				});
			await AsyncStorage.setItem('pin', JSON.stringify(this.state.formInfo.pin))
				.then(() => { })
				.catch(error => {
					console.error(error);
				});
			this.goPinCo();
		}
	}
	goPinCo() {
		this.props.navigation.navigate('PinCo');
	}

	alertNotFound() {
		Alert.alert(
			'Adhérent non trouvé',
			"Aucun adhérent correspondant à ce numéro de carte et cette date de naissance n'a été trouvé.\
			\nVeuillez vérifier que vous avez bien entré vos informations.",
			[{
				text: 'Ok',
				onPress: () => { }
			}]
		);
		this.setState({isLoading2:false});
	}


	async handleSubmit(values: FormInfo) {
		console.log(values);
		await this.setState({
			formInfo: values,
			isLoading2:true
		});
		this.postUser();
	}

	openCameraOverlay() {
		this.setState({
			overLayVisible: true,
		})
	}


	setFieldsFromOverlay(infos) {
		console.log(infos)
		if(infos.cardNumber != undefined)
			this._formikHandlers.setFieldValue('card', infos.cardNumber.trim());
		if(infos.person != undefined){
			let strings = infos.person.trim().split(' ')
			if(strings.length == 3){
				if(strings[0] == 'M.'){
					this._formikHandlers.setFieldValue('chCivility', 'MONSIEUR');
				} else{
					this._formikHandlers.setFieldValue('chCivility', 'MADAME');
				}
				this._formikHandlers.setFieldValue('firstName', strings[2]);
				this._formikHandlers.setFieldValue('surname', strings[1]);
			}
		}

		this.setState({
			overLayVisible: false
		})
	}

	validate(values: FormInfo) {
		const errors: any = {};
		if (values.firstName === undefined) {
			errors.firstName = 'Champ obligatoire';
		} else if (values.firstName.trim() === '') {
			errors.firstName = 'Votre prénom ne peut pas être vide';
		}
		if (values.surname === undefined) {
			errors.surname = 'Champ obligatoire';
		} else if (values.surname.trim() === '') {
			errors.surname = 'Votre nom ne peut pas être vide';
		}
		if (values.eMail === undefined) {
			errors.eMail = 'Champ obligatoire';
		}
		else if (values.eMail.trim() === '') {
			errors.eMail = "Votre E-mail ne peut pas être vide";
		}
		//TODO: this email check is very basic
		else if (/(.+)@(.+){2,}\.(.+){2,}/.test(values.eMail) == false) {
			errors.eMail = 'E-mail non valide, doit être de la forme example@domaine.topdomaine'
		}
		if (values.card === undefined) {
			errors.card = 'Champ obligatoire';
		}
		else if (values.card.length != 19) {
			errors.card = 'Le numéro de carte doit contenir 19 chiffres';
		}
		if (values.dtBirth === undefined) {
			errors.dtBirth = 'Champ obligatoire';
		}
		else if (values.dtBirth.trim() === '') {
			errors.dtBirth = 'Champ obligatoire';
		}
		if (values.pin === undefined) {
			errors.pin = 'Champ obligatoire';
		}
		else if (values.pin.length != 4) {
			errors.pin = 'Le pin doit contenir 4 chiffres';
		}
		return errors;
	}

	handlePinChange(text, props){
		if(text && text.length && text.match(/^-{0,1}\d+$/)){//valid integer (positive or negative)
			this.setState({pin:text});
			props.setFieldValue('pin', text);
			if (text.length == 4){
				Keyboard.dismiss();
				props.handleSubmit();
			}
		}else if (!text){
			this.setState({pin:''});
			props.setFieldValue('pin', text);
		}
	}


	render() {
		if (this.state.isLoading) {
			return <FullPageActivityIndicator />;
		}
		return (
			<View>
			<ScrollView
				keyboardShouldPersistTaps="always"
				ref="scrollViewRef"
				style={StyleSheet.ScrollView}
				keyboardDismissMode="on-drag"
			>
				<View style={StyleSheet.fnacContainer}>
					<View>
						<Text style={StyleSheet.premiereCoText}>Première connexion ?</Text>
					</View>
					<View>
						<Text style={StyleSheet.configurezText}>
							Configurez votre compte dès maintenant !
						</Text>
					</View>
				</View>
				{this.scanCardButton}
				<Formik
					initialValues={{
						firstName: undefined,
						surname: undefined,
						chCivility: 'MADAME',
						eMail: undefined,
						cdFavouriteUg: undefined,
						card: undefined,
						dtBirth: undefined,
						pin: undefined,
					}}
					onSubmit={this.handleSubmit}
					validate={this.validate}
				>
					{props => {
						this._formikHandlers = props;
						return (
							<View style={StyleSheet.mainContainer}>
								<View style={StyleSheet.genderView}>
									<CheckBox
										title='Madame*'
										onPress={() => props.setFieldValue('chCivility', 'MADAME')}
										checked={props.values.chCivility == 'MADAME' ? true : false}
									/>
									<CheckBox
										title='Monsieur*'
										onPress={() => props.setFieldValue('chCivility', 'MONSIEUR')}
										checked={props.values.chCivility == 'MONSIEUR' ? true : false}
									/>
								</View>
								<Input
									value={props.values.firstName}
									onBlur={props.handleBlur('firstName')}
									onChangeText={props.handleChange('firstName')}
									label="Prénom:"
									labelStyle={StyleSheet.inputLabel}
									style={StyleSheet.textInput}
									textContentType="name"
									selectionColor={CommonStyleSheet.fnac.color}
									autoCapitalize="words"
									autoCorrect={false}
									keyboardAppearance="dark"
									keyboardType="default"
									returnKeyType="next"
								/>
								<Text style={StyleSheet.errorInput}>
									<ErrorMessage name="firstName" />
								</Text>
								<Input
									value={props.values.surname}
									onBlur={props.handleBlur('surname')}
									onChangeText={props.handleChange('surname')}
									label="Nom de Famille:"
									labelStyle={StyleSheet.inputLabel}
									style={StyleSheet.textInput}
									textContentType="name"
									selectionColor={CommonStyleSheet.fnac.color}
									autoCapitalize="words"
									autoCorrect={false}
									keyboardAppearance="dark"
									keyboardType="default"
									returnKeyType="next"
								/>
								<Text style={StyleSheet.errorInput}>
									<ErrorMessage name="surname" />
								</Text>
								<Input
									value={props.values.eMail}
									onBlur={props.handleBlur('eMail')}
									onChangeText={props.handleChange('eMail')}
									label="E-mail:"
									labelStyle={StyleSheet.inputLabel}
									style={StyleSheet.textInput}
									textContentType="name"
									selectionColor={CommonStyleSheet.fnac.color}
									autoCapitalize="words"
									autoCorrect={false}
									keyboardAppearance="dark"
									keyboardType="email-address"
									returnKeyType="next"
								/>
								<Text style={StyleSheet.errorInput}>
									<ErrorMessage name="eMail" />
								</Text>
							<View style={{marginLeft:10}}>
								<Text style={StyleSheet.inputLabel}>
									Votre magasin Fnac préféré ?
							</Text>
								<ModalSelector
									data={this.state.stores}
									cancelText="Annuler"
									initValue={"Choisissez parmi les magasins de Suisse"}
									selectStyle={{
										flexDirection: 'row',
										justifyContent: 'flex-start'
									}}
									selectTextStyle={{ ...fontMaker({}) }}
									optionTextStyle={{ ...fontMaker({}) }}
									cancelTextStyle={{ ...fontMaker({}) }}
									selectedItemTextStyle={{
										...fontMaker({ weight: 'Bold' })
									}}
									optionContainerStyle={{
										backgroundColor: 'white'
									}}
									onChange={option => {
										props.setFieldValue('cdFavouriteUg', option.customKey);
									}}
								/>
							</View>
								<Input
									value={props.values.card}
									onBlur={e => props.handleBlur('card')(e)}
									onChangeText={t => props.handleChange('card')(t)}
									label="Les 19 chiffres de votre carte adhérent"
									labelStyle={StyleSheet.inputLabel}
									keyboardType="number-pad"
									selectionColor={CommonStyleSheet.fnac.color}
									maxLength={19}
									blurOnSubmit={false}
									onSubmitEditing={Keyboard.dismiss}
									keyboardAppearance="dark"
									returnKeyType="done"
									textContentType="none"
								/>
								<Text style={StyleSheet.errorInput}>
									<ErrorMessage name="card" />
								</Text>
							<View style={{marginLeft:10}}>
								<Text style={StyleSheet.inputLabel}>
									Date de naissance:
								</Text>
								<DatePicker
									date={props.values.dtBirth}
									onDateChange={(date) => { props.setFieldValue('dtBirth', date) }}
									format="DD-MM-YYYY"
									minDate="01-01-1900"
									maxDate={"01-01-" + CURRENT_YEAR}
									confirmBtnText="Confirm"
									cancelBtnText="Cancel"
									androidMode='spinner'
								/>
							</View>
								<Text style={StyleSheet.errorInput}>
									<ErrorMessage name="dtBirth" />
								</Text>
								<View style={{flex:1, flexDirectiohn: 'row', justifyContent:'center', alignItems: 'center'}}>
									<View style={{width:130}}>
										<Input
											textAlign={'center'}
											onBlur={props.handleBlur('pin')}
											value={this.state.pin}
											onChangeText={(text) => {this.handlePinChange(text, props);} }
											label="Pin à 4 chiffres"
											labelStyle={StyleSheet.inputLabel}
											keyboardType="phone-pad"
											maxLength={4}
											placeholder="1 2 3 4"
											placeholderTextColor="#bbbbbb"
											selectionColor={CommonStyleSheet.fnac.color}
											keyboardAppearance="dark"
											returnKeyType="done"
											textContentType="none"
										/>
									</View>
								</View>
								{/*<PinInput onChangeText={props.handleChange('pin')} onBlur={props.handleBlur('pin')}
																props={props}/>*/}
								
								<Text style={StyleSheet.errorInput}>
									<ErrorMessage name="pin" />
								</Text>
								<Button
									onPress={props.handleSubmit}
									disabled={props.isValid}
									title="Je valide"
								/>
							</View>
						)
					}}
				</Formik>
				<Modal
					visible={this.state.overLayVisible}
					transparent={false}
					supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
					onRequestClose={() => this.setFieldsFromOverlay('')}
					animationType={"slide"}
					presentationStyle={"fullScreen"}
				>
					<ScannerModal setFormFields={this.setFieldsFromOverlay} />
				</Modal>
			</ScrollView>
			<View style={{position:'absolute', top: Height_Layout / 2, left: 0, width: Width_Layout, height: this.state.isLoading2 ? 200 : 0, overflow: 'hidden'}}>
				<FullPageActivityIndicator/>
			</View>
			</View>
		);
	}
	get scanCardButton() {
		return (
			<TouchableOpacity onPress={this.openCameraOverlay}>
				<View
					style={CommonStyles.greyButtonWithIcon}
				>
					<Icon name="camera" size={20} color="grey" type="font-awesome" />
					<Text style={{ color: 'grey' }}>
						Saisie automatique de votre CARTE FNAC
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
