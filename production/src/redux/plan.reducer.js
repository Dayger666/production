import {planAPI} from "../serverApi/api";

const SET_PLAN_DATA = 'SET_PLAN_DATA';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const SET_MATERIALS = 'SET_MATERIALS';
const SET_IDS = 'SET_IDS';
const RESET_IDS = 'RESET_IDS';

let initialState = {
    orders: [],
    materials: [],
    idToSpec: [],
    isFetching: false,
}

const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAN_DATA:
            return {
                ...state,
                orders: [...action.orders],
            }
        case SET_FETCHING_STATUS:
            return {...state, isFetching: action.status}
        case SET_IDS: {
            let foundId = state.idToSpec.find((item) => {
                return action.id === item
            })
            if(foundId){
                return {...state, idToSpec: [...state.idToSpec.filter(i => {
                        if (i !== foundId) {
                            return i
                        }
                    })
            ]}
            } else {
                return {...state, idToSpec: [...state.idToSpec, action.id]}
            }
        }
        case RESET_IDS:
            return {...state, idToSpec: []}
        case SET_MATERIALS:
            return {...state, materials: [...action.materials]}
        default:
            return state;
    }
}

const setPlanData = (orders) => ({type: SET_PLAN_DATA, orders});
const setMaterials = (materials) => ({type: SET_MATERIALS, materials});
const setFetchingStatus = (status) => ({type: SET_FETCHING_STATUS, status});
export const setIdToSpec = (id) => ({type: SET_IDS, id});
export const resetIdToSpec = () => ({type: RESET_IDS});


export const getPlanData = () => (dispatch) => {
    dispatch(setFetchingStatus(true));
    planAPI.getPlan().then(data => {
        dispatch(setPlanData(data))
        dispatch(setFetchingStatus(false));
    })
}

export const createOrder = (id) => (dispatch) => {
    dispatch(setFetchingStatus(true));
    planAPI.createOrderFromPlan(id).then(data => {
        // dispatch(setPlanData(data))
        dispatch(setFetchingStatus(false));
    })
}

export const getMaterials = () => (dispatch) => {
    dispatch(setFetchingStatus(true));
    planAPI.getMaterials().then(data => {
        dispatch(setMaterials(data))
        dispatch(setFetchingStatus(false));
    })
}

export default planReducer;