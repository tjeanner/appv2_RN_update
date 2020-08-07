import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

import Text from './MyText';
import StyleSheet from '../styles/MainCategorysHandlerStyle';
import {MainCategory} from '../helpers/interfaces'

const Categories = require('../fnac_categories_updated.json').Categories;

const FullListData: MainCategory[] = Categories;

/** 
 * This class reads a file that is given to us by FNAC : fnac_categories_updated.json
 * File should be updated every 3 months or so
 * Not ideal.
 */
function RenderMainCategorys(props) {
	const item: MainCategory = props.item;
	if (!item.Activated) {
		return null;
	}
	return (
		<TouchableOpacity onPress={() => props.method(item)}>
			<View style={StyleSheet.row}>
				<View style={StyleSheet.imageView}>
					<Icon name={item.IconName} size={20} color="grey" type="font-awesome"/>
				</View>
				<View style={StyleSheet.textView}>
					<Text style={StyleSheet.text}>{item.Name}</Text>
				</View>
				<View style={StyleSheet.arrowImageView}>
					<Icon name="angle-right" size={20} color="grey" type="font-awesome"/>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export {FullListData, RenderMainCategorys};
