import React from 'react';
import {Text} from 'react-native';
import {fontMaker} from './fontMaker';

export default props => (
	<Text {...props} style={[fontMaker({}), props.style]}>
		{props.children}
	</Text>
);
