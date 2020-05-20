import React, {useState} from "react";
import {Field} from "redux-form";
import {Input} from "../../common/FormControls/FormControls";
import {Select as Selector} from "../../common/FormControls/FormControls";
import {required} from "../../../validators/validators";
import s from "./CreateSpecification.module.scss"
import {NavLink} from "react-router-dom";
import Select from "react-select";



const CreateSpecificationForm = (props) => {
   let [stepsArr,setStepsArr]=useState([]);
    const steps = [
        {value: 'Покраска', label: 'Покраска'},
        {value: 'Упаковка', label: 'Упаковка'},
        {value: 'Сборка', label: 'Сборка'},

    ];
    const onChangeCategory = (values) => {
        setStepsArr([]);
        if(values!==null) {
            values.map((step)=>{
                setStepsArr([...stepsArr,step.value])
            })
        }
    };
    return (
        <form onSubmit={props.handleSubmit((values) => {
            props.onSubmit(stepsArr,values);
        })}>
            <span>Выберите этапы производства</span>
            <div className={s.steps}>
            <Select
                isMulti
                name="categories"
                options={steps}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder='Выберите этапы'
                onChange={onChangeCategory}
            />
            </div>
            {props.tool === "pen" ?
                <>
                    <span>Выберите тип формы</span>
                    <Field name="formType" component={Selector}>
                        <option value="">------</option>
                        {
                            props.materials.map(i => {
                                if(i.type === "форма для ручек"){
                                    return <option value={i.name}>{i.name}</option>
                                }
                            })
                        }
                    </Field>
                    <span>Выберите тип стержня</span>
                    <Field name="rod" component={Selector}>
                        <option value="">------</option>
                        {
                            props.materials.map(i => {
                                if(i.type === "стержень"){
                                    return <option value={i.name}>{i.name}</option>
                                }
                            })
                        }
                    </Field>
                </>
                :
                <>
                    <span>Выберите тип формы</span>
                    <Field name="formType" component={Selector}>
                        <option value="">------</option>
                        {
                            props.materials.map(i => {
                                if(i.type === "форма для карандашей"){
                                   return <option value={i.name}>{i.name}</option>
                                }
                            })
                        }
                    </Field>
                    <span>Выберите цвет краски</span>
                    <Field name="color" component={Selector}>
                        <option value="">------</option>
                        {
                            props.materials.map(i => {
                                if(i.type === "краска"){
                                    return <option value={i.name}>{i.name}</option>
                                }
                            })
                        }
                    </Field>
                </>

            }
            <label>
                <span>Введите расход краски(в литрах)</span>
                <Field name="paintQuantity"  component={Input}
                       validate={[required]}/>
            </label>
            <label>
                <span>Введите количество затрачиваемого времени на единицу(в минутах)</span>
                <Field name="time" component={Input}
                       validate={[required]}/>
            </label>

            {/*<NavLink to={'/specifications'}>*/}
                <button disabled={props.isFetching} className={s.btn_blue} type="submit">Создать спецификацию</button>
            {/*</NavLink>*/}
        </form>
    )
}

export default CreateSpecificationForm;