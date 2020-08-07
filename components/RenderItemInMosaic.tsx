import React from 'react';
import { Image, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';


import Text from './MyText';
import StyleSheet from '../styles/RenderItemInListStyles';
import {  ItemRepresentation_large } from '../helpers/interfaces';
import {  isLowerCase, isUpperCase } from '../helpers/Tools';
import { fontMaker } from '../components/fontMaker';
import ItemImg from './ItemImg';
import ReductionBadge from './ReductionBadge';
import Review from './Review';
import PriceOffer from './PriceOffer';
import FlashSaleProgression from './FlashSaleProgression'


export const Width = Dimensions.get('window').width;
const size = (Width - 8) / 2;


interface Props {
	item: ItemRepresentation_large,
	navigation: NavigationScreenProp<any, any>,
}


export default class RenderItemInMosaic extends React.PureComponent<Props, any> {

	//TODO: broken, gives us smth like "téléphone mobile - [Object Object]"
	generateSubtitle(item){
		let subTitle = '';
		let properties = null;
		if (item.IsTechnical) {
			if (!item.Format || !item.Brand) {
				subTitle = item.Format ? item.Format : item.Brand.BrandName;
			} else {
				subTitle = item.Format + ' - ' + item.Brand.BrandName;
			}
		} else {
			if (item.ItemType == 'Livre'){
				properties = item.ItemProperties.ItemCaracteristics.find(x => x.GroupName == 'Fiche détaillée').Properties;
				let illustrator = properties.find(x => x.PropertyName == 'Illustration') ? properties.find(x => x.PropertyName == 'Illustration').PropertyText : '';
				illustrator = illustrator[0] && illustrator[0].search('llustration') >= 0 ? '' : illustrator;//in order to remove useless illustration property like : 'pas d'illustration', 'illustration en couleur'

				let author = properties.find(x => x.PropertyName == 'Auteur') ? properties.find(x => x.PropertyName == 'Auteur').PropertyText : '';
				author = author.length > 0 && illustrator.length > 0 ? ' - ' + author : author;

				let traductor = properties.find(x => x.PropertyName == 'Traduction') ? properties.find(x => x.PropertyName == 'Traduction').PropertyText : '';
				traductor = (author.length > 0 || illustrator.length > 0) && traductor.length > 0 ? ' - ' + traductor : traductor;

				subTitle = illustrator + author + traductor;
			}
			else if (item.ItemType == 'Jeu'){
				let platform = item.ItemProperties.MainCaracteristics.Properties.find(x => x.PropertyName == 'Plateforme').PropertyText;
				subTitle = item.ItemProperties.Summary.length > 1 ? item.ItemType + ' - ' + platform[0] + ' - ' + item.ItemProperties.Summary : item.ItemType + ' - ' + platform[0];
			}
			else if (item.ItemType == 'Objet dérivé'){
				subTitle = item.ItemProperties.Summary.length > 1 ? item.ItemType + ' - ' + item.Format + ' - ' + item.ItemProperties.Summary : item.ItemType + ' - ' + item.Format;
			}
			else if (item.ItemType == 'Vidéo'){
				properties = item.ItemProperties.MainCaracteristics.Properties;
				let actors = properties[1].PropertyText[0];
				let actorsFinal = '';
				let i = 0;
				let a = 0;
				while(actors[i]){
					if(isUpperCase(actors[i]) && i > 0 && isLowerCase(actors[i - 1])) {
						actorsFinal = actorsFinal.length ? actorsFinal + "," + actors.substr(a, i - a) : actors.substr(a, i - a);
						a = i;
					}
					i++;
				}
				actorsFinal = actorsFinal.length ? actorsFinal + "," + actors.substr(a, i - a) : actors.substr(a, i - a);
				actorsFinal = actorsFinal.split(',');
				subTitle = properties.find(x => x.PropertyName = 'réalisateur (s)').PropertyText[0];
				actorsFinal.forEach(item =>{subTitle = subTitle + ' - ' + item});
			}
			else if (item.ItemType == 'Audio Variété'){
				properties = item.ItemProperties.ItemCaracteristics.find(x => x.GroupName == 'Fiche détaillée').Properties;
				interprete = properties.find(x => x.PropertyName == 'Interprète').PropertyText[0];
				let i = 0;
				let a = 0;
				while(interprete[i]){
					if(isUpperCase(interprete[i]) && i > 0 && isLowerCase(interprete[i - 1])) {
						subTitle = subTitle.length ? subTitle + "," + interprete.substr(a, i - a) : interprete.substr(a, i - a);
						a = i;
					}
					i++;
				}
				subTitle = subTitle.length ? subTitle + "," + interprete.substr(a, i - a) : interprete.substr(a, i - a);
				interprete = subTitle.split(',');
				subTitle = '';
				interprete.forEach(item =>{subTitle = subTitle + item + ' - '});
				subTitle = item.ItemProperties.Summary.length > 1 ? subTitle + item.ItemProperties.Summary + ' - ' : subTitle;
				subTitle = subTitle + item.Format;
			}
			else if (item.ItemType == 'Audio Classique'){
				properties = item.ItemProperties.ItemCaracteristics.find(x => x.GroupName == 'Fiche détaillée').Properties;
				Compositeur = properties.find(x => x.PropertyName == 'Compositeur') ? properties.find(x => x.PropertyName == 'Compositeur').PropertyText[0] : null;
				if (Compositeur){
					let i = 0;
					let a = 0;
					while(Compositeur[i]){
						if(isUpperCase(Compositeur[i]) && i > 0 && isLowerCase(Compositeur[i - 1])) {
							subTitle = subTitle.length ? subTitle + ", " + Compositeur.substr(a, i - a) + ' (Compositeur)': Compositeur.substr(a, i - a) + ' (Compositeur)';
							a = i;
						}
						i++;
					}
					subTitle = subTitle.length ? subTitle + ", " + Compositeur.substr(a, i - a) + ' (Compositeur), ': Compositeur.substr(a, i - a) + ' (Compositeur), ';
					subTitle = properties.find(x => x.PropertyName == 'Interprète') ?
					subTitle + properties.find(x => x.PropertyName == 'Interprète').PropertyText[0] + ' (Interprète)' + ', ' + item.Format :
					subTitle + item.Format;
				}
			}
			else{//shouldnt be the case since all itemType should have their subTitle
				subTitle = 'not technical';
				Alert.alert('not technical', item.DisplayName);
			}
		}
		return subTitle;
	}

	render() {
		let item = this.props.item;
		let subtitle = this.generateSubtitle(item);
		title = item.IsTechnical ? item.DisplayName : item.DisplayName + ' - ' + item.Format;
		return (
			<TouchableOpacity onPress={() => this.props.navigation.navigate('ItemScreen', { item: item })}>
			{/*<TouchableOpacity onPress={() => console.log(item)}>*/}
				<View
					style={{
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
						paddingBottom: 15,
						width: size,
						backgroundColor: 'white',
						margin: 2,
						height: 280
					}}
				>
					<View style={{ height:25, width: size, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
						<ReductionBadge
							articleOpcInfo={item.ArticleOpcInfo}
							price={item.InfosPrice}
						/>
					</View>
					<View style={[StyleSheet.imageView, {height:size-20}]}>
						<ItemImg medias={item.Medias} />
					</View>
					<View style={{ flex:1, width: size, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
						<View style={{ margin: 15, marginTop: 5, marginBottom: 8, height: 30 }}>
							<Text numberOfLines={2} ellipsizeMode="tail" style={StyleSheet.label,{...fontMaker({weight: 'Bold'}), color:'black', fontSize: 15}}>
								{title}
							</Text>
						</View>
						<View style={{ margin: 15, marginTop: 0, marginBottom: 5, height: 15 }}>
							<Text textAlign="left" numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 13 }}>
								{subtitle}
							</Text>
						</View>
						<Review userReviewSummary={item.UserReviewSummary} />
						{item.InfosPrice != null &&
						<PriceOffer
							articleOpcInfo={item.ArticleOpcInfo}
							infosPrice={item.InfosPrice}
							quantity={1}
						/>}
						{item.InfosPrice != null &&
						<FlashSaleProgression infosPrice={item.InfosPrice} size={size - 30} />}
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
