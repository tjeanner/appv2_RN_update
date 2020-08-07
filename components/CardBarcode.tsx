import React from 'react';
import {View} from 'react-native';
import Barcode from 'react-native-barcode-builder';

import Text from './MyText';
import StyleSheet from '../styles/CardScreenDetailStyles';
import {fontMaker} from './fontMaker';
import { Customer } from '../helpers/interfaces';


interface Props {
	customer:Customer
}
export default class CardBarcode extends React.PureComponent<Props,any> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={StyleSheet.codeBarContainer}>
				<View style={StyleSheet.nameView}>
					<Text style={StyleSheet.nameText}>
						{this.props.customer.firstName.charAt(0).toUpperCase() +
							this.props.customer.firstName.slice(1).toLowerCase()}{' '}
						<Text style={{...fontMaker({weight: 'Bold'})}}>
							{this.props.customer.surname.toUpperCase()}
						</Text>
					</Text>
				</View>
				<View>
					<Barcode
						value={this.props.customer.card}
						text={this.props.customer.card}
					/>
				</View>
				<View>
					<Text>
						Votre carte est valable jusqu'au
						<Text style={{...fontMaker({weight: 'Bold'})}}>
							{' ' + this.props.customer.dEndValidDate.slice(0,10).split('-').reverse().join('.')}
						</Text>
					</Text>
				</View>
			</View>
		);
	}
}
