import React, {useEffect, useState} from "react";
import s from './Materials.module.scss'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {getMaterials} from "../../redux/plan.reducer";
import {NavLink} from "react-router-dom";


const Materials = (props) => {
    useEffect(() => {
        props.getMaterials()
    }, [props.materials.length]);

    const addItems = (id) => {
        props.setIdToSpec(id)
    }

    const onCreateOrder = () => {
        props.createOrder(props.idToSpec[0]);
    }


    return (
        <div>
            <h2>Материалы</h2>
            <table>
                <tbody>
                <tr>
                    <th>Номер</th>
                    <th>Название</th>
                    <th>Количество</th>
                </tr>
                {props.materials.map((material, i) =>
                    <tr key={material._id}>
                        <td>{++i}</td>
                        <td>{material.name}</td>
                        <td>{material.amount}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

let mapStateToProps = (state) => ({
    materials: state.plan.materials,
})

export default compose(
    connect(mapStateToProps, {getMaterials}),
    withAuthRedirect,
)(Materials)


