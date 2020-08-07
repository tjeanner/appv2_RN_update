import React from 'react';
import { View, Text } from 'react-native';

import { InfosPrice, ArticleOpcInfo } from '../helpers/interfaces'
import StyleSheet from '../styles/RenderItemInListStyles';

interface Props {
    infosPrice: InfosPrice,
    articleOpcInfo: ArticleOpcInfo,
    quantity: number,
}

interface State {
    isLoading: boolean,
    exponantText: string,
    priceText: string,
}
//TODO: take quantity into account
export default class PriceOffer extends React.PureComponent<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            exponantText: null,
            priceText: null,
        };
        this.setupPriceLabels = this.setupPriceLabels.bind(this);
    }
    componentDidMount() {
        this.setupPriceLabels();
    }

    //Ugly but not broken
    setupPriceLabels() {
        const price = this.props.infosPrice;
        var priceExponantText = '';
        var priceText = '';

        var normalPrice = price.MainOffer.Price.toString();
        normalPrice =
            normalPrice.indexOf('.') === -1
                ? normalPrice + '.-'
                : normalPrice.length - (normalPrice.indexOf('.') + 1) === 1
                    ? normalPrice + '0'
                    : normalPrice;

        priceText = normalPrice[normalPrice.length - 1] === '-' ? normalPrice : normalPrice.split('.')[0] + '.';
        priceExponantText = normalPrice[normalPrice.length - 1] === '-' ? '' : normalPrice.split('.')[1];
        this.setState({
            isLoading: false,
            exponantText: priceExponantText,
            priceText: priceText,
        });
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }
        return (
            <View style={StyleSheet.priceView}>
                <View style={[StyleSheet.priceView]}>
                    <Text style={StyleSheet.price}>{this.state.priceText}</Text>
                    <Text style={StyleSheet.priceExponant}>{this.state.exponantText}</Text>
                </View>
            </View>
        );
    }
}