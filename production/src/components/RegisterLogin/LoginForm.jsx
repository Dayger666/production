import React from "react";
import s from "./Form.module.scss";
import {Input} from "../common/FormControls/FormControls";
import {Field} from "redux-form";
import {required} from "../../validators/validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>
                <span>Введите логин</span>
                <Field placeholder={"Логин"} name="login" component={Input} validate={[required]}/>
            </label>
            <label>
                <span>Введите пароль</span>
                <Field placeholder={"Введите пароль"} name="password" type={"password"} component={Input} validate={[required]}/>
            </label>
            <button disabled={props.isFetching} className={s.btn_blue} type="submit">Войти</button>
        </form>
    )
}

export default LoginForm;



