import {
    GET_DASHBOARD_STATS_REQUEST,
    GET_DASHBOARD_STATS_SUCCESS,
    GET_DASHBOARD_STATS_FAILURE,
    GET_LATEST_ORDERS_REQUEST,
    GET_LATEST_ORDERS_SUCCESS,
    GET_LATEST_ORDERS_FAILURE,
    GET_WEEKLY_STATS_REQUEST,
    GET_WEEKLY_STATS_SUCCESS,
    GET_WEEKLY_STATS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    GET_CATEGORY_DISTRIBUTION_REQUEST,
    GET_CATEGORY_DISTRIBUTION_SUCCESS,
    GET_CATEGORY_DISTRIBUTION_FAILURE
} from "./ActionType";

const initialState = {
    stats: null,
    latestOrders: [],
    weeklyStats: [],
    allProducts: [],
    categoryDistribution: [],
    loading: false,
    error: null,
};

const adminDashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DASHBOARD_STATS_REQUEST:
        case GET_LATEST_ORDERS_REQUEST:
        case GET_WEEKLY_STATS_REQUEST:
        case GET_ALL_PRODUCTS_REQUEST:
        case GET_CATEGORY_DISTRIBUTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_DASHBOARD_STATS_SUCCESS:
            return {
                ...state,
                loading: false,
                stats: action.payload,
            };
        case GET_LATEST_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                latestOrders: action.payload,
            };
        case GET_WEEKLY_STATS_SUCCESS:
            return {
                ...state,
                loading: false,
                weeklyStats: action.payload,
            };
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                allProducts: action.payload,
            };
        case GET_CATEGORY_DISTRIBUTION_SUCCESS:
            return {
                ...state,
                loading: false,
                categoryDistribution: action.payload,
            };
        case GET_DASHBOARD_STATS_FAILURE:
        case GET_LATEST_ORDERS_FAILURE:
        case GET_WEEKLY_STATS_FAILURE:
        case GET_ALL_PRODUCTS_FAILURE:
        case GET_CATEGORY_DISTRIBUTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default adminDashboardReducer;
