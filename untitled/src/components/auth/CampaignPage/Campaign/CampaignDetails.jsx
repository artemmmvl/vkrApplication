import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../mainPage/header/Header";
import styles from "./CampaignDetails.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Modal from "react-modal";

const CampaignDetails = () => {
    const [donationResponse, setDonationResponse] = useState(null); // второй шаг

    const [timeLeft, setTimeLeft] = useState(3600); // 1 час = 3600 секунд
    useEffect(() => {
        if (!donationResponse) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [donationResponse]);
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    useEffect(() => {
        if (!donationResponse) return;

        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/donations/${donationResponse.id}/status`, {

                });
                console.log(res.data.status)
                if (res.data.status === "COMPLETED") {
                    toast.success("🎉 Пожертвование успешно подтверждено!");
                    setDonationResponse(null); // закрыть модалку если хочешь
                    clearInterval(interval);
                    setModalOpen(false);
                }
            } catch (e) {
                console.error("Ошибка проверки статуса доната:", e);
            }
        }, 60000); // каждая минута

        return () => clearInterval(interval);
    }, [donationResponse]);


    const [isModalOpen, setModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");

    const { id } = useParams();
    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;
    const userId = useSelector((state) => state.auth.id); // предполагается, что пользователь сохранён
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/campaigns/${id}`);
                setCampaign(response.data);
            } catch (err) {
                console.error("Ошибка загрузки кампании:", err);
            } finally {
                setLoading(false);
            }
        };

        const checkFavorite = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/favorite-campaigns/${userId}/${id}/check`);
                setIsFavorite(res.data === true);
            } catch (err) {
                console.error("Ошибка проверки избранного:", err);
            }
        };

        fetchCampaign();
        if (userId) checkFavorite();
    }, [serverUrl, id, userId]);

    const toggleFavorite = async () => {
        try {
            if (!userId) return;

            if (isFavorite) {
                await axios.delete(`${serverUrl}/api/favorite-campaigns/${userId}/${id}`);
            } else {
                await axios.post(`${serverUrl}/api/favorite-campaigns/${userId}/${id}`);
            }
            setIsFavorite((prev) => !prev);
        } catch (err) {
            console.error("Ошибка изменения избранного:", err);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp));
        return date.toLocaleDateString("ru-RU");
    };

    const translateStatus = (status) => {
        switch (status) {
            case "ACTIVE":
                return "Активна";
            case "UPCOMING":
                return "Будущая";
            case "FINISHED":
                return "Завершена";
            default:
                return "Неизвестно";
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <p className={styles.loading}>Загрузка...</p>
            </>
        );
    }

    if (!campaign) {
        return (
            <>
                <Header />
                <p className={styles.error}>Кампания не найдена</p>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={styles.left}>
                        <img
                            src={serverUrl + campaign.imageUrl}
                            alt={campaign.title}
                            className={styles.image}
                        />
                    </div>

                    <div className={styles.right}>
                        <div className={styles.headerRow}>
                            <h1>{campaign.title}</h1>
                            <div className={styles.headerRight}>
                                <span className={`${styles.status} ${styles[campaign.status.toLowerCase()]}`}>
                                    {translateStatus(campaign.status)}
                                </span>
                                <button
                                    onClick={toggleFavorite}
                                    className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
                                    title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                                >
                                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            </div>
                        </div>

                        <p className={styles.description}>{campaign.description}</p>

                        <div className={styles.meta}>
                            <p><strong>Цель:</strong> {campaign.goalAmount} ETH</p>
                            <p><strong>Собрано:</strong> {campaign.collectedAmount || 0} ETH</p>
                            <p><strong>Срок:</strong> {formatDate(campaign.startDate)} — {formatDate(campaign.endDate)}</p>
                        </div>

                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{
                                    width: `${((campaign.collectedAmount || 0) / campaign.goalAmount) * 100}%`
                                }}
                            ></div>
                        </div>

                        <button className={styles.supportButton} onClick={() => setModalOpen(true)}>
                            Поддержать кампанию
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => {
                    setModalOpen(false);
                    setDonationAmount("");
                    setDonationResponse(null);
                }}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                {!donationResponse ? (
                    <>
                        <h2>Введите сумму</h2>
                        <input
                            type="number"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            placeholder="Введите сумму в ETH"
                            className={styles.input}
                        />
                        <button
                            className={styles.confirmButton}
                            onClick={async () => {
                                try {
                                    const res = await axios.post(`${serverUrl}/api/donations`, {
                                        campaignId: campaign.id,
                                        donorId: userId,
                                        amount: parseFloat(donationAmount),
                                        transactionId: `tx_${Date.now()}`
                                    });
                                    setDonationResponse(res.data);
                                } catch (err) {
                                    alert("Ошибка при создании заявки");
                                    console.error(err);
                                }
                            }}
                        >
                            Подтвердить
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className={styles.modalTitle}>Переведите средства</h2>

                        <div className={styles.addressSection}>
                            <p><strong>Адрес для перевода:</strong></p>
                            <div className={styles.copyRow}>
                                <code className={styles.code}>{donationResponse.address}</code>
                                <button
                                    className={styles.copyBtn}
                                    onClick={() => {
                                        navigator.clipboard.writeText(donationResponse.address);
                                        alert("Адрес скопирован");
                                    }}
                                    title="Скопировать адрес"
                                >
                                    📋
                                </button>
                            </div>
                        </div>

                        <p><strong>Сумма:</strong> {donationResponse.amount} ETH</p>

                        <div className={styles.timerBox}>
                            Время на перевод: <strong>{formatTime(timeLeft)}</strong>
                        </div>

                        {timeLeft === 0 && (
                            <p className={styles.expiredWarning}>
                                 Время истекло. Заявка может быть недействительной.
                            </p>
                        )}
                    </>
                )}
            </Modal>
            <ToastContainer position="top-right" autoClose={4000} />

        </>
    );
};

export default CampaignDetails;
