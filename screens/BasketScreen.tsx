import React from 'react';
import {
	View,
    Text,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux'
import {getBasketContent, createBasket, AddItemsUntilQuantityMatched} from '../helpers/BasketService'
import {ShoppingCart, ShoppingCartItem, ItemRepresentation_large} from '../helpers/interfaces';
import { Dispatch, Action } from 'redux';
import { NavigationEvents, NavigationScreenProp } from 'react-navigation';

import Button from '../components/MyButton';
import RenderCartItem from '../components/RenderCartItem';
import StyleSheet from '../styles/BasketScreeenStyles';
import CommonStyles from '../styles/CommonStyles';

interface State {
  isLoading:boolean;
}

export interface Props {
  //These props come from redux
  cart: ShoppingCart,
  dispatch: Dispatch,
  isLoading:boolean,
  navigation: NavigationScreenProp<any,any>
}

class BasketScreen extends React.Component<Props, State> {
    _totalStandard;
    _total;
    constructor(props){
      super(props);
      this.state = {
        isLoading:true,
      }
      this.handleValidateButton = this.handleValidateButton.bind(this);
      this.updateTotals = this.updateTotals.bind(this);
      this.cartWasChangeded = this.cartWasChangeded.bind(this)
    }


    async componentDidMount() {
      let cart = await createBasket();
      const action = {type:'UPDATE_CART', cart: cart};
      this.props.dispatch(action);
      this.setState({
        isLoading:false,
      });
    }

    //this got really complicated really fast thanks to prices management from FNAC
  updateTotals() {
    if (this.props.cart.Items == null) {
      this._total = 0;
      this._totalStandard = 0;
    } else {
      let reducedPrices = this.props.cart.Items.map(item => {
        if (item.Item.InfosPrice != null)
          return item.Item.InfosPrice.MainOffer.UserPrice * item.Quantity;
        else
          return item.Item.ArticleOpcInfo.UserPrice * item.Quantity;
      });
      this._total = reducedPrices.reduce((acc, curr) => {
        return acc + curr;
      });
      let standardPrices = this.props.cart.Items.map(item => {
        if (item.Item.InfosPrice != null)
          return item.Item.InfosPrice.MainOffer.Price * item.Quantity;
        else
          return item.Item.ArticleOpcInfo.OldPrice * item.Quantity;
      });
      this._totalStandard = standardPrices.reduce((acc, curr) => {
        return acc + curr;
      });
    }
  } 

    handleValidateButton(){
      this.props.navigation.navigate('Web', {uri:"https://secure.fr.fnac.ch/orderpipe?pipe=pop&reset=1" })
    }

    async cartWasChangeded(){
      let cart = await getBasketContent();
      const action = {type:'UPDATE_CART', cart: cart};
      this.props.dispatch(action);
    }

    renderCartItem({item}){
      return(
        <RenderCartItem cartItem={item} />
      )
    }

    _keyExtractor = cartItem => { return cartItem.Item.Prid.Id.toString() }

  render() {
    if (this.state.isLoading)
      return <ActivityIndicator />;
    return (

      <View style={{ flex:1 }}>
        	<NavigationEvents
						style={{ flex: 0 }}
						onDidFocus={this.cartWasChangeded}
					/>
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
          <FlatList
            data={this.props.cart.Items}
            renderItem={this.renderCartItem}
            keyExtractor={this._keyExtractor}
            ListEmptyComponent={this.emptyCartElem}
          />
        </View>
        {this.cartRecap}

      </View>
    );
  }
  
  
  get cartRecap() {
    if (this.props.cart != null) {
      this.updateTotals();
      return (
        <View style={StyleSheet.cartRecapContainer}>
          <View style={StyleSheet.cartRecapPricesContainer} >
            <Text>TOTAL: CHF {this._total.toFixed(2)}</Text> 
            {this.ReducText}
          </View>
          <Button title="Valider" onPress={this.handleValidateButton} color={CommonStyles.fnac.color} />
        </View>
      );
    }
  }

  get ReducText(){
    if (this.props.cart.Items != null ){
      let reduction = this._totalStandard - this._total;
      return  <Text style={{ color: CommonStyles.fnac_green.color }}>Vous économisez CHF {reduction.toFixed(2)}</Text>
    }
    else
      return null;
  }

    get emptyCartElem(){
      return (
        <View style={StyleSheet.cartEmpty}>
          <Text style={{ fontSize: 30 }}>
            VOTRE PANIER EST TRISTEMENT VIDE
          </Text>
          <Text style={{ fontWeight:'bold', fontSize: 30 }}>
            :-(
          </Text>
        </View>
      );
    }
  }


  
const mapStateToProps = (state) => {
  return {
    cart:state.cart,
    isLoading:state.isLoading
  }
}

export default connect(mapStateToProps)(BasketScreen)
