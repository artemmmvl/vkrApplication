import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AllCampaigns.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const response = await axios.get(serverUrl + "/api/campaigns", {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setCampaigns(response.data);
            } catch (err) {
                console.error("Ошибка получения кампаний:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [serverUrl, token]);

    if (loading) return <p className={styles.loading}>Загрузка сборов...</p>;

    const limited = campaigns.slice(0, 4);

    return (
        <section className={styles.campaigns}>
            <h2>Популярные сборы</h2>
            <div className={styles.campaignList}>
                {limited.map(c => (
                    <div className={styles.campaignCard} key={c.id}>
                        <img src={serverUrl + c.imageUrl} alt={c.title} className={styles.image} />
                        <div className={styles.campaignInfo}>
                            <h3>{c.title}</h3>
                            <p>Цель: {c.goalAmount} ETH</p>
                            <p>Собрано: {c.collectedAmount || 0} ETH</p>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progress}
                                    style={{
                                        width: `${((c.collectedAmount || 0) / c.goalAmount) * 100}%`
                                    }}
                                ></div>
                            </div>
                            <p className={styles.dateRange}>
                                Срок: {formatDate(c.startDate)} — {formatDate(c.endDate)}
                            </p>
                            <Link to={`/campaigns/${c.id}`} className={styles.detailsButton}>
                                Подробнее
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {campaigns.length > 4 && (
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <Link to="/campaigns" className={styles.detailsButton}>
                        Смотреть все
                    </Link>
                </div>
            )}
        </section>
    );
};

const formatDate = timestamp => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString("ru-RU");
};

export default AllCampaigns;
