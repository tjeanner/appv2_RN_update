import React from 'react';
import{
	View, Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';

import Text from '../components/MyText';
import { InfosPrice, Offer, ArticleOpcInfo } from '../helpers/interfaces';
import ReductionBadge from './ReductionBadge';
import PriceOffer from './PriceOffer';
import PriceStandard from './PriceStandard';
import StyleSheet from '../styles/RenderItemInListStyles';



interface Props{
	infosPrice:InfosPrice,
	articleOpcInfo:ArticleOpcInfo
}

export default class DetailedPrice extends React.PureComponent<Props,any>{
	priceTxt;
	priceTitle;
	AdditionalElemAdh;
	constructor(props){
		super(props)
		this.priceTxt = '';
		this.priceTitle = null;
		this.AdditionalElemAdh = null;
	}

	//Reduction
	render(){
		return(
			<View style={{backgroundColor:'transparent', margin:5, flexDirection:'column', justifyContent:'flex-start'}}>
				{this.standardPriceElem}
				{this.reducElem}
			</View>
		);
	}

	get reducElem() {
		if (!this.props.articleOpcInfo.HasPromoToShow) {
			return null;
		}
		return (
				<View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>
					<ReductionBadge
						articleOpcInfo={this.props.articleOpcInfo}
						price={this.props.infosPrice}
					/>
					<PriceOffer
						articleOpcInfo={this.props.articleOpcInfo}
						infosPrice={this.props.infosPrice}
						quantity={1}
					/>
				</View>
		);
	}

	get standardPriceElem() {
		if (this.props.articleOpcInfo.PromoCssClass != 'OffreAdherent') {
			return null;
		}
		let priceTitle =
			<View style={{height:30}}>
				<Text>PRIX STANDARD</Text>
			</View>;

		return (
				<View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>
					{priceTitle}
					<PriceStandard
						articleOpcInfo={this.props.articleOpcInfo}
						infosPrice={this.props.infosPrice}
						quantity={1}
					/>
				</View>
		);
	}
}
