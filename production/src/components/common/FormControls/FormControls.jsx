import React from "react";
import s from "./FormControls.module.css"

export const FormControl = ({input, meta, description, ...props}) => {
    let hasError = meta.error && meta.touched;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <span>{props.children}{description}</span>
            {hasError ? <div className={s.error_message}>{meta.error}</div>:""}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const Select = (props) => {
    const {input, label, meta, ...restProps} = props;
        let hasError = meta.error && meta.touched;
        return (
        <>
           <select {...input} className={hasError ? s.select_error : ""}>
                {props.children}
           </select>
              {hasError? <div className={s.error_message}>{meta.error}</div>: ""}
        </>
    )
}
