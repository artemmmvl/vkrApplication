import React, {useRef, useState} from 'react';
import classes  from './Registration.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Input from "../Input/Input";
import Select from "../Input/Select";
import {cities} from "../../../data/cities";
import axios from "axios";
import SelectReact from 'react-select';
import InputMask from 'react-input-mask';

import moment from 'moment';
import {dispatches} from "../../../store/reducer";




function Registration(props) {
    const [firstname, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');

    const [img, setImg] = useState(null);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };


    const [day, setDay] = useState(-1);
    const [month, setMonth] = useState(-1);
    const [year, setYear] = useState(-1);
    const [gender, setGender] = useState(-1);
    const [error, setError] = useState(null);

    const navigate=useNavigate()
    const dispatch=useDispatch()

    let dateDay=[{valueHtml:-1,value:"День",
        disable:true}]
    const currentYear = new Date().getFullYear();
    const years = [{valueHtml:-1,value:"Год",
        disable:true}];

    for (let i = 14; i <= 100; i++) {
        years.push({
            "value":currentYear - i,
            "valueHtml":currentYear - i,
        });
    }
    const serverUrl =process.env.REACT_APP_SERVER_URL;
    console.log(serverUrl)
    const months = [
        {
            valueHtml:-1,
            value:"Месяц",
            disable:true
        },
        {   valueHtml:0,
            value:"Январь"
        },
        {   valueHtml:1,
            value:"Февраль"
        }
        ,
        {   valueHtml:2,
            value:"Март"
        },
        {   valueHtml:3,
            value:"Апрель"
        },
        {   valueHtml:4,
            value:"Май"
        },
        {   valueHtml:5,
            value:"Июнь"
        },
        {   valueHtml:6,
            value:"Июль"
        },
        {   valueHtml:7,
            value:"Август"
        },
        {   valueHtml:8,
            value:"Сентябрь"
        },
        {   valueHtml:9,
            value:"Октябрь"
        },
        {   valueHtml:10,
            value:"Ноябрь"},
        {
            valueHtml:11,
            value:"Декабрь"
        }
    ];
    const genders=[{value:'Пол',valueHtml:-1,
        disable:true },{value:"М",valueHtml:'man'},{value:"Ж",valueHtml:'women'}]


    for (let i =1; i<=31; i++){
        dateDay.push({
            "value":i,
            "valueHtml":i
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (day===-1 || year===-1 || month===-1){
            setError("Укажите дату рождения")
            setTimeout(() => {
                setError(null)
            }, 3000)
            console.log('Нет даты')
            return;
        }
        if (gender===-1){
            setError("Укажите пол")
            setTimeout(() => {
                setError(null)
            }, 3000)
            return;
        }

        const date = moment({ year, month: month , day });
        if (!date.isValid()) {
            setError("Некорректная дата")
            setTimeout(() => {
                setError(null)
            }, 3000)
            return;
        }



        try {
            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);

            formData.append('password', password);
            formData.append('email', username);
            formData.append('gender', gender);

            formData.append('photo', img);
            formData.append('number', number);

            formData.append('birthday', Math.floor(new Date(year, month, day) / 1000));

            const responseAuth = await axios.post(serverUrl+'/register', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            console.log(responseAuth)
            dispatch(dispatches.setToken({token: responseAuth.data.token}))
            navigate('/')



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
    console.log(img)
    return (
        <>
            {error && (
                <div className={classes.div_error}>
                    <p>{error}</p>
                </div>
            )}

            <div className={classes.wrapper}>
                <div className={classes.container_form}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <h2>Регистрация</h2>
                        <div>

                            <label>Имя:</label>

                            <input
                            required
                            type="text"
                            id="firstname"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoComplete="name"
                            placeholder="Имя:"
                            />
                        </div>
                        <div>
                            <label>Фамилия:</label>

                            <input
                                required
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                autoComplete="lastname"
                                placeholder="Фамилия:"
                            />
                        </div>
                        <div>
                            <label>Дата рождения:</label>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                <Select
                                    onChange={(e) => setDay(e.target.value)}
                                    value={day}
                                    values={dateDay}
                                    name="day"
                                    id="day"
                                />
                                <Select
                                    onChange={(e) => setMonth(e.target.value)}
                                    value={month}
                                    values={months}
                                    name="month"
                                    id="month"
                                />
                                <Select
                                    onChange={(e) => setYear(e.target.value)}
                                    value={year}
                                    values={years}
                                    name="year"
                                    id="year"
                                />
                            </div>
                        </div>

                        <div>
                            <label>Пол:</label>
                            <Select
                                onChange={(e) => setGender(e.target.value)}
                                value={gender}
                                values={genders}
                                name="gender"
                                id="gender"
                            />
                        </div>




                        <div>
                            <label>Почта:</label>

                            <input
                                required
                                type="email"
                                id="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="email"
                                placeholder="Почта:"
                            />
                        </div>

                        <div className="phone-input-wrapper">
                            <label htmlFor="phone">Номер телефона:</label>
                            <input
                                placeholder="+7 (999) 999-99-99"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                                type="tel"
                                id="phone"
                                className="phone-input"
                            />
                        </div>



                        <div>
                            <label htmlFor="phone">Пароль:</label>

                            <input
                                required
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                placeholder="Пароль:"
                                minLength={6}
                            />
                        </div>


                        <div>
                            <label>Фото:</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".png, .jpeg, .jpg"
                            />
                        </div>

                        <button type="submit">Зарегистрироваться</button>

                        <div className={classes.goToReg}>
                            <p>
                                Уже есть аккаунт?{' '}
                                <NavLink className={classes.hrefToRegistr} to="/login">
                                    <span>Войти</span>
                                </NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );

}

export default Registration;