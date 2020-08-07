import React from 'react';
import {StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
	fnac: {
		color: '#e9aa00',
	},
	fnac_red: {
		color: '#dd1e35',
	},
	fnac_green:{
		color: '#6a9d47',
	},
	fnac_teal:{
		color: '#00bc99',
	},
	responsiveImg: {
		flex:1,
		height:340,
		width:340,
		resizeMode: 'contain'
	},
	greyButtonWithIcon: {
		flex: 1,
		height: 35,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 10,
		margin: 10,
	}
});
