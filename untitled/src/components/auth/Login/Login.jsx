import React, { useState } from 'react';
import classes from './Login.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Input from "../Input/Input";
import axios from "axios";
import {dispatches} from "../../../store/reducer";
import {toast} from "react-toastify";


function LoginForm(props) {

    // console.log(props)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const serverUrl =process.env.REACT_APP_SERVER_URL;


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const responseAuth = await axios.post(serverUrl+'/auth', {
                "email":username,
                "password":password,

            }).then(res=>{

                dispatch(dispatches.setToken({token: res.data.token}))
                toast.success("Вход успешно выполнен");
                navigate("/profile")
            }).catch(res=>{
                    if(res.status===401){
                        toast.error("Неверный логин или пароль");

                    }
                    else {
                        toast.error(res.message);

                    }
                });



            // navigate('/')
        }
        catch (ErrorRes){
            console.log(ErrorRes)
            if (ErrorRes.response) {
                console.log('Ошибка! Код состояния:', ErrorRes.response.status);
                setError(ErrorRes.response.data.message)

            }
            else {
                setError('Ошибка')

            }


            setTimeout(() => {
                setError(null)
            }, 3000)


        }

    }
    return (
        <>
            <div className={classes.wrapper}>
                {error !== null ? (
                    <div className={classes.div_error}>
                        <p className="error">{error}</p>
                    </div>
                ) : null}

                <div className={classes.container_form}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <h2>Вход</h2>
                        <div>
                            <input
                                placeholder="Логин"
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Пароль"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="password"
                            />
                        </div>
                        <button>Вход</button>
                        <div className={classes.goToReg}>
                            <p>
                                <NavLink className={classes.hrefToRegistr} to="/registration">
                                    Нет аккаунта? <span>Зарегистрироваться</span>
                                </NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;