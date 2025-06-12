import React from "react";
import classes from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

const AsideMenu = (props) => {
    const navigate = useNavigate();

    return (
        <aside className={classes.sidebar}>
            <h3 className={classes.menuTitle}>Меню</h3>
            <button onClick={() => navigate('/profile')}
                    className={`${classes.menuItem} ${props.active === 'profile' ? classes.activeMenu : ''}`}
                    > Профиль</button>
            <button onClick={() => navigate('/favorites')}
                    className={`${classes.menuItem} ${props.active === 'favorites' ? classes.activeMenu : ''}`}
            > Избранные</button>
            <button onClick={() => navigate('/donations')}
                    className={`${classes.menuItem} ${props.active === 'donations' ? classes.activeMenu : ''}`}
            >Пожертвования</button>
            <button
                onClick={() => {
                    localStorage.clear();
                    navigate('/');
                }}
                className={classes.menuItem}
            > Выйти</button>
        </aside>
    )
}

export default AsideMenu;