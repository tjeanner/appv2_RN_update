import React from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Platform,
	LayoutAnimation,
	Dimensions,
	Image
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage'
import Text from '../components/MyText';
import {fontMaker} from '../components/fontMaker';
import RenderItemInList from '../components/RenderItemInList';
import StyleSheet from '../styles/ReSearchScreenStyles';
import {setAndroidAnimation} from '../helpers/Tools';
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import CommonStyleSheet from '../styles/CommonStyles';
import { NavigationScreenProp } from 'react-navigation';
import { searchItems } from '../helpers/NodeService'
import { ItemRepresentation, ItemRepresentation_large, LoadPageOfItemRepresentation } from '../helpers/interfaces';
import ItemsList from '../components/ItemsList';

export interface Props {
	navigation: NavigationScreenProp<any, any>,
}

export interface State {
	history: string[],
	hasSubmit: boolean,
	buttonVisibility: boolean,
}

export default class ResearchScreen extends React.Component<Props,State> {
	text;
	_textInput;
	constructor(props) {
		super(props);
		this.state = {
			history: [],
			hasSubmit: false,
			buttonVisibility: false
		};
		this.text = '';
		this.getSuggest = this.getSuggest.bind(this);
		this.renderHistoryItems = this.renderHistoryItems.bind(this);
		this.updateHistory = this.updateHistory.bind(this);
		this.submitSearchFromHistory = this.submitSearchFromHistory.bind(this);
		this.getResearchHistory = this.getResearchHistory.bind(this);
		this.updateHistory = this.updateHistory.bind(this);
		this.removeItemFromHistory = this.removeItemFromHistory.bind(this);
		this.clearText = this.clearText.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		setAndroidAnimation();
	}


	async componentDidMount() {
		await this.getResearchHistory();
	}

	async getResearchHistory() {
		let ancientEntries= await AsyncStorage.getItem('searchHistory');
		let existingEntries:string[] = JSON.parse(ancientEntries);
		if (existingEntries !== null && existingEntries.length > 0) {
			this.setState({history: existingEntries});
		}
	}

	async updateHistory(newEntry: string) {
		let oldEntries = this.state.history;

		if(oldEntries.includes(newEntry) || newEntry == ''){
			return;
		}

		let updatedEntries = [newEntry, ...oldEntries];

		await AsyncStorage.setItem(
			'searchHistory',
			JSON.stringify(updatedEntries)
		)
		this.setState({history:updatedEntries});
	}

	async removeItemFromHistory(item:string) {
		let ancientEntries = await AsyncStorage.getItem('searchHistory');
		let existingEntries:string[] = JSON.parse(ancientEntries);

		if (existingEntries !== null && existingEntries.length > 0) {
			//our item filtered out
			let updatedEntries = existingEntries.filter(entry =>{
				return entry != item;
			});

			await AsyncStorage.setItem(
				'searchHistory',
				JSON.stringify(updatedEntries)
			)

			this.setState({history: updatedEntries});
		}
	}

	//In ItemListScreen this function will load which pageOf<ItemRepresentation> we want
	get dataRetriever() {
		let dataRetriever: LoadPageOfItemRepresentation =
			(pageIndex: number, pageSize: number = 20, nameConfiguration: string = 'large') => {
				let keywords = this.text.split(' ');
				return searchItems(keywords, pageIndex, pageSize, nameConfiguration);
			}
		return dataRetriever;
	}

	submitSearchFromHistory(item:string){
		this.text = item;
		this._textInput.setNativeProps({text:this.text});
		this._textInput.blur();
		this.handleSubmit();
	}

	clearText(){
		this.text = '';
		this._textInput.setNativeProps({text:''});
	}

	getSuggest() {
		//TODO: I don't know what this line does
		LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
		this.setState({hasSubmit: false});
	}


	renderHistoryItems({item}) {
		const Width = Dimensions.get('window').width;
		return (
			<View
				style={{
					height: 30,
					flex: 1,
					padding: 4,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: 'white',
					margin: 2
				}}
			>
				<TouchableOpacity onPress={() => this.removeItemFromHistory(item)}>
					<View
						style={{
							height: 30,
							width: 30,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Icon name="times" size={15} color="grey" type="font-awesome" />
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.submitSearchFromHistory(item)}>
					<View
						style={{
							flexDirection: 'row',
							height: 30,
							justifyContent: 'flex-start',
							alignItems: 'center',
							width: Width - 42
						}}
					>
						<View style={{width: Width - 72}}>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 20,
									textAlignVertical: 'center'
								}}
							>
								{item}
							</Text>
						</View>
						<View
							style={{
								height: 30,
								width: 30,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Icon name="history" size={15} color="grey" type="font-awesome"/>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	handleSubmit(){
		this.setState({
			hasSubmit:true
		});
		this.updateHistory(this.text);
	}

	_keyExtractor = (item, index) => index.toString()

	render() {		
		let List = null;
		if (!this.state.hasSubmit) {
			List = (
				<FlatList
					keyboardShouldPersistTaps="always"
					data={this.state.history}
					renderItem={this.renderHistoryItems}
					keyExtractor={this._keyExtractor}
				/>
			);
		} else {
			List = (
				<ItemsList dataRetriever={this.dataRetriever} navigation={this.props.navigation} displayName={this.text} />
			);
		}
		if (this.state.history == null) {
			return <FullPageActivityIndicator />;
		}
		return (
				<View
					style={{
						flex:1,
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
				>
					<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						backgroundColor: '#e7e7e7',
						paddingLeft: 20,
						paddingRight:20,
						height: 40,
					}}
					>

						<TextInput
							ref={component => this._textInput = component}
							underlineColorAndroid="transparent"
							placeholder={'Un produit, une marque...'}
							placeholderTextColor="grey"
							style={{flex: 1}}
							onFocus={this.getSuggest}
							onChangeText={text => this.text=text}
							onSubmitEditing={this.handleSubmit}
							autoCorrect={false}
							autoFocus={true}
							clearTextOnFocus={true}
							blurOnSubmit={true}
							clearButtonMode="always"
							selectionColor={CommonStyleSheet.fnac.color}
							returnKeyType="search"
							textContentType="none"
							keyboardType="default"
							multiline={false}
						/>
						<TouchableOpacity onPress={this.clearText}>
						<Icon name="times" size={25} color="grey" type="font-awesome" />
						</TouchableOpacity>
					</View>
					{List}
				</View>
		);
	}

}


class FloatingButton extends React.Component<any,any> {
	constructor(props) {
		super(props);
	}

	render() {
		let buttonHeight = 40;
		let buttonWidth = !this.props.test ? 200 : 40;
		let Elem = !this.props.test ? (
			<Text>Paramètres de la recherche</Text>
		) : (
			<Icon name="cog" size={15} color="black" type="font-awesome"/>
		);
		return (
			<View
				style={{
					position: 'absolute',
					bottom: 20,
					right: 20,
					height: buttonHeight,
					width: buttonWidth
				}}
			>
				<TouchableOpacity onPress={this.scrollToTop}>
					<View
						style={{
							height: buttonHeight,
							width: buttonWidth,
							borderRadius: 20,
							backgroundColor: '#e9aa00aa',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{Elem}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}