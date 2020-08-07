import React from 'react';
import {
	View,
	Text,
	ScrollView,
	ImageBackground,
	Dimensions,
	Image,
} from 'react-native';
import Orientation from 'react-native-orientation';
import { NavigationEvents, NavigationScreenProp } from 'react-navigation';
import { Overlay } from 'react-native-elements';

import CardBarCode from '../components/CardBarcode'
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import Card from '../components/Card';
import { Customer } from '../helpers/interfaces';
import CardDetails from '../components/CardDetails';

import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


interface State {
	isLoading: boolean,
	overlayVisible:boolean,
	customer:Customer,
}
export default class CardScreen extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			overlayVisible:false,
			isLoading: true,
			customer:null,
			};
		this.getData = this.getData.bind(this);
		this._orientationDidChange = this._orientationDidChange.bind(this);
	}
	componentDidMount() {
		Orientation.addOrientationListener(this._orientationDidChange);
		this.getData();
	}

	componentWillUnmount() {
		Orientation.removeOrientationListener(this._orientationDidChange);
	  }

	_orientationDidChange = (orientation) => {
		if (orientation === 'LANDSCAPE') {
		  this.setState({
			  overlayVisible:true,
		  })
		} else {
			this.setState({
				overlayVisible:false,
			})
		}
	  }


	async getData() {
		let userId = await AsyncStorage.getItem('userId');
		const url = 'http://app.suisse.fnac.ch/customers/' + userId;
		return fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					customer: responseJson,
					isLoading: false,
				});
			})
	}


	render() {
		if (this.state.isLoading) {
			return (
				<View>
					<FullPageActivityIndicator />
					<NavigationEvents
						style={{ flex: 0 }}
						onDidFocus={payload => Orientation.unlockAllOrientations()}
						onWillBlur={payload => Orientation.lockToPortrait()}
					/>
				</View>
			);
		}

		return (
			<ScrollView>
				<View style={{ flex: 1, flexDirection: 'column', alignItems: "center", alignContent: 'flex-start' }}>
					<NavigationEvents
						style={{ flex: 0 }}
						onDidFocus={payload => Orientation.unlockAllOrientations()}
						onWillBlur={payload => Orientation.lockToPortrait()}
					/>
					<Card customer={this.state.customer} />
					<Text>
						Tournez votre téléphone pour afficher le code-barre de votre carte Fnac
			</Text>
					<CardDetails customer={this.state.customer} navigation={this.props.navigation} />
				</View>
				<Overlay
					isVisible={this.state.overlayVisible}
					children={<CardBarCode customer={this.state.customer} />}
					fullScreen={true}
				/>

			</ScrollView>
		);
	}
}
