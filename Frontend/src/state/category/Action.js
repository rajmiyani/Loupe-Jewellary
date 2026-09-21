import { api } from '../../config/apiConfig';
import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
} from './ActionType';

export const getAllCategories = () => async (dispatch) => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    try {
        const { data } = await api.get('/api/categories');
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const createCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const { data } = await api.post('/api/categories', categoryData);
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
        // Refresh categories
        dispatch(getAllCategories());
        return data;
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        throw error;
    }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
        const { data } = await api.put(`/api/categories/${id}`, categoryData);
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
        dispatch(getAllCategories());
        return data;
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        throw error;
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
        const { data } = await api.delete(`/api/categories/${id}`);
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
        dispatch(getAllCategories());
        return data;
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        throw error;
    }
};
