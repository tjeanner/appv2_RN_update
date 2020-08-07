import React from 'react';
import{
	View,
	TouchableOpacity,
} from 'react-native';
import {Icon}from 'react-native-elements';

import Text from './MyText';
import { AvailabilityOnFnacCom, ItemRepresentation_large } from '../helpers/interfaces';
import { NavigationScreenProp } from 'react-navigation';


interface Props {
	item: ItemRepresentation_large,
	navigation: NavigationScreenProp<any, any>,
}



export default class PickupInStore extends React.PureComponent<Props,any>{
	constructor(props){
		super(props)
		this.showAvailabilityScreen = this.showAvailabilityScreen.bind(this);
	}

	showAvailabilityScreen(){
		this.props.navigation.push('Availability', {item: this.props.item});
	}

	render(){
		return(
			<View>
				<TouchableOpacity onPress={this.showAvailabilityScreen}>
					<View style={{backgroundColor:'white', height:30, flex:1, margin:15, marginBottom:0, flexDirection:'row',
					justifyContent:'flex-start', alignItems:'center'}}>
						<Icon name='map-marker' size={20} color='black' type="font-awesome"/>
						<Text style={{color:'black', marginLeft:10}}>Voir disponibilités en magasin</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={{backgroundColor:'black', height:45, flex:1, margin:15, marginBottom:0, borderRadius:10, flexDirection:'row',
					justifyContent:'center', alignItems:'center'}}>
						<Icon name='bicycle' size={20} color='white' type="font-awesome"/>
						<Text style={{color:'white', marginLeft:10}}>Retrait gratuit en magasin</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}