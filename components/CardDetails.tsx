import React from 'react';
import {
	View
} from 'react-native';
import StyleSheet from '../styles/CardScreenStyles';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {  NavigationScreenProp } from 'react-navigation';

import Text from '../components/MyText';
import Button from '../components/MyButton';
import {fontMaker} from '../components/fontMaker';
import { Customer } from '../helpers/interfaces';

//TODO: There are 3 classes that don't make sens, make sense of it
//TODO: add proper props and State, understand what's going on
class Infos extends React.PureComponent<any,any> {

	render() {
		let Left =
			this.props.dataSide === 'right' ? (
				<Text>{this.props.text + ' '}</Text>
			) : (
				<Text style={StyleSheet.jsonElement}>{this.props.data}</Text>
			);
		let Right =
			this.props.dataSide === 'right' ? (
				<Text style={StyleSheet.jsonElement}>{this.props.data}</Text>
			) : (
				<Text>{' ' + this.props.text}</Text>
			);

		return (
			<View style={StyleSheet.box}>
				<Text style={StyleSheet.titleBox}>{this.props.title}</Text>
				<View style={{flexDirection: 'row'}}>
					{Left}
					{Right}
				</View>
			</View>
		);
	}
}

interface Props {
	navigation: NavigationScreenProp<any, any>,
}

//TODO: add proper props and State, understand what's going on
class AditionnalElem extends React.PureComponent<any,any> {
	constructor(props) {
		super(props);
		this._renewCard = this._renewCard.bind(this);
	}

	_renewCard() {
		this.props.navigation.navigate('Web',  { uri:"https://secure.fr.fnac.ch/basket/add?productId=9825393" });
	}

	render() {
		const {status, date} = this.props;
		let text, title, dateElem, buttonTitle = null;
		if (status === '1.0') {
			return null;
		} else {
			text =
				status === '2.0' || status === '3.0'
					? 'Renouvelez-la dès à présent pour conserver tous vos avantages et vos points fidélité actuellement disponibles sur votre carte Fnac'
					: status === '4.0'
					? 'Redevenez Adhérent et bénéficiez à nouveau de tous les privilèges de macarte Fnac sans exception!'
					: 'Renouvelez-la dès à présent pour conserver tous vos avantages actuellement disponibles sur votre carte Fnac';
			title =
				status === '3.0' || status === '3.2'
					? 'Ma carte est arrivée à échéance le'
					: status === '4.0'
					? "Ma carte n'est plus valable"
					: 'Ma carte arrive à échéance le';
			dateElem =
				status === '4.0' ? null : (
					<Text
						style={{
							color: 'red',
							...fontMaker({weight: 'Bold'}),
							marginTop: 10,
							fontSize: 20
						}}
					>
						{date}
					</Text>
				);
				buttonTitle = status === '4.0' ? "Récupérer mes avantages" : "Je renouvelle ma carte";
			return (
				<View
					style={{
						backgroundColor: 'white',
						margin: 4,
						padding: 15,
						paddingBottom: 30,
						alignItems: 'center'
					}}
				>
					<Text
						style={{
							...fontMaker({weight: 'SemiBold'}),
							fontSize: 16
						}}
					>
						{title}
					</Text>
					{dateElem}
					<Text
						style={{
							color: 'grey',
							fontSize: 13,
							textAlign: 'center',
							marginTop: 10,
							marginBottom: 20
						}}
					>
						{text}
					</Text>
					<Button
						width={responsiveWidth(80)}
						height={40}
						title={buttonTitle}
						onPress={this._renewCard}
					/>
				</View>
			);
		}
	}
}

interface Props{
    customer: Customer
    navigation: NavigationScreenProp<any,any>,
}


interface State {

}
//TODO: this.sub most likely does nothing
export default class CardDetails extends React.PureComponent<Props, State> {
    _status;
    _updateDate;
    _validityDateText;
    _validityText;
    constructor(props) {
		super(props);
		this.generateDetails = this.generateDetails.bind(this);
	}

    generateDetails() {
		let today = new Date();
		today.setHours(0,0,0,0);
        let customer = this.props.customer
        if (
            typeof customer.aEpurse === 'undefined' ||
            customer.aEpurse === null ||
            customer.aEpurse.length === 0 ||
            customer.aEpurse.substr(-3) === '.00'
        ) {
            customer.aEpurse =
				customer.aEpurse.substr(0, customer.aEpurse.length - 2) + '-';
        } else {
            customer.aEpurse = customer.aEpurse + '-';
        }
        console.log('using date : ');
        console.log(today);
        //date = this.state.date;//new Date();
        let day = today.getDate();
        day = day < 10 ? '0' + day : day;
        let month = today.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        this._updateDate = day + '.' + month + '.' + today.getFullYear();
        let validDate = new Date(customer.dEndValidDate);
        validDate.setHours(0, 0, 0, 0);

        console.log('validDate : ', validDate);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let validityDateText = customer.dEndValidDate.slice(0, 10).split('-').reverse().join('.');
        let validityText = '';
        if (validDate <= today) {
            validityText = 'Adhésion non valable depuis le';
        } else {
            validityText = "Adhésion valable jusqu'au";
        }

		let inThreeMonthDate = new Date();
		inThreeMonthDate.setMonth(today.getMonth() + 3)
		inThreeMonthDate.setHours(0, 0, 0, 0)
        console.log('inThreeMonthDate : ', inThreeMonthDate);

        let threeMonthAgo = new Date();
        threeMonthAgo.setMonth(today.getMonth() - 3);
        threeMonthAgo.setHours(0, 0, 0, 0);
        console.log('threeMonthAgo : ', threeMonthAgo);

        var status;
        if (validDate > inThreeMonthDate) {
            status = '1.0';
        } else if (
            validDate <= inThreeMonthDate &&
            validDate > today
        ) {
            if (customer.qtLoyalPoint === 0) {
                status = '2.2';
            } else {
                status = '2.0';
            }
        } else if (
            validDate <= today &&
            validDate > threeMonthAgo
        ) {
            if (customer.qtLoyalPoint === 0) {
                status = '3.2';
            } else {
                status = '3.0';
            }
        } else {
            status = '4.0';
        }
        console.log(validityText);
        console.log(validityDateText);

        this._status = status,
        this._validityDateText = validityDateText,
        this._validityText = validityText
    }

	render() {
		this.generateDetails();
		return (
			<View style={StyleSheet.ScrollView}>
				<AditionnalElem
					date={this._validityDateText}
					status={this._status}
					navigation={this.props.navigation}
				/>
				<View
					style={{
						height: this._status === '4.0' ? 0 : undefined,
						overflow: 'hidden'
					}}
				>
					<Text style={StyleSheet.account}>MON COMPTE FIDÉLITÉ</Text>
					<Infos
						title="VALIDITÉ"
						text={this._validityText}
						data={this._validityDateText}
						dataSide="right"
					/>
					<Infos
						title="MES POINTS"
						text="points"
						data={this.props.customer.qtLoyalPoint}
						dataSide="left"
					/>
					<Infos
						title="MONTANT DISPONIBLE SUR MA CARTE"
						text="CHF"
						data={this.props.customer.aEpurse}
						dataSide="right"
					/>
					<View style={StyleSheet.DonneesMajView}>
						<Text style={StyleSheet.DonneesMajText}>
							Données mises à jour le {this._updateDate}
						</Text>
						<View style={StyleSheet.buttonView}>
							<Button
								title="Mes avantages"
								onPress={() =>
									this.props.navigation.navigate('Web', {uri: 'https://www.fr.fnac.ch/Adherents/choisir_carte.aspx'})
								}
							/>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
