import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Преврати идею в реальность с FundFlow</h1>
                <p>Поддержи проекты, которые тебе близки. Создавай кампании. Присоединяйся к будущему краудфандинга.</p>
                <a href="/campaigns" className="hero-button">Посмотреть кампании</a>
            </div>
        </section>
    );
};

export default HeroSection;
