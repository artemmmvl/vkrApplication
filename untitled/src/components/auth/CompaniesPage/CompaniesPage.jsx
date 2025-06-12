import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./CompaniesPage.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import Header from "../mainPage/header/Header";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const token = useSelector(state => state.auth.token);
    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;
    const [likedCompanies, setLikedCompanies] = useState(new Set());
    const userId = useSelector((state) => state.auth.id);


    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) return;
            try {
                const res = await axios.get(`${serverUrl}/api/favorite-companies/${userId}`);
                const likedIds = new Set(res.data.map(c => c.companyId));
                setLikedCompanies(likedIds);
            } catch (err) {
                console.error("Ошибка при получении избранных компаний:", err);
            }
        };

        fetchFavorites();
    }, [userId]);

    const toggleFavoriteCompany = async (companyId) => {
        if (!userId) {
            toast.error("Чтобы ставить лайки, необходимо войти в аккаунт.");
            return;
        }

        try {
            if (likedCompanies.has(companyId)) {
                await axios.delete(`${serverUrl}/api/favorite-companies/${userId}/${companyId}`);
                setLikedCompanies(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(companyId);
                    return newSet;
                });
            } else {
                await axios.post(`${serverUrl}/api/favorite-companies/${userId}/${companyId}`);
                setLikedCompanies(prev => new Set(prev).add(companyId));
            }
        } catch (err) {
            console.error("Ошибка при изменении избранного:", err);
        }
    };


    useEffect(() => {
        const fetchAll = async () => {
            try {
                const response = await axios.get(serverUrl + "/api/companies", {
                    headers: { Authorization: "Bearer " + token }
                });
                setCompanies(response.data);
            } catch (err) {
                console.error("Ошибка загрузки компаний:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [serverUrl, token]);

    const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className={styles.pageContainer}>
                <h1>Компании</h1>

                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />

                {loading ? (
                    <p className={styles.loading}>Загрузка...</p>
                ) : (
                    <div className={styles.companyList}>
                        {filtered.map((company) => (
                            <div key={company.companyId} className={styles.companyCard}>
                                <div className={styles.cardImageWrapper}>


                                    <img
                                        src={serverUrl + company.logoPath}
                                        alt={company.name}
                                        className={styles.companyImage}
                                    />
                                    <button
                                        onClick={() => toggleFavoriteCompany(company.companyId)}
                                        className={`${styles.likeButton} ${likedCompanies.has(company.companyId) ? styles.active : ""}`}
                                        title={likedCompanies.has(company.companyId) ? "Убрать из избранного" : "Добавить в избранное"}
                                    >
                                        {likedCompanies.has(company.companyId) ? <FaHeart /> : <FaRegHeart />}{company.likeCount}
                                    </button>
                                </div>
                                <div className={styles.info}>
                                    <h3>{company.name}</h3>
                                    <Link to={`/companies/${company.companyId}`} className={styles.detailsButton}>
                                        Подробнее
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default CompaniesPage;
