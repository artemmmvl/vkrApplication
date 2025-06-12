import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi';
import GosuslugiButton from "./GosuslugiButton";
import { useNavigate } from 'react-router-dom';
import MyCompanies from "./MyCompanies/MyCompanies";
import MyCampaign from "./MyCampaign/MyCampaign";
import { FiLogOut, FiHeart, FiCreditCard } from 'react-icons/fi';
import AsideMenu from "./AsideMenu";
import Header from "../mainPage/header/Header";
import Modal from "react-modal";

function Profile() {
    const navigate = useNavigate();

    const token = useSelector(state => state.auth.token);
    const role = useSelector(state => state.auth.role);
    console.log(role)

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [user, setUser] = useState(null);
    const urlImg=process.env.REACT_APP_SERVER_IMG

    useEffect(() => {
        axios.post(
            `${serverUrl}/users/info`,
            { token },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(res => setUser(res.data));
    }, [token, serverUrl]);

    if (!user) return <div className={classes.loader}>Загрузка профиля...</div>;

    return (
        <>
            <Header/>

            <div className={classes.pageWrapper}>
                <div className={classes.profileLayout}>
                    <AsideMenu active="profile"></AsideMenu>

    <section className={classes.profile}>

            <button className={classes.editButton} title="Редактировать профиль">
                <FiEdit2 size={18} />
            </button>

            <div className={classes.header}>
                <img src={urlImg+user.photo} alt="Аватар" className={classes.avatar} />
                <div className={classes.headerInfo}>
                    <h1>{user.firstname} {user.lastname}</h1>
                    <p>{user.email}</p>
                </div>

                <div className={classes.headerActions}>
                    {role==="[DONATER]"?<GosuslugiButton/>:<div className={classes.confirmedProfile}>Профиль подтверждён</div>}

                </div>
            </div>

            <div className={classes.infoGrid}>
                <div>
                    <span>Телефон</span>
                    <strong>{user.number || '—'}</strong>
                </div>
                <div>
                    <span>Роль</span>
                    <strong>{user.roles.join(', ')}</strong>
                </div>
                <div>
                    <span>Дата рождения</span>
                    <strong>{new Date(user.birthDate * 1000).toLocaleDateString()}</strong>
                </div>
            </div>

        {role==="[DONATER]"?<div className={classes.verificationInfo}>
            Чтобы добавить компанию или создать сбор, необходимо подтвердить профиль через Госуслуги.
        </div>:<section className={classes.cards}>
                <article>
                    <h2>Компании</h2>
                    <MyCompanies/>
                    <button onClick={() => navigate('/companies/add')}>
                        Добавить компанию
                    </button>                </article>
                <article>
                    <h2>Сборы средств</h2>
                    <MyCampaign/>
                    <button onClick={() => navigate('/campaigns/add')}>Создать сбор</button>
                </article>
            </section>}
        </section>
                </div>
            </div>
            </>
    );
}

export default Profile;
