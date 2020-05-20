import React, {useEffect, useState} from "react";
import s from './Orders.scss';
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {getOrders, planOrder, updateOrder, unloadToStore, updateOrderSteps} from "../../redux/specification.reducer";
import {setId} from "../../redux/specification.reducer";
import ChangeStatus from "./ChangeStatus/ChangeStatus";


const Orders = (props) => {
    let [ID, setID] = useState('')
    let [editMode, setEditMode] = useState(false);
    let [name, setName] = useState(false);
    let [amount, setAmount] = useState(false);
    let [steps,setSteps]=useState([]);
    // let [idToChange, setName] = useState(false);
    useEffect(() => {
        props.getOrders()
    }, [props.orders]);


    // useEffect(() => {
    //     setStatus(props.status)
    // }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        // props.updateUserStatus(status);
    }

    const planOrder = (id) => {
        props.planOrder(id)
    }

    const updateOrder = (id, status) => {
        props.updateOrder(id, status)
    }

    return (
        <div>
            {
                editMode && <ChangeStatus
                    id={ID}
                    steps={steps}
                    name={name}
                    deactivateEditMode={deactivateEditMode}
                    updateOrder={updateOrder}
                    updateOrderSteps={props.updateOrderSteps}/>
            }
            <h2>План заказов</h2>
            <table>
                <tbody>
                <tr>
                    <th>#</th>
                    <th>№</th>
                    <th>Название</th>
                    <th>Статус</th>
                    <th>Количество</th>
                    <th>Полное время производства(ч)</th>
                </tr>
                {props.orders.map((order, i) => {
                    if (order.status === "создан") {
                        return (
                            <tr key={order._id}>
                                <td><input type="checkbox" value={order._id}
                                           onChange={event => setID(event.target.value)}/></td>
                                <td>{++i}</td>
                                <td>{order.name}</td>
                                <td>{order.status}</td>
                                <td>{order.amount}</td>
                                <td>{Math.round(order.fullTime / 60)}</td>
                            </tr>
                        )
                    }
                })
                }
                </tbody>
            </table>
            <button className={s.btn} onClick={() => planOrder(ID)}>Списать материалы</button>


            <hr/>

            <h2>План запланированных заказов</h2>
            <table>
                <tbody>
                <tr>
                    <th>#</th>
                    <th>№</th>
                    <th>Название</th>
                    <th>Статус</th>
                    <th>Количество</th>
                    <th>Полное время производства(ч)</th>
                </tr>
                {props.orders.map((order, i) => {
                    if (order.status !== "создан") {
                        return (
                            <tr key={order._id}>
                                <td><input type="checkbox" value={order._id}
                                           onChange={event => {
                                               setID(event.target.value);
                                               setName(order.name);
                                               setAmount(order.amount);
                                               setSteps([...order.steps]);
                                           }} /></td>
                                <td>{++i}</td>
                                <td>{order.name}</td>
                                <td>{order.status}</td>
                                <td>{order.amount}</td>
                                <td>{Math.round(order.fullTime / 60)}</td>
                            </tr>
                        )
                    }
                })
                }
                </tbody>
            </table>
            <button className={s.btn} onClick={activateEditMode}>Поменять статус</button>
            <button className={s.btn} onClick={() => props.unloadToStore(ID, name, amount)}>Выгрузить на склад</button>
        </div>
    )
}

let mapStateToProps = (state) => ({
    specifications: state.spec.specifications,
    orders: state.spec.orders,
})

export default compose(
    connect(mapStateToProps, {setId, getOrders, planOrder, updateOrder,updateOrderSteps, unloadToStore}),
    withAuthRedirect,
)(Orders)


