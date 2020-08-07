import React from 'react';
import{
	View
} from 'react-native';
import {Icon}from 'react-native-elements';
import Text from './MyText';
import CommonStyleSheet from '../styles/CommonStyles';
import {  ItemRepresentation_large } from '../helpers/interfaces';
import AddToBasketButton from './AddToBasketButton';

interface Props {
	item:ItemRepresentation_large
}

export default class BuyOnline extends React.PureComponent<Props,any>{

	render() {
		if (this.props.item.AvailabilityOnFnacCom.Status > 0) {
			return (
				<View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
					{this.inStockIndicator}
					{this.deliveryInfo}
					<AddToBasketButton item={this.props.item} />
				</View>
			);
		} else {
			return(
			<View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
				{this.notInStockIndicator}
			</View>
			);
		}
	}

	//Todo: verify if we can detect cases when we can't deliver
	get deliveryInfo() {
		let carriageCost = this.props.item.InfosPrice.MainOffer.CarriageCost;
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
				<Text>Livraison à domicile : </Text>
				<Text style={{ color: CommonStyleSheet.fnac_red.color }}>{carriageCost == 0 ? 'Gratuite' : carriageCost.toString()}</Text>
			</View>
		)
	}
	//TODO: Saw a case where message was Expédié habituellement sous 4 à 9 semaines, investigate
	get inStockIndicator() {
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
				<Icon name='check' size={17} color={CommonStyleSheet.fnac_green.color} type="font-awesome" />
				<Text style={{ color: CommonStyleSheet.fnac_green.color }}>{this.props.item.AvailabilityOnFnacCom.Label}</Text>
			</View>
		);
	}

	get notInStockIndicator(){
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
				<Icon name='times' size={17} color={CommonStyleSheet.fnac_red.color} type="font-awesome" />
				<Text style={{ color: CommonStyleSheet.fnac_red.color }}>{this.props.item.AvailabilityOnFnacCom.Label}</Text>
			</View>
		);
	}
}
