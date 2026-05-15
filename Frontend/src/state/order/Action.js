import { API_BASE_URL, api } from "../../config/apiConfig";
import { toastNotify } from '../shared/toast';
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS } from "./ActionType";
import { getUser } from "../auth/Action";

export const createOrder = (reqData) => async (dispatch) => {
    // console.log("reqData in createOrder (Action) :", reqData)
    dispatch({ type: CREATE_ORDER_REQUEST })

    try {
        const { data } = await api.post(
            `${API_BASE_URL}/api/orders/`,
            reqData.address,
        )
        if (data._id) {
            reqData.navigate({ search: `step=2&order_id=${data._id}` });
        }
        // console.log("created order - ", data)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        })
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(getUser(jwt));
        }
        toastNotify({ type: 'success', title: 'Address saved', description: 'Delivery details saved successfully.' });
    } catch (error) {
        console.log("catch error: ", error);

        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message,
        })
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    if (!orderId) {
        console.error("getOrderById called without orderId");
        return;
    }
    dispatch({ type: GET_ORDER_BY_ID_REQUEST })

    try {
        const { data } = await api.get(
            `${API_BASE_URL}/api/orders/${orderId}`,
        )

        console.log(`order data with id: ${orderId}`, data);
        dispatch({
            type: GET_ORDER_BY_ID_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log("catch error: ", error);

        dispatch({
            type: GET_ORDER_BY_ID_FAILURE,
            payload: error.message,
        })
    }
}

export const getOrderHistory = (reqData) => async (dispatch) => {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST })
    // const config = { 
    //     headers: {
    //         Authorization: `Bearer ${reqData.jwt}`,
    //     }
    // }   

    try {
        const { data } = await api.get(
            `/api/orders/user`
        )
        console.log("order history ------ ", data)

        dispatch({
            type: GET_ORDER_HISTORY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log("catch error: ", error);

        dispatch({
            type: GET_ORDER_HISTORY_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


