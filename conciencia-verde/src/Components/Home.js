import React from 'react';
import s from './Home.module.css';
import logo from '../img/logo.png';
import circle from '../img/circle.png';
import CountUp from 'react-countup';

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
                    <h3 className={s.statsTitle}>Estadisticas</h3>
                    <div className={s.statsData}>
                        <div className={s.bags}>
                            <div className={s.circleBags} style={{backgroundImage: `url(${circle})`}}>
                                <CountUp duration={4} useEasing={true} className={s.counter} end={69} />
                            </div>
                            <p className={s.statsLabel}>Bolsas de basura desechadas</p>
                        </div>
                        <div className={s.kg}>
                            <div className={s.circleBags} style={{backgroundImage: `url(${circle})`}}>
                                <CountUp duration={4} useEasing={true} className={s.counter} end={420} />
                            </div>
                            <p className={s.statsLabel}>Kilos de basura sacados del mar</p>
                        </div>
                    </div>
                </div>

                <div className={s.fachasContainer}>
                    <h3 className={s.statsTitle}>Fachas</h3>
                </div>

            </div>

        </div>
    )
}