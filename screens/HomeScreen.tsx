import React from 'react';
import {ScrollView, View, FlatList, Platform, LayoutAnimation, Dimensions} from 'react-native';
import {NavigationActions, NavigationScreenProp} from 'react-navigation';

import { Banner, MainCategory } from '../helpers/interfaces';

import Text from '../components/MyText';
import Button from '../components/MyButton';
import {RenderMainCategorys, FullListData} from '../components/MainCategorysHandler';
import FakeTextInput from '../components/FakeTextInput';
import FnacBanner from '../components/FnacBanner';
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import {isIphoneX, toggleState, setAndroidAnimation} from '../helpers/Tools';
import StyleSheet from '../styles/HomeScreenStyles';
import AppStyleSheet from '../styles/AppStyles';
import CommonStyleSheet from '../styles/CommonStyles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const Width_Layout = Dimensions.get('window').width;
const Height_Layout = Dimensions.get('window').height;
const padding = 4;


export interface Props {
	navigation: NavigationScreenProp<any,any>
}

interface State {
	fullList: boolean,
	isLoading: boolean,
	isLoading2: boolean,
	isLoading3: boolean,
	contentHeight: number,
	banners: [Banner, Banner, Banner, Banner],
	float: boolean
}
//TODO: "Voir tout" button does nothing right now, need to either remove it or display a smaller / larger list
export default class HomeScreen extends React.Component<Props, State> {
	toggleState;
	isIphoneX;
	constructor(props) {
		super(props);
		this.state = {
			fullList: false,
			isLoading: true,
			isLoading2: true,
			isLoading3: true,
			contentHeight: 1000,
			banners: [undefined, undefined, undefined, undefined],
			float: false
		};
		//I don't really get why we need to bind our own methods, but we do
		this.goSearchScreen = this.goSearchScreen.bind(this);
		this.goUnderCategoriesScreen = this.goUnderCategoriesScreen.bind(this);
		this.scroll = this.scroll.bind(this);
		this.listExpand = this.listExpand.bind(this);
		this.listExpandAndroid = this.listExpandAndroid.bind(this);
		this.listExpandIos = this.listExpandIos.bind(this);
		this.getBanners = this.getBanners.bind(this);
		this.isIphoneX = isIphoneX.bind(this);
		this.toggleState = toggleState.bind(this);
		this.toggleFullList = this.toggleFullList.bind(this);
		this.renderBanners = this.renderBanners.bind(this);

		setAndroidAnimation();
	}

	async componentDidMount() {
		await this.getBanners();
	}

	async getBanners() {
		return fetch('http://app.suisse.fnac.ch/banners/', {
			method: 'GET'
		})
			.then(async response => response.json())
			.then(async responseJson => {
				this.setState({
					banners: responseJson as [Banner, Banner, Banner, Banner]
				});
				await new Promise(resolve => { setTimeout(resolve, 0); });
				LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
				this.setState({ isLoading: false });
				await new Promise(resolve => { setTimeout(resolve, 50); });
				LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
				this.setState({ isLoading2: false });
				await new Promise(resolve => { setTimeout(resolve, 450); });
				LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
				this.setState({ isLoading3: false });
			})
			.catch(error => {
				console.error(error);
			});
	}

	/*
	 **   Navigation
	 */
	goSearchScreen() {
		this.props.navigation.dispatch(
			NavigationActions.navigate({
				routeName: 'Recherche',
				action: NavigationActions.navigate({routeName: 'Research'})
			})
		);
	}

	goUnderCategoriesScreen(item: MainCategory) {
		this.props.navigation.navigate('Details', {category: item});
	}

	/*
	 **   FullList/SmallList
	 */
	scroll(val) {
		var bannerToScroll = this.state.banners[0]
			? ((Width_Layout - 2 * padding) / this.state.banners[0].width) * this.state.banners[0].height + 2 * padding
			: 4;
		var deltaToScroll = bannerToScroll + StyleSheet.fnacContainer.height;
		const tabBarHeight = AppStyleSheet.tabStyle.height;
		const iPhoneXSupplDelta = 78;
		const headerHeight = 44;
		const androidSupplDelta = 36;
		const screenHeight = Platform.OS === 'android' ? Height_Layout - tabBarHeight - headerHeight - androidSupplDelta
		: isIphoneX() ? Height_Layout - iPhoneXSupplDelta - headerHeight - tabBarHeight
										: Height_Layout - headerHeight - tabBarHeight;
		deltaToScroll = deltaToScroll > this.state.contentHeight - screenHeight ? (this.state.contentHeight - screenHeight) : deltaToScroll;
		this.refs.scrollViewRef.scrollTo({
			y: val == 0 ? StyleSheet.fnacContainer.height : deltaToScroll,//deltaToScroll,
			x: 0,
			animated: true
		});
	}

	toggleFullList() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
		this.toggleState('fullList');
	}

	listExpandIos() {
		this.toggleFullList();

		if (this.state.fullList) {
			setTimeout(() => {
				this.scroll(0);
			}, 0);
		}
	}

	async listExpandAndroid() {
		if (this.state.fullList) {
			this.scroll(0);
			this.toggleFullList();
		}
		else{
			this.toggleFullList();
			await new Promise(resolve => { setTimeout(resolve, 1000); });
			this.scroll(1);
		}
	}

	listExpand() {
		if (Platform.OS === 'android') {
			this.listExpandAndroid();
		} else {
			this.listExpandIos();
		}
	}

	/*
	 **   Renders
	 */
	renderBanners(emplacement) {
		return (
			<FnacBanner
				key={(emplacement - 1).toString()}
				banner={this.state.banners[emplacement - 1]}
				Width_Layout={Width_Layout}
				padding={padding}
				color="#e7e7e7"
			/>
		);
	}

	_renderMainCat = ({item}) => (<RenderMainCategorys item={item} method={this.goUnderCategoriesScreen} />)

	_onScroll = e => {
		if (e.nativeEvent.contentOffset.y >= 1) {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
			this.setState({float:true});
		}
		else if (e.nativeEvent.contentOffset.y < 1){
			LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
			this.setState({float:false});
		}
	}

	_onContentSizeChange = (contentWidth, contentHeight) => {
		this.setState({ contentHeight: contentHeight });
	}

	_keyExtractor = item => item.Id
	

	render() {	
		return (
			<>
					<View
						style={[
							StyleSheet.fnacContainer,
							{marginTop: this.state.isLoading ? -180 : 0, zIndex:10}
						]}
					>
						<View style={StyleSheet.uneEnvieParticuliereView}>
							<Text style={StyleSheet.uneEnvieParticuliereText}>Une envie</Text>
							<Text style={StyleSheet.uneEnvieParticuliereText}>particulière ?</Text>
						</View>
						<View style={{marginLeft:-1.5, marginTop:0}}>
								<FakeTextInput navigation={this.props.navigation} event={false}/>
						</View>
					</View>
					<View style={{flex: 1, marginTop: this.state.isLoading ? this.state.contentHeight - 180 : 0}}>
						{this.renderBanners(1)}
						<FlatList
							style={[
								StyleSheet.flatList,
								{
									marginTop: this.state.banners[0] ? 0 : 4
								}
							]}
							data={this.state.fullList ? FullListData : FullListData.slice(0,4)}
							renderItem={this._renderMainCat}
							keyExtractor={this._keyExtractor}
						/>
						<View style={StyleSheet.buttonView}>
							<Button title={!this.state.fullList ? 'Voir tout' : 'Réduire'} onPress={this.listExpand} />
						</View>
						{[2, 3, 4].map((number) => this.renderBanners(number))}
					</View>
				<View style={{position:'absolute', top:0, left: this.state.isLoading2 ? 0 : Width_Layout, bottom:0, width:Width_Layout}}>
					<FullPageActivityIndicator/>
				</View>
				{/*<View style={{height:1}, [this.state.float ? {position: 'absolute', top:129, right:45} : this.state.isLoading ? {left: 20, top:-765} : {left: 20, top:-582}]}>
									<FakeTextInput navigation={this.props.navigation} event={this.state.float} />
								</View>*/}
				{/*<View style={{position:'absolute', marginTop: this.state.isLoading2 ? -40 : 129, right:45}}>
									<FakeTextInput navigation={this.props.navigation} event={this.state.float} />
								</View>*/}
			</>
		);
	}
}