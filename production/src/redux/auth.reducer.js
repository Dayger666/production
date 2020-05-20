import {authAPI} from "../serverApi/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const SET_TOKEN = 'SET_TOKEN';

let initialState = {
    userName: null,
    login: null,
    role: null,
    isFetching: false,
    token: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_FETCHING_STATUS:
            return {...state, isFetching: action.status}
        case SET_TOKEN:
            return {...state, token: action.token}
        default:
            return state;
    }
}

const setUserData = (userName, login, role) => ({type: SET_USER_DATA, data: {userName, login, role}});
const setFetchingStatus = (status) => ({type: SET_FETCHING_STATUS, status});
const setToken = (token) => ({type: SET_TOKEN, token});
// export const getUserData = () => (dispatch) => {
//     return authAPI.getPersonalAccount().then(data => {
//         if(data.resultCode === 0){
//             let {id, login, email} = data.data;
//             dispatch(setUserData(id, login, email, true));
//         }
//     })
// }

export const register = (userData) => (dispatch) => {
    dispatch(setFetchingStatus(true));
    authAPI.registerUser(userData).then(data => {
        if(data.resultCode === 0){
            dispatch(setUserData(data.userName, data.login, data.role))
            dispatch(setFetchingStatus(false));
        }
        // else {
        //     data.messages.length > 0
        //          ? dispatch(stopSubmit("registerForm", {_error: data.messages[0]}))
        //          : dispatch(stopSubmit("Oops, something went wrong", {_error: data.messages[0]}))
        // }
    })
}

export const login = (userData) => (dispatch) => {
    dispatch(setFetchingStatus(true));
    authAPI.loginUser(userData).then(data => {
        if(data.resultCode === 0){
            dispatch(setFetchingStatus(false));
            dispatch(setUserData(data.userName, data.login, data.role))
            localStorage.setItem('token', data.token);
            dispatch(setToken(data.token));
        } else {
            // data.messages.length > 0
            //     ? dispatch(stopSubmit("login", {_error: data.messages[0]}))
            //     : dispatch(stopSubmit("Oops, something went wrong", {_error: data.messages[0]}))
        }
    })
}
//
// export const logout = () => (dispatch) => {
//     authAPI.logout().then(data => {
//         if(data.resultCode === 0){
//             dispatch(setUserData(null, null, null, false));
//         }
//     })
// }


export default authReducer;