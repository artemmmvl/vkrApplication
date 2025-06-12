import React, { useState } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import classes from './add-companies.module.css';

const CreateCompanyForm = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL_MAIN;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    let token=useSelector(state => state.auth.token)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !photo) {
            setMessage('Название и фото обязательны');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('contactEmail', contactEmail);
        formData.append('website', website);
        formData.append('photo', photo);

        try {
            const response = await axios.post(serverUrl + '/api/companies', formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Компания успешно создана');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Ошибка при создании компании');
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.container_form}>
                <h2>Создание компании</h2>
                <form className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <label>Название *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Описание</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                        />
                    </div>

                    <div>
                        <label>Email для связи</label>
                        <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Веб-сайт</label>
                        <input
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Фото *</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            required
                        />
                    </div>

                    <button type="submit" className={classes.submitButton}>
                        Создать компанию
                    </button>

                    {message && (
                        <div className={classes.message}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateCompanyForm;
