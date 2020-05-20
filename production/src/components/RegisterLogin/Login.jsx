import React, {useState} from "react";
import {reduxForm, reset} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth.reducer";
import s from "./Form.module.scss";
import LoginForm from "./LoginForm";
import {NavLink, Redirect} from "react-router-dom";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData);
    }

    if(props.token){
        return <Redirect to={'/sales_plan'}/>
    }

    return (
        <>
            <div className={s.login_from_small}>
                <h1>Авторизация</h1>
                <p>Пожалуйста заполните все поля</p>
                <hr/>
                <SuperLoginForm onSubmit={onSubmit} isFetching={props.isFetching}/>
                <div className={s.link}>
                    <h5>Еще не зарегестрированы?</h5>
                    <NavLink to={'/register'}>Перейти к регистрации</NavLink>
                </div>
            </div>
        </>
    )
}


const SuperLoginForm = reduxForm({form: 'loginForm'})(LoginForm);

let mapStateToProps = (state) => ({
    isFetching: state.auth.isFetching,
    token: state.auth.token,
})


export default connect(mapStateToProps, {login})(Login);