import React, {useEffect, useState} from "react";
import s from './SalesPlan.module.scss'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {getPlanData, resetIdToSpec, setIdToSpec, createOrder} from "../../redux/plan.reducer";
import {getOrders} from "../../redux/plan.selectors";
import {NavLink, Redirect} from "react-router-dom";
import {resetId} from "../../redux/specification.reducer";


const SalesPlan = (props) => {
    useEffect(() => {
        props.getPlanData()
    }, [props.orders.length]);

    const [redirect, setRedirect] = useState("")

    const addItems = (id) => {
        props.setIdToSpec(id)
    }

     const onCreateOrder = () => {
        props.createOrder(props.idToSpec[0]);
     }


    return (
        <div>
            {
                redirect &&
                <Redirect to={`/${redirect}`}/>
            }


            <h2>План производства</h2>
            <table>
                <tbody>
                <tr>
                    <th>№</th>
                    <th>Номер</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Крайний срок</th>
                </tr>
                {props.orders.map((order, i) =>
                    <tr key={order._id}>
                        <td><input type="checkbox" value={order._id} onChange={event => addItems(event.target.value)}/></td>
                        <td>{++i}</td>
                        <td>{order.name}</td>
                        <td>{order.amount}</td>
                        <td>{order.expTime}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <NavLink to={'/create_specification'}><button className={s.btn}>Составить спецификацию</button></NavLink>
            <button className={s.btn} onClick={() =>
            {
                setRedirect("specifications")
                onCreateOrder()
            }}>

                Отправить на производство
            </button>

        </div>
    )
}

let mapStateToProps = (state) => ({
    orders: getOrders(state),
    idToSpec: state.plan.idToSpec,
})

export default compose(
    connect(mapStateToProps, {getPlanData, createOrder, setIdToSpec, resetId, resetIdToSpec}),
    withAuthRedirect,
)(SalesPlan)


