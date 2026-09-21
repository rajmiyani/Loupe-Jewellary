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

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
        case CREATE_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
                error: null,
            };

        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
                error: null,
            };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.map((cat) =>
                    cat._id === action.payload._id ? action.payload : cat
                ),
                error: null,
            };

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter((cat) => cat._id !== action.payload),
                error: null,
            };

        case GET_CATEGORIES_FAILURE:
        case CREATE_CATEGORY_FAILURE:
        case UPDATE_CATEGORY_FAILURE:
        case DELETE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
