import React from 'react';
import {Icon} from 'react-native-elements';

import CommonStyleSheet from '../styles/CommonStyles';


export default class Star extends React.PureComponent<{value:number},any> {
	render() {
		const {color} = CommonStyleSheet.fnac;
		if (this.props.value < 0.5) {
			return null;
		} else if (this.props.value < 1.0) {
			return <Icon name="star-half" size={15} color={color} type="font-awesome"/>;
		}
		return <Icon name="star" size={15} color={color} type="font-awesome"/>;
	}
}
