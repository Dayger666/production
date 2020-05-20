import React, {useEffect, useState} from "react";
import s from "./CreateSpecification.module.scss"
import {connect} from "react-redux";
import {getOrder} from "../../../redux/plan.selectors";
import {reduxForm, reset} from "redux-form";
import CreateSpecificationForm from "./CreateSpecificationForm";
import {createSpecification, resetId} from "../../../redux/specification.reducer";
import {getMaterials, resetIdToSpec} from "../../../redux/plan.reducer";
import {Redirect} from "react-router-dom";


const CreateSpecification = (props) => {
    let id = props.id
    useEffect(() => {
        props.getMaterials()
        console.log("id ", props.id)
    }, [props.materials.length]);
    useEffect(() => {
        return () => {
            props.resetId()
            props.resetIdToSpec()
        }
    }, [])
    const [redirect, setRedirect] = useState("")

    const [selectValue, setSelectValue] = useState("");
    if (props.order.length!==0){
       var name = props.order[0].name;
    }
    const onSubmit = (stepsArr,formData) => {
        props.createSpecification({id, name, ...formData,steps:stepsArr});
        setRedirect("specifications")
    };
    return (

        <div className={s.spec_container}>
            {
                redirect &&
                <Redirect to={`/${redirect}`}/>
            }
            <h3>{name}</h3>
            <span>Что будем производить?</span>
            <select value={selectValue} onChange={(event) => setSelectValue(event.target.value)}>
                <option value={""}>-----------</option>
                <option value={"pen"}>Ручка</option>
                <option value={"pencil"}>Карандаш</option>
            </select>
            {selectValue &&
               <SuperCreateSpecificationForm onSubmit={onSubmit} tool={selectValue} materials={props.materials}/>
            }
        </div>
    )
}


const SuperCreateSpecificationForm = reduxForm({form: 'specForm'})(CreateSpecificationForm);

const mapStateToProps = (state) => ({
    id: state.plan.idToSpec[0],
    order: getOrder(state, state.plan.idToSpec[0]),
    materials: state.plan.materials,
})

export default connect(mapStateToProps,
    {createSpecification, resetId, resetIdToSpec, getMaterials})
(CreateSpecification)