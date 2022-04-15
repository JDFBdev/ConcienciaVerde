import React, { useState } from 'react';
import s from './Home.module.css';
import logo from '../img/logo.png';
import circle from '../img/circle.png';
import CountUp from 'react-countup';
import { useModal } from 'react-hooks-use-modal';
import Transition from './Transition/Transition';

export default function Home(){
    const [fachas, setFachas] = useState([{name: 'Maga', kg: 22},{name: 'Juan', kg: 16},{name: 'Santi', kg: 47},{name: 'Fran', kg: 469}]);
    const [selected, setSelected] = useState(0);
    const [Modal, open, close] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true
    });

    const handleDate = function(){
        let today = new Date();
        return today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    }
    
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
                    <h3 className={s.fachasTitle}>Fachas</h3>
                    <div className={s.fachas}>
                        {
                            fachas?.map((f,i) => {
                                return (
                                    <div className={s.facha} onClick={()=>{setSelected(i); open();}}>
                                        <p className={s.fachaName}>{f.name}</p>
                                        <p className={s.fachaKg}>{f.kg} Kg</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className={s.newFacha}>New Facha</button>
                </div>

                <div className={s.diaContainer}>
                    <h3 className={s.diaTitle}>Nuevo Día</h3>
                    <p className={s.date}>{handleDate()}</p>
                    <button className={s.newDia}>Crear</button>
                </div>

            </div>

            <Modal>
                <Transition>
                    <div className={s.modalContainer}>
                        <div className={s.buttonContainer}>
                            <button className={s.closeModal} onClick={close}>X</button>
                        </div>

                        <div className={s.fachaInfo}>
                            <div className={s.circleName}>
                                    {fachas[selected].name.charAt(0).toUpperCase()}
                            </div>
                            <div className={s.fachaTitleContainer}>
                                <p className={s.fachaTitle}>{fachas[selected].name}</p>
                            </div>
                        </div>
                        <p className={s.fachaTotal}>Total: {fachas[selected].kg} Kg</p>
                        <button className={s.editBtn}>Editar Foto</button>
                    </div>
                </Transition>
            </Modal>

        </div>
    )
}