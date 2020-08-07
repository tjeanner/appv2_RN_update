import React from 'react';
import {Image, View, Dimensions, TouchableOpacity, Linking} from 'react-native';

class ResponsiveImg extends React.PureComponent<any,any> {


	render() {
		const {
			banner,
			padding = 4,
			color = '#e7e7e7',
			Width_Layout = 0
		} = this.props;
		const {height, width} = banner;
		let imageName = 'http://app.suisse.fnac.ch/images/' + banner.imageName;
		return (
			<View
				style={{
					padding: padding,
					backgroundColor: color,
					width: Width_Layout,
					height:
						((Width_Layout - 2 * padding) / width) * height +
						2 * padding
				}}
			>
				<Image
					source={{
						uri: imageName
					}}
					style={{
						height: ((Width_Layout - 2 * padding) / width) * height,
						width: Width_Layout - 2 * padding
					}}
				/>
			</View>
		);
	}
}

export default class FnacBanner extends React.PureComponent<any,any> {
	constructor(props) {
		super(props);
		this.goWeb = this.goWeb.bind(this);
	}
	
	goWeb(link) {
		Linking.canOpenURL(link).then(supported => {
			if (supported) {
				Linking.openURL(link);
			}
		});
	}

	render() {
		const {banner} = this.props;
		if (typeof banner === 'undefined' || !banner) {
			return null;
		}
		const {onClickLink = null} = banner;
		if (onClickLink) {
			return (
				<TouchableOpacity onPress={() => this.goWeb(onClickLink)}>
					<ResponsiveImg {...this.props} />
				</TouchableOpacity>
			);
		}
		return <ResponsiveImg {...this.props} />;
	}
}
