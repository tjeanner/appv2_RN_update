import React from 'react';
import{
	View,

} from 'react-native';
import {Icon}from 'react-native-elements';

import Text from './MyText';
import BuyOnline from './BuyOnline';
import PickupInStore from './PickupInStore';
import DetailedPrice from './DetailedPrice';
import { ItemRepresentation_large } from '../helpers/interfaces';
import { NavigationScreenProp } from 'react-navigation';

interface Props{
	item:ItemRepresentation_large,
	navigation: NavigationScreenProp<any, any>,
}

export default class SellElems extends React.PureComponent<Props, any> {
	render(){
		return(
			<View style={{marginBottom:100}}>
				<View style={{backgroundColor:'pink'}}>
				</View>
				<DetailedPrice infosPrice={this.props.item.InfosPrice} articleOpcInfo={this.props.item.ArticleOpcInfo}/>
				<BuyOnline item={this.props.item}/>
				<PickupInStore item={this.props.item} navigation={this.props.navigation} />
			</View>
		);
	}
}
