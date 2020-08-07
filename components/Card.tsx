import React from 'react';
import {
	View,
	ImageBackground,
    Dimensions,
    Image,
} from 'react-native';

import StyleSheet from '../styles/CardScreenStyles';

import Text from '../components/MyText';
import { Customer } from '../helpers/interfaces';
import CommonStyles from '../styles/CommonStyles';

var card = require('../assets/carte-fnac.jpeg');

const detailWidth = Dimensions.get('window').width;
const detailHeight = Dimensions.get('window').height;


interface Props {
    customer:Customer
}

export default class Card extends React.Component<Props, any> {
	constructor(props) {
        super(props);
    }
    
    render() {
        const imageInfo = Image.resolveAssetSource(card);

		const imgWidth = imageInfo.width;
		const imgHeight = imageInfo.height;
		const height = (detailWidth / imgWidth) * imgHeight;
        return (
            <View style={StyleSheet.cardContainer}>
                <ImageBackground
                    source={card}
                    style={StyleSheet.cardStyle}
                    resizeMode='contain'
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: '62%',
                            left: '10%',
                        }}
                    >
                        <Text style={StyleSheet.jsonDataCardAdherent}>
                            ADHÉRENT
								{this.props.customer.chCivility === 'MADAME'
                                ? 'E'
                                : ''}
                        </Text>
                        <Text style={StyleSheet.jsonDataCardName}>
                            {(this.props.customer.chCivility === 'MADAME'
                                ? 'MME'
                                : 'M.') +
                                ' ' +
                                this.props.customer.firstName.toUpperCase() +
                                ' ' +
                                this.props.customer.surname.toUpperCase()}
                        </Text>
                        <Text style={StyleSheet.jsonDataCardNum}>
                            {this.props.customer.card}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
