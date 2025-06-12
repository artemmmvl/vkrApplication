import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CampaignsPage.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../mainPage/header/Header";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {toast} from "react-toastify";


const CampaignsPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [campaignsType, setCampaignsType] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("popular");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("active");
    const [loading, setLoading] = useState(true);

    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;
    const userId = useSelector((state) => state.auth.id);
    const [likedCampaignIds, setLikedCampaignIds] = useState(new Set());

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (!userId) return;
                const res = await axios.get(`${serverUrl}/api/favorite-campaigns/${userId}`);
                const likedIds = new Set(res.data.map(c => c.campaignId)); // используем Set для быстрой проверки
                setLikedCampaignIds(likedIds);
            } catch (e) {
                console.error("Ошибка получения избранного:", e);
            }
        };
        fetchFavorites();
    }, [userId, campaigns]);

    const toggleFavorite = async (campaignId) => {
        if (!userId) {
            toast.error("Чтобы ставить лайки, необходимо войти в аккаунт.");
            return;
        }

        try {
            setCampaigns(prevCampaigns =>
                prevCampaigns.map(c => {
                    if (c.id !== campaignId) return c;

                    const updatedLikeCount = likedCampaignIds.has(campaignId)
                        ? (c.likeCount || 1) - 1
                        : (c.likeCount || 0) + 1;

                    return {
                        ...c,
                        likeCount: updatedLikeCount
                    };
                })
            );

            if (likedCampaignIds.has(campaignId)) {
                await axios.delete(`${serverUrl}/api/favorite-campaigns/${userId}/${campaignId}`);
                setLikedCampaignIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(campaignId);
                    return newSet;
                });
            } else {
                await axios.post(`${serverUrl}/api/favorite-campaigns/${userId}/${campaignId}`);
                setLikedCampaignIds(prev => new Set(prev).add(campaignId));
            }
        } catch (e) {
            toast.error("Ошибка при выполнении операции. Попробуйте позже.");
            console.error("Ошибка при лайке/анлайке:", e);
        }
    };
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get(serverUrl + "/api/campaigns");
                setCampaigns(response.data);
            } catch (err) {
                console.error("Ошибка при загрузке:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, [serverUrl]);

    useEffect(() => {
        const fetchCampaignsType = async () => {
            try {
                const response = await axios.get(serverUrl + "/api/campaign-types");
                setCampaignsType(response.data);
            } catch (err) {
                console.error("Ошибка при загрузке:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaignsType();
    }, [serverUrl]);

    const filteredCampaigns = campaigns
        .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(c => {
            const now = Date.now();
            const start = Number(c.startDate);
            const end = Number(c.endDate);
            if (statusFilter === "active") return now >= start && now <= end;
            if (statusFilter === "upcoming") return now < start;
            if (statusFilter === "finished") return now > end;
            return true;
        })
        .filter(c => {
            if (typeFilter === "all") return true;
            return c.campaignType == typeFilter;
        })
        .sort((a, b) => {
            switch (sortOption) {
                case "newest":
                    return b.startDate - a.startDate;
                case "oldest":
                    return a.startDate - b.startDate;
                case "amountAsc":
                    return a.collectedAmount - b.collectedAmount;
                case "amountDesc":
                    return b.collectedAmount - a.collectedAmount;
                case "popular":
                    return (b.likeCount || 0) - (a.likeCount || 0); // предполагается поле likes
                default:
                    return 0;
            }
        });

    if (loading) return <p className={styles.loading}>Загрузка...</p>;

    return (
        <>
            <Header />
            <div className={styles.pageContainer}>
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInputFull}
                />
                <div className={styles.filtersRow}>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className={styles.select}>

                        <option value="popular">По популярности</option>
                        <option value="newest">Сначала новые</option>
                        <option value="oldest">Сначала старые</option>
                        <option value="amountAsc">По возрастанию суммы</option>
                        <option value="amountDesc">По убыванию суммы</option>
                    </select>

                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={styles.select}>
                       <option value="all">Все типы кампаний</option>
                        {campaignsType.map(c=><option value={c.id}>{c.name}</option>)}


                    </select>

                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.select}>
                        <option value="active">Активные</option>
                        <option value="upcoming">Будущие</option>
                        <option value="finished">Завершённые</option>
                    </select>
                </div>

                <div className={styles.campaignList}>
                    {filteredCampaigns.map(c => (
                        <div className={styles.campaignCard} key={c.id}>
                            <div className={styles.cardImageWrapper}>
                                <img src={serverUrl + c.imageUrl} alt={c.title} className={styles.image} />
                                <button
                                    className={`${styles.likeButton} ${likedCampaignIds.has(c.id) ? styles.active : ""}`}
                                    onClick={() => toggleFavorite(c.id)}
                                    title={c.isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                                >
                                    {c.isFavorite ? <FaHeart /> : <FaRegHeart />} {c.likeCount}
                                </button>
                            </div>
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
                                <Link to={`/campaigns/${c.id}`} className={styles.detailsButton}>
                                    Подробнее
                                </Link>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
};

const formatDate = timestamp => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString("ru-RU");
};

export default CampaignsPage;
