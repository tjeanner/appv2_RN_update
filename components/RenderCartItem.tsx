import React from 'react';
import {
  View, TouchableOpacity,

} from 'react-native';
import { connect } from 'react-redux'
import NumericInput from 'react-native-numeric-input'
import { getBasketContent, AddItemsUntilQuantityMatched, removeOneItemFromBasket, addOneItemToBasket } from '../helpers/BasketService'
import { ShoppingCart, ShoppingCartItem, ItemRepresentation_large } from '../helpers/interfaces';
import { Dispatch, Action } from 'redux';
import ItemImg from '../components/ItemImg';
import ItemLabel from '../components/ItemLabel'
import PriceOffer from '../components/PriceOffer';
import StyleSheet from '../styles/BasketScreeenStyles'
import { Icon } from 'react-native-elements';


export interface Props {
  //These props come from redux
  cart: ShoppingCart,
  dispatch: Dispatch,
  cartItem: ShoppingCartItem,
}

class RenderCartItem extends React.Component<Props, any> {
  _quantity;
  constructor(props) {
    super(props);
    this._quantity = this.props.cartItem.Quantity;
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    console.log(this.props.cartItem.Item.Prid.Id);
  }


  async handleQuantityChange(value: number) {
    if (value < 0)
      return;
    
    while(value != this._quantity)
    {
      console.log("Value : " + value + " _quantity: " + this._quantity)
      if(value < this._quantity){
        console.log("Removing one ", this.props.cartItem.Item.Prid.Id);
        await removeOneItemFromBasket(this.props.cartItem.Item.Prid.Id);
        this._quantity--;
      }
      else{
        console.log("Adding one ", this.props.cartItem.Item.Prid.Id);
        await addOneItemToBasket(this.props.cartItem.Item.Prid.Id);
        this._quantity++;
      }
    }

    let cart = await getBasketContent();
    const action = { type: 'UPDATE_CART', cart: cart };
    this.props.dispatch(action);
  }


  render() {
    return (
      <View style={StyleSheet.cartItemContainer}>
        <View style={StyleSheet.itemImgContainer}>
          <ItemImg medias={this.props.cartItem.Item.Medias} />
        </View>
        <ItemLabel item={this.props.cartItem.Item as ItemRepresentation_large} />
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-evenly" }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 20 }}>
            <TouchableOpacity onPress={() => this.handleQuantityChange(0)}>
              <Icon name="times" size={15} color="grey" type="font-awesome" />
            </TouchableOpacity>
          </View>

          <PriceOffer
            infosPrice={this.props.cartItem.Item.InfosPrice}
            articleOpcInfo={this.props.cartItem.Item.ArticleOpcInfo}
            quantity={this.props.cartItem.Quantity}
          />
          <NumericInput
            onChange={value => this.handleQuantityChange(value)}
            minValue={1}
            maxValue={999} //Same as FNAC.COM
            initValue={this.props.cartItem.Quantity}
            editable={false}
          />
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

export default connect(mapStateToProps)(RenderCartItem)
