import React from 'react';
import {View, FlatList, TouchableOpacity, LayoutAnimation} from 'react-native';
import {Icon} from 'react-native-elements';

import Text from './MyText';
import {toggleState, setAndroidAnimation} from '../helpers/Tools';
import {MyActivityIndicator} from './MyActivityIndicator';
import CommonStyleSheet from '../styles/CommonStyles';
import StyleSheet from '../styles/RenderUnderCatsStyle';
import { NavigationScreenProp } from 'react-navigation';
import {Node, LoadPageOfItemRepresentation} from '../helpers/interfaces'
import { getChildNodes, getItemsFromNode } from '../helpers/NodeService'


interface Props {
	depth:number,
	navigation: NavigationScreenProp<any,any>,
	item: Node,
	}

interface State {
	isLoading: boolean,
	activated: boolean,
	entries: Node[]
}

export default class RenderUnderCats extends React.Component<Props,State> {
	toggleState
	constructor(props) {
		super(props);
		this.state = {isLoading: false, activated: false, entries: []};
		this.loadChilds = this.loadChilds.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.handlePress = this.handlePress.bind(this);
		setAndroidAnimation();
	}


	async loadChilds(item) {
		await this.setState({isLoading:true});
		let data = await getChildNodes(item.Id);


		//removing elements that have no childs or items
		const filteredData = data.filter((elem:Node) =>
			elem.HasChildNodes || elem.HasItems
		)

		LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
		await this.setState({
			entries: filteredData,
			isLoading: false
		});
		
	}


	async handlePress() {
		let item:Node = this.props.item;
		if (!item.HasItems) {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
			await this.setState(previousState => (
				{activated: !previousState.activated}
			));
			if(this.state.activated)
				this.loadChilds(item);
		} else {
			this.props.navigation.navigate('ItemsList', {
				node:this.props.item
			});
		}
	}

	renderItem({ item }) {
		return (
			<RenderUnderCats
				depth={this.props.depth + 1}
				navigation={this.props.navigation}
				item={item}
			/>
		);
	}

	render() {
		var Elem = null;
		if (this.state.activated == true) {
			if (this.state.isLoading) {
				Elem = <MyActivityIndicator />;
			} else {
				Elem = (
					<View>
						<FlatList
							data={this.state.entries}
							renderItem={this.renderItem}
							keyExtractor={item => item.Id.toString()}
						/>
					</View>
				);
			}
		}
		const item = this.props.item;
		var color = this.state.activated ? CommonStyleSheet.fnac.color : 'white';
		var myIcon = !item.HasItems
			? this.state.activated
				? 'minus'
				: 'plus'
			: 'angle-right';

		if (!item.HasChildNodes && !item.HasItems) {
			return null;
		}
		return (
			<View>
				<TouchableOpacity onPress={() => this.handlePress()}>
					<View
						style={[
							StyleSheet.mainView,
							{
								paddingLeft: 20 + 10 * (this.props.depth - 1),
								height: 45 - 3 * (this.props.depth - 1),
								backgroundColor: color
							}
						]}
					>
						<View style={StyleSheet.textView}>
							<Text style={StyleSheet.text}>{item.NodeName}</Text>
						</View>
						<View style={StyleSheet.iconView}>
							<Icon
								name={myIcon}
								size={!item.HasItems ? 15 : 20}
								color={'grey'}
								type="font-awesome"
							/>
						</View>
					</View>
				</TouchableOpacity>
				{Elem}
			</View>
		);
	}
}
