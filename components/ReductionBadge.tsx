import React from 'react';
import {View, Text} from 'react-native';

import CommonStyleSheet from '../styles/CommonStyles'
import StyleSheet from '../styles/RenderItemInListStyles';
import { InfosPrice, ArticleOpcInfo } from '../helpers/interfaces';

interface Props{
	articleOpcInfo: ArticleOpcInfo
	price: InfosPrice,
}

export default class ReductionBadge extends React.PureComponent<Props, any> {
	reducText;
	constructor(props){
		super(props);
		this.reducText = this.props.articleOpcInfo.EconomyDetails;
	}

	render() {
		if (!this.props.articleOpcInfo.HasPromoToShow) {
			return <View><View style={[StyleSheet.reducView, {marginBottom: 0}]} /><View style={StyleSheet.reducView} /></View>;
		}
		let color = 'red';
		let textColor = 'white';
		let TitleText = this.props.articleOpcInfo.Label;
		//Have to view where this goes, surely always blank
		let secondElem = <View style={StyleSheet.reducView} />;
		if (this.props.price.MemberOffer && typeof this.props.price.MemberOffer !== 'undefined') {
			color = CommonStyleSheet.fnac.color;
			textColor = 'black';
			//i bet we never enter this if bloc
			if (this.props.price.MemberOffer.UserPrice !== this.props.price.MemberOffer.Price && this.props.price.MemberOffer.Price !== this.props.price.MemberOffer.UserPrice) {
				secondElem = (
					<View style={StyleSheet.reducView}>
						<View style={[StyleSheet.reducView, {backgroundColor: CommonStyleSheet.fnac.color, alignItems: 'center'}]}>
							<Text style={[StyleSheet.reducTitleText, {color: 'black'}]}>{other}</Text>
						</View>
						<Text style={[StyleSheet.reducValueText, {textAlignVertical: 'center'}]}>{this.reducText}</Text>
					</View>
				);
				color = 'red';
				textColor = 'white';
			}
		}
		return (
			<View>
				<View style={[StyleSheet.reducView, {marginBottom: 0}]}>
					<View style={[StyleSheet.reducView, {marginBottom: 0, backgroundColor: color, alignItems: 'center'}]}>
						<Text style={[StyleSheet.reducTitleText, {color: textColor}]}>{TitleText}</Text>
					</View>
					<Text style={[StyleSheet.reducValueText, {textAlignVertical: 'center'}]}>{this.reducText}</Text>
				</View>
				{secondElem}
			</View>
		);
	}
}