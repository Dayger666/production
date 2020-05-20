import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    token: state.auth.token
})

const getToken = () => {
    return localStorage.getItem('token');
}

const getUserPayload = () => {
    let token = getToken();
    if (token) {
        let userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
    }
    else return null;
}

const isLoggedIn =() => {
    let userPayload = getUserPayload();
    if (userPayload)
        return userPayload.exp > Date.now() / 1000;
    else return false;
}

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!isLoggedIn()) return <Redirect to={"/login"}/>
            return <Component {...this.props}/>
        }
    }
    return connect(mapStateToProps)(RedirectComponent);
}