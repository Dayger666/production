import React, {useState} from "react";
import s from './ChangeStatus.module.scss'
import {updateOrderSteps} from "../../../redux/specification.reducer";

const ChangeStatus = (props) => {
    let steps=props.steps||[];
    const [status, setStatus] = useState("сборка");
    let options=steps.map((step)=><option value={step}>{step}</option>
    );
    return (
            <div className={s.changeStatus}>
                <h3>{props.name}</h3>
                <select value={status} onChange={(event) => {
                    console.log(event.currentTarget.value);
                    setStatus(event.currentTarget.value)
                }}>

                    {/*<option value="сборка">Сборка</option>*/}
                    {/*{props.name[0] === "К" &&*/}
                    {/*    <option value="покраска">Покраска</option>*/}
                    {/*}*/}
                    {/*<option value="упаковка">Упаковка</option>*/}
                    {options};
                </select>
                <button className={s.btn_blue} onClick={()=> {
                    props.updateOrderSteps(props.id,steps.filter((step)=>step!==status));
                    props.updateOrder(props.id, status);
                    props.deactivateEditMode()
                }}>Подтвердить</button>
                <button className={s.btn_green} onClick={props.deactivateEditMode}>Отмена</button>
            </div>
        )
}

export default ChangeStatus;