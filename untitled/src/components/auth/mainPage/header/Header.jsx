import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { FaUserCircle } from "react-icons/fa";


const Header = () => {
    return (
        <header className="site-header">
            <div className="logo">
                <Link to="/">FundFlow</Link>
            </div>
            <nav className="nav-links">
                <Link to="/campaigns">Сборы средств</Link>
                <Link to="/companies">Компании</Link>
                <Link to="/about">О проекте</Link>
                <Link to="/contact">Контакты</Link>
                <Link to="/profile" className="profile-icon" aria-label="Профиль">
                    <FaUserCircle size={24} />
                </Link>
            </nav>
        </header>

    );
};

export default Header;
