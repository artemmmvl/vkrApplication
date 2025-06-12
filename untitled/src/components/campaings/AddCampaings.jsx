import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import classes from './CreateCampaignForm.module.css';

const CreateCampaignForm = () => {
    const token = useSelector(state => state.auth.token);
    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [campaignTypeId, setCampaignTypeId] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [image, setImage] = useState(null);
    const [types, setTypes] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Подтянуть доступные типы кампаний и компании
        const fetchData = async () => {
            try {
                const [typeRes, companyRes] = await Promise.all([
                    axios.get(`${serverUrl}/api/campaign-types`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${serverUrl}/api/companies`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setTypes(typeRes.data);
                setCompanies(companyRes.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [serverUrl, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('goalAmount', goalAmount);
        formData.append('startDate', new Date(startDate).getTime());
        formData.append('endDate', new Date(endDate).getTime());
        formData.append('campaignType', campaignTypeId);
        formData.append('companyId', companyId);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post(`${serverUrl}/api/campaigns`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Кампания успешно создана!');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Ошибка при создании кампании');
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.container_form}>
                <h2 className={classes.title}>Создание кампании</h2>
                <form onSubmit={handleSubmit} className={classes.form} encType="multipart/form-data">
                    <label>Название *</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <label>Описание</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" />

                    <label>Целевая сумма (ETH) *</label>
                    <input type="number" step="0.01" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} required />

                    <label>Дата начала *</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

                    <label>Дата окончания *</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

                    <label>Тип кампании *</label>
                    <select value={campaignTypeId} onChange={(e) => setCampaignTypeId(e.target.value)} required>
                        <option value="">Выберите тип</option>
                        {types.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>

                    <label>Компания *</label>
                    <select value={companyId} onChange={(e) => setCompanyId(e.target.value)} required>
                        <option value="">Выберите компанию</option>
                        {companies.map(company => (
                            <option key={company.companyId} value={company.companyId}>{company.name}</option>
                        ))}
                    </select>

                    <label>Изображение</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                    <button type="submit">Создать кампанию</button>

                    {message && <p style={{ marginTop: '10px', color: '#e53e3e' }}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateCampaignForm;
