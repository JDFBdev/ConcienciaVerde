import React from 'react';
import s from './Home.module.css';
import logo from '../img/logo.png';

export default function Home(){
    return(
        <div className={s.container}>
            <div className={s.banner}>
                <div className={s.circle1}/>
                <div className={s.circle2}/>
                <div className={s.header}>
                    <img src={logo} alt='Logo' className={s.logo}/>
                    <div className={s.appTitleContainer}>
                        <h3 className={s.appTitle}>Conciencia<br/>Verde</h3>
                    </div>
                </div>
            </div>
            <div className={s.dataContainer}>
                <div className={s.stats}>
                    <h3>Estadisticas</h3>
                </div>
            </div>
        </div>
    )
}