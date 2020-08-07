import React from 'react';
import {StyleSheet} from 'react-native';
import {fontMaker} from '../components/fontMaker';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
	flatlist: {
		margin: 2,
		backgroundColor: '#e7e7e7'
	},
	textStoreName: {
		fontSize: 14,
		color: 'black',
		...fontMaker({weight: 'Bold'})
	},
	textadress: {
		color: '#aaaaaa',
		fontSize: 11
	},
	isOpen: {
		height: 20
	},
	mainContainer: {
		marginTop: 2,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 20,
		paddingRight: 0,
		backgroundColor: 'white',
		flexDirection: 'column'
	},
	ScrollView: {
		backgroundColor: '#e7e7e7'
	},
	fnacContainer: {
		backgroundColor: '#434e7b',
		height: 168,
		padding: 20,
		flexDirection: 'column',
		justifyContent: 'flex-end'
	},
	trouverMagasinText: {
		color: 'white',
		fontSize: responsiveFontSize(4.5)
	},
	tousLesMagasinsText: {
		color: '#707070',
		fontSize: 16.5,
		marginLeft: 15
	},
	tousLesMagasinsView: {
		backgroundColor: '#e7e7e7',
		height: 53,
		padding: 10,
		flexDirection: 'column',
		justifyContent: 'center'
	}
});
