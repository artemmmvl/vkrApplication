import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import styles from "./FavoriteCampaigns.module.css";
import {FaHeart} from "react-icons/fa";
import {toast} from "react-toastify";


const FavoriteCampaigns = () => {
    const userId = useSelector(state => state.auth.id);
    const token = useSelector(state => state.auth.token);
    const urlImg=process.env.REACT_APP_SERVER_IMG_MAIN;
    const serverUrl=process.env.REACT_APP_SERVER_URL_MAIN;


    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleRemoveFavorite = async (campaignId) => {
        try {
            await axios.delete(`${serverUrl}/api/favorite-campaigns/${userId}/${campaignId}`, {
                headers: { Authorization: 'Bearer ' + token }
            });
            setFavorites(prev => prev.filter(c => c.campaignId !== campaignId));
            toast.success("Удалено из избранного");

        } catch (err) {
            console.error("Ошибка при удалении из избранного:", err);
        }
    };
    const navigate=useNavigate();
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/favorite-campaigns/${userId}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });
                setFavorites(res.data);
            } catch (err) {
                console.error("Ошибка при загрузке избранного:", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchFavorites();
        }
    }, [serverUrl, token, userId]);

    if (loading) return <p className={styles.loading}>Загрузка избранного...</p>;

    if (favorites.length === 0) {
        return <div className={styles.emptyBlock}>
            <p className={styles.emptyText}>У вас пока нет избраного.</p>
            <button className={styles.linkButton} onClick={() => navigate('/campaigns')}>
                Перейти к списку сборов
            </button>
        </div>;
    }

    return (
        <section className={styles.campaigns}>
            <h2>Избранные кампании</h2>
            <div className={styles.campaignList}>
                {favorites.map(fav => {
                    const c = fav;
                    return (
                        <div className={styles.campaignCard} key={c.id}>
                            <div className={styles.favoriteWrapper}>
                                <button
                                    className={styles.favoriteIcon}
                                    onClick={() => handleRemoveFavorite(c.campaignId)}
                                    title="Убрать из избранного"
                                >
                                    <FaHeart />
                                </button>
                            </div>
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
                                <Link to={`/campaigns/${c.campaignId}`} className={styles.detailsButton}>
                                    Подробнее
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

const formatDate = timestamp => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString("ru-RU");
};

export default FavoriteCampaigns;
