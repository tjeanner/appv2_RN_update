import { Reducer } from 'redux';
import { statement } from '@babel/template';

const initialState = { cart:{}, stores:[]};
 
const updateState: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CART':
            {let newState = {
                ...state,
                cart: action.cart
            }
            return newState;}
        case 'UPDATE_STORES':
            {let newState = {
                ...state,
                stores:action.stores
            }
            return newState}
        default:
            return state;
    }
}

export default updateState