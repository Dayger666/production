import React from "react";
import s from "./Form.module.scss";
import {Input, Select} from "../common/FormControls/FormControls";
import {Field} from "redux-form";
import {required} from "../../validators/validators";


const RegisterForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>
                <span>Введите имя</span>
                <Field placeholder={"Введите имя"} name="name" component={Input} validate={[required]}/>
            </label>
            <label>
                <span>Введите логин</span>
                <Field placeholder={"Логин"} name="login" component={Input} validate={[required]}/>
            </label>
            <label>
                <span>Введите пароль</span>
                <Field placeholder={"Введите пароль"} name="password" type={"password"} component={Input} validate={[required]}/>
            </label>
            <label>
                <span>Подтвердите пароль</span>
                <Field placeholder={"Подтвердите пароль"} name="checkPassword" type={"password"} component={Input}
                       validate={[required]}/>
            </label>
            <label>
                <span>Выберите должность</span>
                <Field placeholder={"Подтвердите пароль"} name="role" component={Select}
                       validate={[required]}>
                    <option value="">------</option>
                    <option value="мастер цеха">Мастер цеха</option>
                    <option value="технолог">Технолог</option>
                    <option value="диспетчер">Диспетчер</option>
                </Field>

            </label>
            <button disabled={props.isFetching} className={s.btn_blue} type="submit">Зарегестрироваться</button>
        </form>
    )
}

export default RegisterForm;



