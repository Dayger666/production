import React, {useEffect, useState} from "react";
import s from './AllSpecifications.module.scss';
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {deleteSpec, getSpecifications} from "../../../redux/specification.reducer";
import {setId} from "../../../redux/specification.reducer";

const AllSpecifications = (props) => {
    useEffect(() => {
        props.getSpecifications();
    }, [props.specifications]);

    const [id, setId] = useState('')


    return (
        <div>
            <h2 className={s.text}>План спецификаций</h2>
            <table className={s.table}>
                <tbody>
                <tr>
                    <th>#</th>
                    <th>№</th>
                    <th>Название</th>
                    <th>Тип формы</th>
                    <th>Тип стержня</th>
                    <th>Цвет</th>
                    <th>Расход краски на единицу продукта(в литрах)</th>
                    <th>Время производства единицы продукта</th>
                </tr>
                {props.specifications.map((spec, i) =>
                    <tr key={spec._id}>
                        <td><input type="checkbox" value={spec._id} onChange={event => setId(event.target.value)}/></td>
                        <td>{++i}</td>
                        <td>{spec.name}</td>
                        <td>{spec.formType}</td>
                        <td>{spec.rod || "Нет"}</td>
                        <td>{spec.color}</td>
                        <td>{spec.paintQuantity}</td>
                        <td>{spec.time}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <button onClick={() => props.deleteSpec(id)} className={s.btn}>Удалить спецификацию</button>
        </div>
    )
}

let mapStateToProps = (state) => ({
    specifications: state.spec.specifications,
})

export default compose(
    connect(mapStateToProps, {getSpecifications, setId, deleteSpec}),
    withAuthRedirect,
)(AllSpecifications)


