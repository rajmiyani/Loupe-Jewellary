import { api } from "../../config/apiConfig";
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, UPDATE_PAYMENT_REQUEST } from "./ActionType"
import { CLEAR_CART } from "../cart/ActionType";
import { getCart } from "../cart/Action";
import { API_BASE_URL } from "../../config/apiConfig";

export const createPayment = (orderId) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST });

    try {
        const { data } = await api.post(`${API_BASE_URL}/api/payment/${orderId}`, {});

        if (data.payment_link_url) {
            window.location.href = data.payment_link_url;
        }

    } catch (error) {
        dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message })
    }
}

export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST })

    try {
        const { data } = await api.get(
            `${API_BASE_URL}/api/payment?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
        )
        console.log('update payment:-', data);
        
        if (data.success) {
            dispatch({ type: CLEAR_CART });
            dispatch(getCart());
        }

    } catch (error) {
        dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
    }
}
