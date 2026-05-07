// import { api } from "../../config/apiConfig";
// import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESSS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESSS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESSS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESSS } from "./ActionType"
// import { toastNotify } from '../shared/toast';
// import { API_BASE_URL } from "../../config/apiConfig";
// import {ADD_ITEM_TO_CART_SUCCESS} from "./ActionType";


// export const getCart = () => async (dispatch) => {
//     dispatch({ type: GET_CART_REQUEST });

//     try {
//         const { data } = await api.get(`${API_BASE_URL}/api/cart`);
//         dispatch({ type: GET_CART_SUCCESSS, payload: data })

//         // console.log('cart', data);

//     } catch (error) {
//         dispatch({ type: GET_CART_FAILURE, payload: error.message })
//     }
// }

// export const addItemToCart = (reqData) => async (dispatch) => {
//     dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
   
//     try {
//         const { data } = await api.put(`${API_BASE_URL}/api/cart/add`, reqData);
//         dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data })
//         toastNotify({ type: 'success', title: 'Added to cart', description: 'Product added to your cart.' });

//         console.log("add item to cart:", data)
//     } catch (error) {
//         dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
//     }
// }

// export const removeCartItem = (cartItemId) => async (dispatch) => {
//     dispatch({ type: REMOVE_CART_ITEM_REQUEST });

//     try {
//         const { data } = await api.delete(`${API_BASE_URL}/api/cart_item/${cartItemId}`);
//         dispatch({ type: REMOVE_CART_ITEM_SUCCESSS, payload: cartItemId })
//         toastNotify({ type: 'success', title: 'Removed', description: 'Item removed from cart.' });
//     } catch (error) {
//         dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
//     }
// }

// export const updateCartItem = (reqData) => async (dispatch) => {
//     dispatch({ type: UPDATE_CART_ITEM_REQUEST });

//     try {
//         const { data } = await api.put(`${API_BASE_URL}/api/cart_item/${reqData.cartItemId}`, reqData.data);
//         dispatch({ type: UPDATE_CART_ITEM_SUCCESSS, payload: data })
//         toastNotify({ type: 'success', title: 'Updated', description: 'Cart item updated.' });
//     } catch (error) {
//         dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
//     }
// }
import { api } from "../../config/apiConfig";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESSS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESSS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESSS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESSS } from "./ActionType"
import { toastNotify } from '../shared/toast';
import { API_BASE_URL } from "../../config/apiConfig";
// Removed: import {ADD_ITEM_TO_CART_SUCCESS} from "./ActionType";


export const getCart = () => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/api/cart`);
        dispatch({ type: GET_CART_SUCCESSS, payload: data })

        // console.log('cart', data);

    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.message })
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
   
    try {
        const { data } = await api.put(`${API_BASE_URL}/api/cart/add`, reqData);
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESSS, payload: data }) // Fixed typo here
        toastNotify({ type: 'success', title: 'Added to cart', description: 'Product added to your cart.' });

        console.log("add item to cart:", data)
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
    }
}

export const removeCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });

    try {
        const { data } = await api.delete(`${API_BASE_URL}/api/cart_item/${cartItemId}`);
        dispatch({ type: REMOVE_CART_ITEM_SUCCESSS, payload: cartItemId })
        toastNotify({ type: 'success', title: 'Removed', description: 'Item removed from cart.' });
    } catch (error) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    }
}

export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });

    try {
        const { data } = await api.put(`${API_BASE_URL}/api/cart_item/${reqData.cartItemId}`, reqData.data);
        dispatch({ type: UPDATE_CART_ITEM_SUCCESSS, payload: data })
        toastNotify({ type: 'success', title: 'Updated', description: 'Cart item updated.' });
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    }
}