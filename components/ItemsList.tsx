import React from 'react';
import {
	View,
	FlatList,
	//Alert,
	ScrollView,
	Image,
	TouchableOpacity,
	Platform,
	LayoutAnimation,
	Dimensions
} from 'react-native';
import {Icon} from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

import Text from '../components/MyText';
import Button from '../components/MyButton';
import RenderItemInList from '../components/RenderItemInList';
import RenderItemInMosaic from '../components/RenderItemInMosaic';
import StyleSheet from '../styles/ItemsListScreenStyles';
import RendererItemStyleSheet from '../styles/RenderItemInListStyles';
import {setAndroidAnimation} from '../helpers/Tools';
import {FullPageActivityIndicator, MyActivityIndicator} from '../components/MyActivityIndicator';
import CommonStyleSheet from '../styles/CommonStyles';
import { ItemRepresentation, PageOf, Node, ItemRepresentation_medium, ItemRepresentation_large, LoadPageOfItemRepresentation } from '../helpers/interfaces';
import { getItemsFromNode } from '../helpers/NodeService';


export const Width = Dimensions.get('window').width;
const size = (Width - 8) / 2;


interface Props {
	navigation: NavigationScreenProp<any,any>,
	dataRetriever: LoadPageOfItemRepresentation,
	displayName: string,
	}

interface State {
	page: number,
	nb_pages: number,
	total: number,
	entries: ItemRepresentation[],
	end: boolean,
	buttonV: number
}

export default class ItemsList extends React.Component<Props, State> {
	delta:number 
	height:number 

	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			nb_pages: 0,
			total: 0,
			entries: [],
			end: false,
			buttonV: 0,
			list: true,
			scrolledList: 0,
			scrolledMosaic: 0,
		};
		this.loadItems = this.loadItems.bind(this);
		this.setScroll = this.setScroll.bind(this);
		this.toggleList = this.toggleList.bind(this);
		this.RenderItemInMosaic = this.RenderItemInMosaic.bind(this);
		this.RenderItemInList = this.RenderItemInList.bind(this);

		setAndroidAnimation();
	}

	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: navigation.getParam('name')
		};
	};

	componentDidMount() {
		this.loadItems();
	}


	//Since we have paginated Items from API, we use these parameters for ActivityIndicators
	async loadItems() {
		if(this.state.end){
			return;
		}
		//Since we instanciate this screen from different places, we give it a dataRetriever function that
		//we only need to complete with pageIndex, pageSize, loadConfig
		const dataRetriever = this.props.dataRetriever;
		const pageOfItems = await dataRetriever(this.state.page + 1, 10, 'large');

		//Some items may have no Infoprice, this means they are unavailables and should be filtered out
		let data = pageOfItems.PageOfResults.filter(item => {
			//return item.InfosPrice != null;
			return true;
		});

		LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
		this.setState(prevState => {
			const entries = [...prevState.entries, ...data];
			return {
				entries:entries,
				total: entries.length,
				page: pageOfItems.Selector.PageNumber,
				nb_pages: pageOfItems.Selector.PageCount,
				end: pageOfItems.Selector.PageNumber >= pageOfItems.Selector.PageCount ? true : false
			}
		});
	}

	RenderItemInList({item}) {
		return <RenderItemInList item={item as ItemRepresentation_large} navigation={this.props.navigation}/>;
	}

	RenderItemInMosaic({item}) {
		return <RenderItemInMosaic item={item as ItemRepresentation_large} navigation={this.props.navigation}/>;
	}

	setScroll(event){
		let val = event.nativeEvent.contentOffset.y;
		if(this.state.list){
			val = (val - val % 224) / 224;
			this.setState({scrolledList: val});
		}else{
			val = (val - val % 284) / 284;
			this.setState({scrolledMosaic: val});
		}
	}

	async toggleList(){
		if(this.state.list){
			this.setState(prevState => ({list: !prevState.list}));
			await new Promise(resolve => { setTimeout(resolve, 200); });
			this.refs.flatList.scrollToOffset({
				offset: (this.state.scrolledList - this.state.scrolledList % 2) * 284 / 2,
				animated: false
			});
			this.setState(prevState => ({scrolledMosaic: this.state.scrolledList / 2}));
		}else{
			this.setState(prevState => ({list: !prevState.list}));
			await new Promise(resolve => { setTimeout(resolve, 200); });			
			this.refs.flatList.scrollToOffset({
				offset: this.state.scrolledMosaic * 224 * 2,
				animated: false
			});
			this.setState(prevState => ({scrolledList: this.state.scrolledMosaic * 2}));
		}
	}

	render() {
		let Elem = null;
		//If not loaded (page 0) and not the end (page 0 is the end if empty list)
		if (this.state.page == 0 && !this.state.end) {
			return <FullPageActivityIndicator />;
		}
		else if (!this.state.end) {
			Elem = <MyActivityIndicator />;
		} else {
			Elem = (
				<View
					style={{
						height: 35,
						backgroundColor: CommonStyleSheet.fnac.color,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ fontSize: 17, color: 'white' }}>Tout Les éléments ont été affichés !</Text>
				</View>
			);
		}
		return (
			<View style={{ flex: 1, backgroundColor:'#e7e7e7'}}>
			<View style={{ flexDirection:'row-reverse'}}>
			<TouchableOpacity onPress={() => {this.toggleList();}}>
				<Icon name={!this.state.list ? 'bars' : 'th-large'} size={30} color="black" type="font-awesome"/>
			</TouchableOpacity>
			</View>
				<FlatList
					getItemLayout={(data, index) => (
    					{length:!this.state.list ? 224 : 284, offset:!this.state.list ? 224 * index : 284 * index, index}
    				)}
    				initialNumToRender={this.state.total}
					onMomentumScrollEnd={(event) => {this.setScroll(event);}}
					key={(this.state.list ? 'h' : 'v')}
					ref="flatList"
					numColumns={this.state.list ? 1 : 2}
					style={{ flexDirection: 'column', flex: 1 }}
					data={this.state.entries}
					extraData={this.state.total}
					renderItem={this.state.list ? this.RenderItemInList : this.RenderItemInMosaic}
					keyExtractor={(item: ItemRepresentation) => item.Prid.Id.toString() + '-' + item.Prid.Catalog.toString()}
					onEndReached={this.loadItems}
					onEndReachedThreshold={0.01}
					ListFooterComponent={Elem}
					ListEmptyComponent={this.noElem}
				/>
				<FloatingButton
					status={this.state.buttonV}
				/>
			</View>
		);

	}

	get noElem(){
		return (
			<View
				style={{
					height: 55,
					backgroundColor: CommonStyleSheet.fnac.color,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text
					style={{
						fontSize: 17,
						color: 'white',
						textAlign: 'center'
					}}
				>
					Aucuns articles dans la catégorie : {this.props.displayName}
				</Text>
			</View>
		);
	}
}


class FloatingButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		//if (this.props.status === 0) {
			return null;
		//}
		buttonHeight = 40;
		buttonWidth = 40; //this.props.status === 1 ? 120 : 40;
		Elem = null; //this.props.status === 1 ? <Text>Remonter</Text> : null;
		return (
			<View
				style={{
					position: 'absolute',
					bottom: 10,
					right: 10,
					height: buttonHeight * 2.5,
					width: buttonWidth,
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<View
					style={{
						//position: 'absolute',
						//bottom: 10,
						//right: 10,
						height: buttonHeight,
						width: buttonWidth
					}}
				>
					<TouchableOpacity onLongPress={() => this.props.method3()} onPress={() => this.props.method2()}>
						<View
							style={{
								...Platform.select({
									ios: {
										shadowColor: '#000',
										shadowOffset: {width: 0, height: 2},
										shadowOpacity: 0.8,
										shadowRadius: 2
									},
									android: {
										elevation: 5
									}
								}),
								paddingLeft: 14,
								paddingRight: 14,
								height: buttonHeight,
								width: buttonWidth,
								borderRadius: 20,
								backgroundColor: CommonStyleSheet.fnac.color,
								flexDirection: 'row',
								justifyContent: 'center',
								//this.props.status === 1 ? 'space-between' : 'center',
								alignItems: 'center'
							}}
						>
							<Icon name="arrow-up" size={15} color="black" type="font-awesome"/>
							{Elem}
						</View>
					</TouchableOpacity>
				</View>
				<View
					style={{
						//position: 'absolute',
						//bottom: 10,
						//right: 10,
						height: buttonHeight,
						width: buttonWidth
					}}
				>
					<TouchableOpacity onLongPress={() => this.props.method(false, -1)} onPress={() => this.props.method(false, null)}>
						<View
							style={{
								...Platform.select({
									ios: {
										shadowColor: '#000',
										shadowOffset: {width: 0, height: 2},
										shadowOpacity: 0.8,
										shadowRadius: 2
									},
									android: {
										elevation: 5
									}
								}),
								paddingLeft: 14,
								paddingRight: 14,
								height: buttonHeight,
								width: buttonWidth,
								borderRadius: 20,
								backgroundColor: CommonStyleSheet.fnac.color,
								flexDirection: 'row',
								justifyContent: 'center',
								//this.props.status === 1 ? 'space-between' : 'center',
								alignItems: 'center'
							}}
						>
							<Icon name="arrow-down" size={15} color="black" type="font-awesome"/>
							{Elem}
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
