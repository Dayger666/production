import React from "react";
import s from './Preloader.scss'
import load from '../../../assets/loader.svg'

const Preloader = () => {
    return (
        <div className={s.loader}>
            <img src={load} alt={"loading"}/>
        </div>
    )
}

export default Preloader;