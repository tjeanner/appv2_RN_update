import React from 'react';
import {
	View,
	ScrollView,
	FlatList,
	Image,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import HTML from 'react-native-render-html';

import Text from '../components/MyText';
import SellElems from '../components/SellElems';
import { Media, ItemRepresentation_large, Properties } from '../helpers/interfaces';
import { NavigationScreenProp } from 'react-navigation';
import StyleSheetCarousel from '../styles/CarouselRenderStyles';
import ItemLabel from '../components/ItemLabel'


interface Props {
	navigation: NavigationScreenProp<any,any>,
}

interface State {
	 activeSlide: number,
	 carouselImages: string[],
}

export default class ShowItemsScreen extends React.PureComponent<Props, State> {
	_carousel;
	item:ItemRepresentation_large;
	constructor(props) {
		super(props);
		this.item = this.props.navigation.getParam('item');
		this._carousel = null;
		//TODO: Here we always have only 2 images after filter, criterias must be bad
		let medias:Media[] = this.item.Medias.filter(media => {
			return media.Type==4;
		});
		let images:string[] = medias.map(media=>{
			return media.Url;
		});
		//We need to eliminate duplicates
		images = [...new Set(images)];
		//We also need to eliminate the first element, since it's a bad quality version of the second element
		images.splice(0, 1);

		this.state = {
			activeSlide: 0, 
			carouselImages: images,
		};
		this.showCaract = this.showCaract.bind(this);
		this.showEditeurNote = this.showEditeurNote.bind(this);
	}

	//{item, index} should always be {item, index}
	renderCarousel({item, index}) {
		return (<View style={StyleSheetCarousel.view}>
					<Image source={{ uri: item }} style={StyleSheetCarousel.image} />
				</View>)
	}


	showCaract() {
		this.props.navigation.push('Caract', {
			data: this.item.ItemProperties.ItemCaracteristics[0].Properties
		});
	}

	showEditeurNote() {
		this.props.navigation.push('EditeurNote', {text:this.item.InternalReviews.find(x => x.IntReviewType == 4).IntReviewText});
	}

	renderItemProperties(properties) {
		properties = properties as Properties;
		if (properties == null || properties.PropertyText== null) {
			return null;
		}
		return (
			<View
				style={{
					flex: 1,
					margin: 4,
					marginBottom: 0,
					padding: 15,
					backgroundColor: 'white'
				}}
			>
				<Text style={{color: 'grey'}}>{properties.PropertyName}</Text>
				<HTML html={properties.PropertyText[0]} imagesMaxWidth={Dimensions.get('window').width} />
			</View>
		);
	}

	render() {
		return (
			<ScrollView style={{ backgroundColor: 'white' }}>

				{this.topElem}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						height: 250,
						flex: 1
					}}
				>
					<Carousel
						ref={(c) => { this._carousel = c; }}
						data={this.state.carouselImages}
						renderItem={this.renderCarousel}
						sliderWidth={responsiveWidth(100)}
						itemWidth={responsiveWidth(60)}
						loop={false}
						enableMomentum={true}
						decelerationRate={0.9}
						loopClonesPerSide={10}
						maxToRenderPerBatch={10}
						onSnapToItem={index => this.setState({activeSlide: index})}
					/>
				</View>
				<View
					style={{
						height: 20,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					{this.pagination}
				</View>
				<View style={{margin: 50, marginTop: 0}}><ItemLabel item={this.item}/></View>
				<SellElems
					item={this.item}
					navigation={this.props.navigation}
				/>
				{this.additionalEditorialElem}
			</ScrollView>
		);
	}
	//TODO: rename with more accurate naming
	//topElem is the grey button that gets you to the editor's note or technical details
	get topElem() {
		if (
			!this.item.IsTechnical &&
			//Seller = 1, Summary = 2, Fnac = 3, Editor = 4
			//TODO: Gérer les différentes review pour le top element
			this.item.InternalReviews.find(x => x.IntReviewType == 4) == undefined
		) {
			return null;
		} else {
			return (
				<View
					style={{
						height: 35,
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'flex-end',
						alignItems: 'center',
						paddingRight: 25
					}}
				>
					<TouchableOpacity onPress={this.item.IsTechnical ? () => this.showCaract() : () => this.showEditeurNote()}>
						<View
							style={{
								width: responsiveWidth(60),
								height: 35,
								padding: 5,
								flexDirection: 'row',
								justifyContent: 'space-around',
								alignItems: 'center',
								backgroundColor: 'white',
								borderWidth: 1,
								borderColor: 'grey',
								borderRadius: 4
							}}
						>
							<Icon name="plus" size={20} color="grey" type="font-awesome" />
							<Text style={{ color: 'grey' }}>
								{this.item.IsTechnical ? 'Voir les caractéristiques' : "Lire le mot de l'éditeur"}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			);
		}
	}


	//this element is the little dots under carousel of images that helps to navigate images
	get pagination() {
		const data = this.state.carouselImages;
		const {activeSlide} = this.state;
		return (
			<Pagination
				dotsLength={data.length}
				activeDotIndex={activeSlide}
				dotStyle={{
					width: 12,
					height: 12,
					borderRadius: 6,
					marginHorizontal: 2
				}}
				inactiveDotStyle={{
					width: 12,
					height: 12,
					borderRadius: 6,
					marginHorizontal: 2
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.9}
				dotContainerStyle={{width: 10}}
				tappableDots={this._carousel != null}
				carouselRef={this._carousel}
			/>
		);
	}

	//TODO: better implement the showing of all ItemCharacteristics, not just the [0]th element
	get additionalEditorialElem() {
		let AdditionalEditorialElem = null;
		if (!this.item.IsTechnical) {
			AdditionalEditorialElem = (
				<View style={{ backgroundColor: '#eeeeee' }}>
					<Text style={{ margin: 20, color: 'black', fontSize: 20 }}>DÉTAILS</Text>
					<FlatList
						keyExtractor={item => item.PropertyName}
						data={this.item.ItemProperties.ItemCaracteristics[0].Properties}
						renderItem={this.renderItemProperties}
					/>
					{this.additionalEditorialElem2}
				</View>
			);
		}
		return AdditionalEditorialElem;
	}

	//this gets you to a screen showing some caracteristics about product
	get additionalEditorialElem2() {
		let AdditionalEditorialElem2 = null
		if (!this.item.IsTechnical) {
			AdditionalEditorialElem2 = (
				<TouchableOpacity onPress={() => this.showCaract()}>
					<View
						style={{
							margin: 4,
							paddingLeft: 20,
							paddingRight: 20,
							height: 40,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							backgroundColor: 'white'
						}}
					>
						<Text style={{ color: 'grey' }}>Voir tous les détails</Text>
						<Icon name="chevron-right" size={20} color="grey" type="font-awesome" />
					</View>
				</TouchableOpacity>
			);
		}
		return AdditionalEditorialElem2;
	}
}
