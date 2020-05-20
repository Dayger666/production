import React, {useState} from "react";
import s from './ErrorMessage.module.scss'

const ErrorMessage = (props) => {
    const [status, setStatus] = useState(true);
    return (
        <>
            {status &&
                <div className={s.error_message}>
                    <div className={s.message_header}>
                        <h1>Ошибка</h1>
                        <hr/>
                    </div>
                    <div className={s.desc}>
                        <p>{props.desc}</p>
                    </div>
                    <div className={s.btn_block}>
                        <button className={s.btn_green} onClick={() => setStatus(false)}>Ок</button>
                    </div>
                </div>
            }
        </>
    )
}

export default ErrorMessage


