import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./MyDonations.module.css";
import AsideMenu from "../AsideMenu";
import Header from "../../mainPage/header/Header";
import {useNavigate} from "react-router-dom";

const MyDonations = () => {
    const userId = useSelector((state) => state.auth.id);
    const token = useSelector((state) => state.auth.token);
    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;
    const navigate=useNavigate()
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/donations/user/${userId}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setDonations(res.data);
            } catch (err) {
                console.error("Ошибка при загрузке пожертвований:", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchDonations();
    }, [serverUrl, userId, token]);

    if (loading) return <div className={styles.centered}>Загрузка...</div>;

    if (donations.length === 0)


    return (<>

        <Header />
        <div className={styles.pageWrapper}>

            <div className={styles.pageLayout}>


            <AsideMenu active="donations"/>
                {donations.length === 0 ? <div className={styles.emptyBlock}>
                        <p className={styles.emptyText}>У вас пока нет пожертвований.</p>
                        <button className={styles.linkButton} onClick={() => navigate('/campaigns')}>
                            Перейти к списку сборов
                        </button>
                    </div>:
                    <main className={styles.content}>
                    <h2>Мои пожертвования</h2>

                    <div className={styles.donationList}>
                {donations.map((d) => (
                    <div className={styles.card} key={d.donationId}>
                    <div className={styles.cardHeader}>
                    <img
                    src={serverUrl + d.campaignImageUrl}
                    alt={d.campaignTitle}
                    className={styles.image}
                    />
                    <div>
                    <h3>{d.campaignTitle}</h3>
                    <p className={styles.status}>
                    Статус:{" "}
                    <span className={styles[`status_${d.status.toLowerCase()}`]}>
                {d.status}
                    </span>
                    </p>
                    </div>
                    </div>

                    <div className={styles.cardBody}>
                    <p><strong>Сумма:</strong> {d.amount} ETH</p>
                    <p><strong>Дата:</strong> {new Date(d.donationDate).toLocaleString("ru-RU")}</p>
                    </div>
                    </div>
                    ))}
                    </div>


                    </main>
                }
            </div>
        </div>
        </>
    );
};

export default MyDonations;
