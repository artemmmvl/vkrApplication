// src/components/HowItWorks.js
import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works">
            <h2>Как работает FundFlow?</h2>
            <div className="steps">
                <div className="step">
                    <h3>1. Зарегистрируйтесь</h3>
                    <p>Создайте аккаунт и пройдите верификацию личности.</p>
                </div>
                <div className="step">
                    <h3>2. Создайте сбор средств</h3>
                    <p>Опишите свой проект, укажите цель и начните сбор средств.</p>
                </div>
                <div className="step">
                    <h3>3. Получайте поддержку</h3>
                    <p>Пользователи делают пожертвования напрямую.</p>
                </div>
                <div className="step">
                    <h3>4. Выводите средства</h3>
                    <p>Когда сбор завершён, вы можете вывести ETH на свой кошелёк.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
