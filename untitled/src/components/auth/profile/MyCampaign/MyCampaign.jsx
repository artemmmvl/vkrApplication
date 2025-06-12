import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./MyCampaigns.module.css";

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;
    const token = useSelector(state => state.auth.token);

    const fetchCampaign = async () => {
        try {
            const response = await axios.get(serverUrl + '/api/campaigns/me', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setCampaigns(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaign();
    }, [serverUrl, token]);

    if (loading) return <p>Загрузка...</p>;

    if (campaigns.length === 0) {
        return (
            <section className={styles.campaigns}>
                <p>Нет активных сборов.</p>
            </section>
        );
    }

    return (
        <section className={styles.campaigns}>
            <div className={styles.campaignList}>
                {campaigns.map(c => (
                    <div className={styles.campaignCard} key={c.id}>
                        <img src={serverUrl + c.imageUrl} alt={c.title} className={styles.image} />
                        <div className={styles.campaignInfo}>
                            <h3>{c.title}</h3>
                            <p>Цель: {c.goalAmount} ETH</p>
                            <p>Собрано: {c.collectedAmount || 0} ETH</p>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progress}
                                    style={{ width: `${((c.collectedAmount || 0) / c.goalAmount) * 100}%` }}
                                ></div>
                            </div>
                            <p className={styles.dateRange}>
                                Срок: {formatDate(c.startDate)} — {formatDate(c.endDate)}
                            </p>
                            <a href={`/campaigns/${c.id}`} className={styles.detailsButton}>Подробнее</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString("ru-RU");
};

export default CampaignList;
