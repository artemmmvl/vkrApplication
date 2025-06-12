import React from 'react';
import styles from './Profile.module.css';
import gosuslugi from './о.png'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {dispatches} from "../../../store/reducer";
import {toast} from "react-toastify";
function GosuslugiButton() {
    const token = useSelector(state => state.auth.token);
    const dispatch=useDispatch()

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const handleConfirm = () => {
        console.log(token)
        axios.post(
            `${serverUrl}/make-creator`,
            { token },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(
            res=>{dispatch(dispatches.setToken({token: res.data.token}))
            toast.success("Профиль успешно подтвержден");
            }
        ).catch(
            err => toast.error("Ошибка при подтверждении профиля")
        );
    };

    return (
        <button className={styles.gosuslugiButton} onClick={handleConfirm}>
            <img
                width="50"
                src={gosuslugi}
                alt="Госуслуги"
                className={styles.gosuslugiLogo}
            />
            Подтвердить профиль <br/>через Госуслуги
        </button>
    );
}

export default GosuslugiButton;
