import React, {useState} from "react";
import s from "./Form.module.scss"
import {register} from "../../redux/auth.reducer";
import {reset} from 'redux-form';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import RegisterForm from "./RegisterForm";
import ErrorMessage from "../common/Error/ErrorMessage";

const Register = (props) => {
    const [errorStatus, setErrorStatus] = useState(false)
    const onSubmit = (formData, dispatch) => {
        if(formData.password === formData.checkPassword){
            props.register(formData)
        } else {
            setErrorStatus(true);
            dispatch(reset("registerForm"));
        }
    }
    return (
        <>
            {errorStatus && <ErrorMessage desc={"Пароли не совпадают"}/>}
            <div className={s.login_form}>
                <h1>Регистрация</h1>
                <p>Пожалуйста заполните все поля</p>
                <hr/>
                <SuperRegisterForm onSubmit={onSubmit} isFetching={props.isFetching}/>
            </div>
        </>
    )
}

const SuperRegisterForm = reduxForm({form: 'registerForm'})(RegisterForm);

let mapStateToProps = (state) => ({
    isFetching: state.auth.isFetching
})


export default connect(mapStateToProps, {register})(Register);


