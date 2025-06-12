import React from "react";
import Header from "../../mainPage/header/Header";
import styles from "./FavoritesPage.module.css";
import AsideMenu from "../AsideMenu";
import FavoriteCampaigns from "./Favorites";

const FavoritesPage = () => {
    return (
        <>
            <Header />
            <div className={styles.pageWrapper}>
                <div className={styles.pageLayout}>
                    <AsideMenu active="favorites"/>
                    <div className={styles.content}>
                        <FavoriteCampaigns />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavoritesPage;
