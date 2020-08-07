import React from 'react';
import {StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

import {fontMaker} from '../components/fontMaker';

export default StyleSheet.create({
	reviewMainView: {
		height: 15,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 15
	},
	reviewStarView: {
		height: 15,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	priceView: {
		marginLeft: 15,
		height: 18,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end'
	},
	price: {
		color: 'red',
		...fontMaker({weight: 'Bold'}),
		fontSize: responsiveFontSize(0.12 * 18)
	},
	priceExponant: {
		color: 'red',
		...fontMaker({weight: 'Bold'}),
		fontSize: responsiveFontSize(0.12 * 14),
		marginTop: 1
	},
	priceReduc: {
		marginLeft: 5,
		textDecorationLine: 'line-through',
		fontSize: responsiveFontSize(0.12 * 15)
	},
	priceReducExponant: {
		textDecorationLine: 'line-through',
		fontSize: responsiveFontSize(0.12 * 12),
		marginTop: 1
	},
	noPhotoLogo: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		//height: 180
	},
	ScrollView: {
		padding: 2,
		backgroundColor: '#e7e7e7'
	},
	reducView: {
		height: 20,
		marginTop: 0,
		//backgroundColor:'pink',
		marginBottom: 5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		//alignItems: 'center'
	},
	reducTitleText: {
		marginLeft: 5,
		marginRight: 5,
		fontSize: responsiveFontSize(0.12 * 12),
		...fontMaker({weight: 'Bold'}),
		color: 'white'
	},
	reducValueText: {
		marginLeft: 5,
		fontSize: responsiveFontSize(0.12 * 12),
		...fontMaker({weight: 'SemiBold'}),
		color: 'red'
	},
	ContentView: {
		flex: 1,
		backgroundColor: 'white'
	},
	textView: {
		//paddingTop:2,
	},
	text: {
		textAlign: 'center',
		fontSize: responsiveFontSize(0.12 * 11)
	},
	image: {
		width: 120,
		height: 120
	},
	imageView: {
		flex:1,
		paddingLeft: 15,
		paddingRight: 15
	},
	NbPicker: {
		height: 30,
		width: 60
	},
	settingsView: {
		flexDirection: 'column'
	},
	NbPickerView: {
		flexDirection: 'row'
	},
	label: {
		fontSize: responsiveFontSize(0.12 * 12)
	}
});
