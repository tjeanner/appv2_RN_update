import React from 'react';
import {  View, Button } from 'react-native';

import Text from './MyText';

import CommonStyleSheet from '../styles/CommonStyles';
import {  AvailabilitySimple } from '../helpers/interfaces';

import { Icon } from 'react-native-elements';

interface Props {
    availability: AvailabilitySimple,
}


export default class RenderStoreAvailability extends React.PureComponent<Props, any> {
    render() {
        console.log(this.props.availability)
        return (
            <View style={{ flex:1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems:'center'}}>
                {this.badgeInStock}
                {this.retrieveButton}
            </View>
        )
    }

    get retrieveButton(){
        if(this.props.availability.IsAvailableInOneHour){
            return <Button title={this.props.availability.AvailabilityDelay}  onPress={()=>{}} color={CommonStyleSheet.fnac_teal.color}/>
        } else if(this.props.availability.IsAvailableInStore){
            return <Button title={this.props.availability.AvailabilityDelay}  onPress={()=>{}} color="black"/>
        } else {
            return null;
        }
    }

    get badgeInStock(){
        if(this.props.availability.IsAvailableInOneHour){
            return this.inStoreIndicator
        } else if(this.props.availability.IsAvailableInStore){
            return this.notInStoreIndicator
        } else {
            return this.unavailableIndicator
        }
    }

    get inStoreIndicator() {
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
				<Icon name='check' size={17} color={CommonStyleSheet.fnac_green.color} type="font-awesome" />
				<Text style={{ color: CommonStyleSheet.fnac_green.color }}>{this.props.availability.StatusLabel}</Text>
			</View>
		);
	}

	get notInStoreIndicator(){
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
				<Icon name='times' size={17} color={'black'} type="font-awesome" />
				<Text style={{ color: 'black' }}>{this.props.availability.StatusLabel}</Text>
			</View>
		);
    }

    get unavailableIndicator(){
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
				<Icon name='times' size={17} color={CommonStyleSheet.fnac_red.color} type="font-awesome" />
				<Text style={{ color: CommonStyleSheet.fnac_red.color }}>{this.props.availability.StatusLabel}</Text>
			</View>
		);
    }
}
