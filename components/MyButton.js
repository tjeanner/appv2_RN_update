import React from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import StyleSheet from '../styles/MyButtonStyles';
import CommonStyleSheet from '../styles/CommonStyles';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import Text from '../components/MyText';

export default class Button extends React.PureComponent {
	render() {
		const {
			color = CommonStyleSheet.fnac.color,
			height = 30,
			width = responsiveWidth(33)
		} = this.props;
		return (
			<View style={[StyleSheet.outerView, {height: height}]}>
				<View
					style={Platform.select({
						ios: StyleSheet.middleViewIos,
						android: StyleSheet.middleViewAndroid
					})}
				>
					<TouchableOpacity onPress={this.props.onPress}>
						<View style={[StyleSheet.innerView, {height: height, width: width}]}>
							<Text style={StyleSheet.text}>
								{this.props.title}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
