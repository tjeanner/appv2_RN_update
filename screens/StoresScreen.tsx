import React from 'react';
import {
	View,
	ScrollView,
	FlatList,
	LayoutAnimation,
	Dimensions
} from 'react-native';
import { connect } from 'react-redux'


import Text from '../components/MyText';
import RenderStores from '../components/RenderStores';
import {FullPageActivityIndicator} from '../components/MyActivityIndicator';
import StyleSheet from '../styles/StoresScreenStyles';
import { getStoresList } from '../helpers/StoreService';
import { Store } from '../helpers/interfaces';
const Height_Layout = Dimensions.get('window').height;
const Width_Layout = Dimensions.get('window').width;


interface State {
	isLoading: boolean,
	stores: Store[];
}

class StoresScreen extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			stores: []
		};
		this.getStoresData = this.getStoresData.bind(this);
	}
	
	componentDidMount() {
		this.getStoresData();
	}

	async getStoresData() {
		let storeList = await getStoresList();
		const action = {type:'UPDATE_STORES', stores:storeList};
		this.props.dispatch(action);
		this.setState({
			isLoading:false,
			stores: storeList
		});
	}

	_renderItem = ({item}) => (<RenderStores item={item} navigation={this.props.navigation} />)
	_keyExtractor = item => item.StoreId.toString()

	render() {
		if(this.state.isLoading){
			return <FullPageActivityIndicator/>
		}
		return (
		<View style={{flex:1}}>
			<ScrollView style={StyleSheet.ScrollView}>
				<View style={[StyleSheet.fnacContainer, {marginTop: this.state.isLoading ? -168 : 0}]}>
					<Text style={StyleSheet.trouverMagasinText}>Trouver un</Text>
					<Text style={StyleSheet.trouverMagasinText}>magasin Fnac</Text>
				</View>
				<View style={[StyleSheet.tousLesMagasinsView, {marginTop: this.state.isLoading ? 168 : 0, marginLeft: this.state.isLoading ? -1 * Width_Layout : 0}]}>
					<Text style={StyleSheet.tousLesMagasinsText}>TOUS LES MAGASINS</Text>
				</View>
				<View style={{marginTop: this.state.isLoading ? Height_Layout - 168 - 53 : 0}}>
					<FlatList
						style={StyleSheet.flatlist}
						data={this.state.stores}
						renderItem={this._renderItem}
						keyExtractor={this._keyExtractor}
					/>
				</View>
			</ScrollView>
		</View>
		);
	}
}

  
const mapStateToProps = (state) => {
	return {
	  cart:state.cart,
	  isLoading:state.isLoading
	}
  }
  
export default connect(mapStateToProps)(StoresScreen)
  