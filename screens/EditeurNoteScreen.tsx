import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';

import Text from '../components/MyText';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<any, any>,
}

export default class EditeurNoteScreen extends React.PureComponent<Props,any> {

	render() {
		return (
			<ScrollView>
				<Text style={{ margin: 20 }}>MOT DE L'ÉDITEUR</Text>
				<View
					style={{ backgroundColor: 'white', margin: 4, padding: 20 }}
				>
					<Text>{this.props.navigation.getParam('text')}</Text>
				</View>
			</ScrollView>
		);
	}
}
