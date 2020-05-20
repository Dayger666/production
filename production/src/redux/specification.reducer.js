import {specAPI, orderAPI} from "../serverApi/api";

const SET_SPEC_DATA = 'SET_SPEC_DATA';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const SET_ORDERS = 'SET_ORDERS';
const SET_ID = 'SET_ID';
const RESET_ID = 'RESET_ID';

let initialState = {
    specifications: [],
    orders: [],
    ids: [],
    isFetching: false,
}

const specReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SPEC_DATA:
            return {
                ...state,
                specifications: [...action.specifications],
            }
        case SET_ID: {
                let foundId = state.ids.find((item) => {
                    return action.id === item
                })
                if(foundId){
                    return {...state, ids: [...state.ids.filter(i => {
                            if (i !== foundId) {
                                return i
                            }
                        })
                        ]}
                } else {
                    return {...state, ids: [...state.ids, action.id]}
                }
            }
        case SET_FETCHING_STATUS:
            return {...state, isFetching: action.status}
        case SET_ORDERS:
            return {...state, orders: [...action.orders]}
        case RESET_ID:
            return {...state, ids: []}
        default:
            return state;
    }
}

const setSpecData = (specifications) => ({type: SET_SPEC_DATA, specifications});
const setOrders = (orders) => ({type: SET_ORDERS, orders});
const setFetchingStatus = (status) => ({type: SET_FETCHING_STATUS, status});
export const setId = (id) => ({type: SET_ID, id})
export const resetId = () => ({type: RESET_ID})

export const getSpecifications = () => (dispatch) => {
    dispatch(setFetchingStatus(true));
    specAPI.getSpecifications().then(data => {
        dispatch(setSpecData(data))
        dispatch(setFetchingStatus(false));
    })
}

export const createSpecification = (specData) => (dispatch) => {
    dispatch(setFetchingStatus(true));
    specAPI.createSpecification(specData).then(data => {
        // dispatch(setSpecData(data))
        dispatch(setFetchingStatus(false));
    })
}

export const getOrders = () => (dispatch) => {
    dispatch(setFetchingStatus(true));
    orderAPI.getOrders().then(data => {
        dispatch(setOrders(data))
        dispatch(setFetchingStatus(false));
    })
}

export const planOrder = (id) => (dispatch) => {
    dispatch(setFetchingStatus(true));
    specAPI.planOrder(id).then(data => {
        // dispatch(planOrder(id))
        dispatch(setFetchingStatus(false));
    })
}

export const updateOrder = (id, status) => (dispatch) => {
    dispatch(setFetchingStatus(true));
    specAPI.updateOrder(id, status).then(data => {
        // dispatch(planOrder(id))
        dispatch(setFetchingStatus(false));
    })
}
export const updateOrderSteps = (id, steps) => (dispatch) => {
    console.log(1);
    dispatch(setFetchingStatus(true));
    specAPI.updateOrderSteps(id, steps).then(data => {
        // dispatch(planOrder(id))
        dispatch(setFetchingStatus(false));
    })
}

export const unloadToStore = (id, name, amount) => (dispatch) => {
    dispatch(setFetchingStatus(true));
    orderAPI.unloadToStore(id, name, amount).then(data => {
        // dispatch(planOrder(id))
        dispatch(setFetchingStatus(false));
    })
}

export const deleteSpec = (id) => (dispatch) => {
    dispatch(setFetchingStatus(true));
    specAPI.deleteSpec(id).then(data => {
        // dispatch(planOrder(id))
        dispatch(setFetchingStatus(false));
    })
}


export default specReducer;