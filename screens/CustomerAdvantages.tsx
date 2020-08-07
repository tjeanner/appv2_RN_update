import React from 'react';
import {View, Linking, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

const screenHeight = Dimensions.get('window').height;

interface State {
	height:number,
}

export default class CustomerAdvantages extends React.Component<any, State> {
	webview;
	static navigationOptions(){
		return {
			headerTitle: 'Mes avantages'
		};
	};

	constructor(props) {
		super(props);
		this.state = {height: screenHeight};
	}

	shouldComponentUpdate() {
		return true;
	}

	onLayout = event => {
		if (this.state.height !== screenHeight) return; // layout was already called
		let {width, height} = event.nativeEvent.layout;
		this.setState({height: height});
		console.log(height);
	};

	render() {
		const uri = 'https://www.fr.fnac.ch/Adherents/choisir_carte.aspx';
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1 }} onLayout={this.onLayout}>
					<WebView
						source={{ uri }}
						ref={ref => {
							this.webview = ref;
						}}
						onNavigationStateChange={event => {
							if (event.url !== uri) {
								this.webview.stopLoading();
								Linking.openURL(event.url);
							}
						}}
					/>
				</View>
			</View>
		);
	}
}
