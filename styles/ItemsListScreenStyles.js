import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	ScrollView: {
		flex: 1,
		padding: 2,
		backgroundColor: '#e7e7e7'
	},
	ContentView: {
		flex: 1,
		backgroundColor: 'white'
	},
	textView: {
		paddingTop: 2
	},
	text: {
		textAlign: 'center',
		fontSize: 11
	},
	image: {
		width: 120,
		height: 120
	},
	imageView: {
		height: 30
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
	}
});
