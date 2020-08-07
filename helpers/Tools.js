import {Dimensions, Platform, UIManager} from 'react-native';

const weekDays = [
	'dimanche',
	'lundi',
	'mardi',
	'mercredi',
	'jeudi',
	'vendredi',
	'samedi'
];

const months = [
	'janvier',
	'février',
	'mars',
	'avril',
	'mai',
	'juin',
	'juillet',
	'août',
	'septembre',
	'octobre',
	'novembre',
	'décembre'
];

function isIphoneX() {
	const dim = Dimensions.get('window');
	return (
		Platform.OS === 'ios' &&
		(isIphoneXSize(dim) || isIphoneXsSize(dim))
	);
}

function isIphoneXSize(dim) {
	return dim.height == 812 || dim.width == 812;
}

function isIphoneXsSize(dim) {
	return dim.height == 896 || dim.width == 896;
}

function toggleState(key) {
	this.setState(prevState => ({[key]: !prevState[key]}));
}

function setAndroidAnimation() {
	if (Platform.OS === 'android') {
		UIManager.setLayoutAnimationEnabledExperimental &&
			UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

function isLowerCase(str)
{
    return str == str.toLowerCase() && str != str.toUpperCase();
}

function isUpperCase(str)
{
    return str != str.toLowerCase() && str == str.toUpperCase();
}

export {
	months,
	weekDays,
	isIphoneX,
	isIphoneXSize,
	isIphoneXsSize,
	toggleState,
	setAndroidAnimation,
	isLowerCase,
	isUpperCase
};
