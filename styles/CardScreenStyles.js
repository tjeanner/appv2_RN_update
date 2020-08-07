import {Image, StyleSheet, Dimensions} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {fontMaker} from '../components/fontMaker';
import CommonStyleSheet from './CommonStyles';


var card = require('../assets/carte-fnac.jpeg');
const imageInfo = Image.resolveAssetSource(card);

const imgWidth = imageInfo.width;
const imgHeight = imageInfo.height;

export default StyleSheet.create({
	ScrollView: {
		backgroundColor: '#e7e7e7'
	},
	jsonDataCardNum: {
		fontSize: responsiveFontSize(2.35),
		...fontMaker({weight: 'SemiBold'}),
		color: 'white'
	},
	jsonDataCardAdherent: {
		fontSize: responsiveFontSize(2.144),
		...fontMaker({weight: 'SemiBold'}),
		color: 'white'
	},
	jsonDataCardName: {
		fontSize: responsiveFontSize(1.737),
		...fontMaker({weight: 'SemiBold'}),
		color: 'white'
	},
	box: {
		backgroundColor: 'white',
		marginTop: 0,
		marginBottom: 2,
		marginRight: 4,
		marginLeft: 4,
		padding: 8
	},
	jsonElement: {
		color: CommonStyleSheet.fnac.color,
		...fontMaker({weight: 'Bold'})
	},
	titleBox: {
		fontSize: 16,
		...fontMaker({weight: 'Bold'}),
		color: 'black'
	},
	account: {
		fontSize: 17,
		...fontMaker({weight: 'Bold'}),
		color: '#959595',
		marginLeft: 20,
		marginBottom: 12,
		marginTop: 30
	},
	cardContainer: {
		height:(imgHeight/imgWidth) * imgHeight,
		width:Dimensions.get('window').width,
	},
	cardStyle:{
		flex:1,
		height:undefined,
		width:undefined,
	},
	turnCardText: {
		marginLeft: 20,
		marginRight: 20,
		textAlign: 'center'
	},
	DonneesMajText: {
		marginTop: 4,
		marginLeft: 15,
		marginBottom: 20,
		fontSize: 12
	},
	DonneesMajView: {
		height: 110
	},
	buttonView: {
		width: 240,
		alignSelf: 'center'
	}
});
