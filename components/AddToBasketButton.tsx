import React from 'react';
import{
	View,
	TouchableOpacity,
} from 'react-native';
import {Icon}from 'react-native-elements';
import { connect } from 'react-redux'

import Text from './MyText';
import CommonStyleSheet from '../styles/CommonStyles';
import { addOneItemToBasket, getBasketContent } from '../helpers/BasketService';
import { CatalogItemReference, ItemRepresentation_large } from '../helpers/interfaces';
import { Dispatch } from 'redux';


interface Props {
	item: ItemRepresentation_large
	dispatch: Dispatch
}

class AddToBasketButton extends React.PureComponent<Props, any>{

	constructor(props){
		super(props)
		this.addItemToBasket =  this.addItemToBasket.bind(this);
	}

	async addItemToBasket(){
		await addOneItemToBasket(this.props.item.Prid.Id);
		let cart = await getBasketContent();
		const action = {type:'UPDATE_CART', cart: cart};
		this.props.dispatch(action);
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.addItemToBasket}>
					<View style={{
						backgroundColor: CommonStyleSheet.fnac.color, height: 45, flex: 1, margin: 15, marginBottom: 0, borderRadius: 10, flexDirection: 'row',
						justifyContent: 'center', alignItems: 'center'
					}}>
						<Icon name='shopping-basket' size={20} color='white' type="font-awesome" />
						<Text style={{ color: 'white', marginLeft: 10 }}>Ajouter au panier</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
  
export default connect()(AddToBasketButton)
  