import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import CommonStyleSheet from '../styles/CommonStyles';
import StyleSheet from '../styles/MyActivityIndicatorStyles';

class MyActivityIndicator extends React.PureComponent<any,any> {
	render() {
		return <ActivityIndicator size="large" color={CommonStyleSheet.fnac.color} />;
	}
}

class FullPageActivityIndicator extends React.PureComponent<any,any> {
	render() {
		return (
			<View style={StyleSheet.activityIndicatorView}>
				<ActivityIndicator size="large" color={CommonStyleSheet.fnac.color} />
			</View>
		);
	}
}

export {MyActivityIndicator, FullPageActivityIndicator};
