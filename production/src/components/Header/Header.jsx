import React, {useEffect} from "react";
import s from './Header.module.scss';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={s.header}>
            <div className={s.dropdown}>
                <button className={s.dropbtn}>Меню</button>
                <div className={s.dropdown_content}>
                    <NavLink to={'/sales_plan'}>Перейти к плану производства</NavLink>
                    <NavLink to={'/specifications'}>Перейти ко всем спецификациям</NavLink>
                    <NavLink to={'/materials'}>Перейти к складу</NavLink>
                    <NavLink to={'/orders'}>Перейти к заказам</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header;