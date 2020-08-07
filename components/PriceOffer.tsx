import React from 'react';
import { View, Text} from 'react-native';

import {InfosPrice, ArticleOpcInfo} from '../helpers/interfaces'
import StyleSheet from '../styles/RenderItemInListStyles';

interface Props{
	infosPrice:InfosPrice,
	articleOpcInfo: ArticleOpcInfo,
	quantity:number,
}


export default class PriceOffer extends React.Component<Props, any> {
	_reducExponantText;
	_reducText;
	_exponantText;
	_priceText;
	constructor(props){
		super(props)
		this.setupPriceLabels = this.setupPriceLabels.bind(this);
		this._reducExponantText = '';
		this._reducText = '';
		this._exponantText = '';
		this._priceText = '';
	}

	//ugly but not broken
	setupPriceLabels() {
		const price = this.props.infosPrice;
		const quantity = this.props.quantity;

		var adjustedPrice = (price.MainOffer.Price * quantity).toFixed(2);
		let normalPrice = adjustedPrice.toString();
		normalPrice =
			normalPrice.indexOf('.') === -1
				? normalPrice + '.-'
				: normalPrice.length - (normalPrice.indexOf('.') + 1) === 1
					? normalPrice + '0'
					: normalPrice;

		if (this.props.articleOpcInfo.HasPromoToShow) {
			var adjustedReducPrice =
				price.MemberOffer && typeof price.MemberOffer !== 'undefined'
					? (price.MemberOffer.UserPrice * quantity).toFixed(2)
					: (price.MainOffer.UserPrice * quantity).toFixed(2)
			let reducPrice = adjustedReducPrice.toString();
			reducPrice =
				reducPrice.indexOf('.') === -1
					? reducPrice + '.-'
					: reducPrice.length - (reducPrice.indexOf('.') + 1) === 1
						? reducPrice + '0'
						: reducPrice;
			this._reducText = normalPrice[normalPrice.length - 1] === '-' ? normalPrice : normalPrice.split('.')[0] + '.';
			this._reducExponantText = normalPrice[normalPrice.length - 1] === '-' ? '' : normalPrice.split('.')[1];
			this._priceText = reducPrice[reducPrice.length - 1] === '-' ? reducPrice : reducPrice.split('.')[0] + '.';
			this._exponantText = reducPrice[reducPrice.length - 1] === '-' ? '' : reducPrice.split('.')[1];
		}
		else {
			this._priceText = normalPrice[normalPrice.length - 1] === '-' ? normalPrice : normalPrice.split('.')[0] + '.';
			this._exponantText = normalPrice[normalPrice.length - 1] === '-' ? '' : normalPrice.split('.')[1];
		}
	}

	render() {
		if(this.props.infosPrice == null)
			return null;
		this.setupPriceLabels();
		return (
			<View style={StyleSheet.priceView}>
				<View style={[StyleSheet.priceView, {alignItems: 'flex-start', marginLeft: 0}]}>
					<Text style={StyleSheet.price}>{this._priceText}</Text>
					<Text style={StyleSheet.priceExponant}>{this._exponantText}</Text>
				</View>
				<View style={[StyleSheet.priceView, {alignItems: 'flex-start', height: 15, marginTop: 3, marginLeft: 3}]}>
					<Text style={StyleSheet.priceReduc}>{this._reducText}</Text>
					<Text style={StyleSheet.priceReducExponant}>{this._reducExponantText}</Text>
				</View>
			</View>
		);
	}
}