import React from 'react';
import {StyleSheet} from 'react-native';
import CommonStyleSheet from './CommonStyles';

const middleViewCrossPlatform = {
	flexDirection: 'row',
	justifyContent: 'center',
	backgroundColor: CommonStyleSheet.fnac.color,
	borderRadius: 5,
	alignItems: 'center'
};

export default StyleSheet.create({
	text: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	innerView: {
		borderRadius: 5,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	middleViewIos: {
		...middleViewCrossPlatform,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.8,
		shadowRadius: 2
	},
	middleViewAndroid: {
		...middleViewCrossPlatform,
		elevation: 5
	},
	outerView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
