import React from 'react';
import {Image, View} from 'react-native';
import {Icon} from 'react-native-elements';

import {FullPageActivityIndicator} from './MyActivityIndicator'
import CommonStyleSheet from '../styles/CommonStyles';
import StyleSheet from '../styles/RenderItemInListStyles';
import { Media } from '../helpers/interfaces';

interface Props {
	medias: Media[],
}

export default class ItemImg extends React.PureComponent<Props, any> {
	image;
	constructor(props){
		super(props);
		this.image = typeof this.props.medias === 'undefined' || typeof this.props.medias[0] === 'undefined'
			? null
			: this.props.medias.findIndex(x => x.Id === 'Principal_340x340') === -1
				? this.props.medias[0].Url
				: this.props.medias[this.props.medias.findIndex(x => x.Id === 'Principal_340x340')].Url;
	}

	render() {
		size = this.props.size ? this.props.size : 340;

		if (this.image == null) {
			return (
				<View style={StyleSheet.noPhotoLogo}>
					<Icon name="unlink" size={50} color="grey" type="font-awesome" />
				</View>
			);
		}
		return <Image source={{ uri:this.image }} style={{flex:1, height:size, width:size, resizeMode: 'contain'}} />;
	}
}