import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiEdit2 } from 'react-icons/fi'; // иконки
import classes from './MyCompanies.module.css';

const MyCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector(state => state.auth.token);
    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;
    const serverUrlImg = process.env.REACT_APP_SERVER_URL_MAIN;

    const navigate = useNavigate();

    const fetchCompanies = async () => {
        try {
            const response = await axios.get(serverUrl + '/api/companies/me', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setCompanies(response.data);
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке компаний');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [serverUrl, token]);

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить компанию?')) return;
        try {
            await axios.delete(`${serverUrl}/api/companies/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setCompanies(prev => prev.filter(company => company.id !== id));
        } catch (err) {
            console.error(err);
            alert('Ошибка при удалении компании');
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div className={classes.wrapper}>

            {companies.length === 0 ? (
                <div className={classes.emptyBlock}>
                    <p>У вас пока нет компаний.</p>

                </div>
            ) : (
                <ul className={classes.companyList}>
                    {companies.map(company => (
                        <li key={company.id} className={classes.companyCard}>
                            <div className={classes.companyRow}>
                                <img
                                    src={`${serverUrlImg}${company.logo_path}`}
                                    alt={company.name}
                                    className={classes.companyImage}
                                />
                                <h3 className={classes.companyName}>{company.name}</h3>

                                <div className={classes.actionButtons}>
                                    <FiEdit2
                                        className={classes.icon}
                                        title="Редактировать"
                                        onClick={() => navigate(`/companies/edit/${company.id}`)}
                                    />
                                    <FiTrash2
                                        className={classes.iconDelete}
                                        title="Удалить"
                                        onClick={() => handleDelete(company.id)}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyCompanies;
