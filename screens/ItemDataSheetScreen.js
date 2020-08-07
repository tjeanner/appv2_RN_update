import React from 'react';
import {
	View,
	ScrollView,
	FlatList,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import {Icon }from 'react-native-elements';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import HTML from 'react-native-render-html';

import Text from '../components/MyText';
import {fontMaker} from '../components/fontMaker';
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import CommonStyleSheet from '../styles/CommonStyles';

export default class ItemDataSheetScreen extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {isLoading: true};
		this.parseHtml = this.parseHtml.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	static navigationOptions = {
		header: null
	};

	componentWillUnmount() {
		this.mounted = false;
	}
	componentDidMount() {
		this.mounted = true;
		this.parseHtml();
	}

	parseHtml() {
		const data = this.props.navigation.state.params.data;
		var i = 0;
		while (i < data.length) {
			if (
				data[i].PropertyText[0] !== undefined &&
				data[i].PropertyText[0] !== null
			) {
				data[i].PropertyText[0] = data[i].PropertyText[0].replace(
					'line-height: normal;',
					''
				);
				data[i].PropertyText[0] = data[i].PropertyText[0].replace(
					'line-height:normal;',
					''
				);
			}
			i++;
		}
		if (this.mounted) {
			this.setState({isLoading: false});
		}
	}

	renderItem(item) {
		if (
			item.item.PropertyText[0] === undefined ||
			item.item.PropertyText[0] === null
		) {
			console.log(item);
			return null;
		}
		return (
			<View
				style={{
					flex: 1,
					margin: 4,
					marginBottom: 0,
					padding: 5,
					backgroundColor: 'white'
				}}
			>
				<Text style={{color: 'grey'}}>{item.item.PropertyName}</Text>
				<HTML
					html={item.item.PropertyText[0]}
					imagesMaxWidth={Dimensions.get('window').width}
				/>
				{/*<Text style={{...fontMaker({weight:'Bold'})}}>{item.item.PropertyText[0]}</Text>*/}
			</View>
		);
	}

	render() {
		if (this.state.isLoading) {
			return <FullPageActivityIndicator />;
		}
		return (
			<ScrollView>
				<View
					style={{
						height: 120,
						backgroundColor: CommonStyleSheet.fnac.color,
						flexDirection: 'column',
						justifyContent: 'space-between',
						alignItems: 'flex-start'
					}}
				>
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
						<View
							style={{
								width: 50,
								height: 50,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Icon name="times" size={20} color="white" type="font-awesome"/>
						</View>
					</TouchableOpacity>
					<Text
						style={{
							marginLeft: 30,
							marginBottom: 25,
							color: 'white',
							fontSize: responsiveFontSize(4.5)
						}}
					>
						Caractéristiques
					</Text>
				</View>
				<FlatList
					keyExtractor={(item, index) => item.PropertyName.toString()}
					data={this.props.navigation.state.params.data}
					renderItem={this.renderItem}
				/>
				{/*<Text style={{}}>{JSON.stringify(this.props.navigation.state.params.data)}</Text>*/}
			</ScrollView>
		);
	}
}
