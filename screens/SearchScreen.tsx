import React from 'react';
import {View, ScrollView, LayoutAnimation, FlatList} from 'react-native';

import Text from '../components/MyText';
import FakeTextInput from '../components/FakeTextInput';
import {RenderMainCategorys, FullListData} from '../components/MainCategorysHandler';
import {setAndroidAnimation} from '../helpers/Tools';
import StyleSheet from '../styles/SearchScreenStyles';
import { MainCategory } from '../helpers/interfaces';

export default class SearchScreen extends React.PureComponent<any,any> {
	constructor(props) {
		super(props);
		this.state = {
			float: false
		};
		this.goResearchScreen = this.goResearchScreen.bind(this);
		this.goUnderCategoriesScreen = this.goUnderCategoriesScreen.bind(this);
		setAndroidAnimation();
	}

	goResearchScreen() {
		this.props.navigation.navigate('Research');
	}

	goUnderCategoriesScreen(item: MainCategory) {
		this.props.navigation.navigate('Details', {category: item});
	}


	render() {
		return (
			<View style={{flex:1}}>
				<ScrollView
					onScroll={e => {
						if (e.nativeEvent.contentOffset.y >= 1) {
							LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
							this.setState({float:true});
						}
						else if (e.nativeEvent.contentOffset.y < 1){
							LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
							this.setState({float:false});
						}
					}}
				>
					<View style={StyleSheet.fnacContainer}>
						<View style={StyleSheet.uneEnvieParticuliereView}>
							<Text style={StyleSheet.uneEnvieParticuliereText}>Une envie</Text>
							<Text style={StyleSheet.uneEnvieParticuliereText}>
								particulière ?
							</Text>
						</View>
						<View style={{ marginTop:15, opacity: this.state.isLoading3 ? 1 : 0}}>
							<FakeTextInput navigation={this.props.navigation} event={false}/>
						</View>
					</View>
					<FlatList
						style={StyleSheet.flatList}
						data={FullListData}
						key={1}
						renderItem={({item}) => (<RenderMainCategorys item={item} method={this.goUnderCategoriesScreen} />)}
						keyExtractor={item => item.Id}
					/>
				</ScrollView>
				<View style={{position:'absolute', top: 129, opacity: this.state.isLoading3 ? 0 : 1, right:45, zIndex:2}}>
					<FakeTextInput navigation={this.props.navigation} event={this.state.float} />
				</View>
			</View>
		);
	}
}
