import AsyncStorage from '@react-native-community/async-storage';
import { ShoppingCart, CatalogItemReference, ItemRepresentation_large } from '../helpers/interfaces';
import { Action } from 'redux';

//API path :api/commerce/rest/v2/shoppingcarts/{cartType}/{cartId}/{userId}
export const getBasketContent = async (basketId:string = null) => {
    try {
        if(basketId == null)
            basketId = await getBasketIdFromLocalStorage();

        const url =
            'https://www.fr.fnac.ch/api/commerce/rest/V2/shoppingcarts/standardbasket/'
             + basketId
        console.log(url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Authorization":"897c210702214f0698f486811",
                'Content-type':"application/json"
            },
            credentials: "include"
        });
        if (response.status == 201 || response.status == 200) {
            let data = await response.json() as ShoppingCart;

            return data;
        }
        else
            throw new Error("[BasketService: getBasketContent]HTTP ERROR")

    } catch (e) {
        console.log(e)
    }
}

const getBasketIdFromLocalStorage = async (): Promise<string> => {
    const value = await AsyncStorage.getItem('basketurl');
    if (value) { //if not null
        return value;
    }
    else{
        return createBasket().then(cart=>{
            return cart.Id;
        });
    }
}


//Api path in contrat api is false
//'https://www.fnac.ch/api/commerce/rest/v2/shoppingcarts/standardbasket/{basketId}/addunit/{item.Prid.Id}
export const addOneItemToBasket = async (itemPrid: number): Promise<any> => {
    let basketId = await getBasketIdFromLocalStorage();
    try {
        const url =
            'https://www.fr.fnac.ch/api/commerce/rest/v2/shoppingcarts/standardbasket'
            + '/' + basketId
            + '/addunit'
            + '/' + itemPrid
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: '897c210702214f0698f486811'
            },
            credentials: "include"
        });
        if (response.status == 201 || response.status == 200) {
            let size = await response.json();

            return size.Size;
        } else {
            throw new Error("[BasketService: addOneItemToBasket]HTTP ERROR")
        }
    } catch (e) {
        console.error(e);
    }
}

//'https://www.fnac.ch/api/commerce/rest/v2/shoppingcarts/standardbasket/{basketId}/subunit/{item.Prid.Id}
export const removeOneItemFromBasket = async (itemPrid: number) => {
    try {
        const basketId = await getBasketIdFromLocalStorage();
        const url =
            'https://www.fr.fnac.ch/api/commerce/rest/V2/shoppingcarts/standardbasket'
            + '/' + basketId
            + '/subunit'
            + '/' + itemPrid
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': '897c210702214f0698f486811',
                'Content-type':"application/json"
            },
            credentials: "include"
        });
        if (response.status == 201 || response.status == 200) {
            let size = await response.json();

            return size.Size;
        } else {
            throw new Error("[BasketService: removeOneItemFromBasket]HTTP ERROR")
        }

    } catch (e) {
        return false;
    }
}

//Returned Size object is size of entire basket, that's dumb
export const AddItemsUntilQuantityMatched = async (itemPrid: number, quantityToMatch, initialQuantity) => {
    let currentQuantity = initialQuantity;
    let returnedQuantity;
    while (quantityToMatch != currentQuantity) {
        if (quantityToMatch < currentQuantity){
            returnedQuantity = await removeOneItemFromBasket(itemPrid)
            console.log("Removing one ", itemPrid)
            console.log("returned size : ", returnedQuantity)
        }
        else{
            returnedQuantity = await addOneItemToBasket(itemPrid)
            console.log("Adding one ", itemPrid)
            console.log("returned size : ", returnedQuantity)
        }
        if(currentQuantity == returnedQuantity){
            console.log("quantity not changing");
            return;
        }
        currentQuantity = returnedQuantity;
    }
}

export const createBasket = async () => {
    const url =
        'https://www.fr.fnac.ch/api/commerce/rest/v2/shoppingcarts/standardbasket';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'BASIC 897c210702214f0698f486811'
            },
            credentials: "include"
        });
        if (response.status == 201 || response.status == 200) {
            let location: string = response.headers.get('location');
            let id: string = location.split('/').slice(-1)[0];
            let cart = await getBasketContent(id);
            await AsyncStorage.setItem('basketurl', cart.Id);

            return cart;
        }
        else {
            throw new Error("[BasketService: createBasket]HTTP ERROR")
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}


