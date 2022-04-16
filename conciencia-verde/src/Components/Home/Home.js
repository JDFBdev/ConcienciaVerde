import React, { useState } from 'react';
import s from './Home.module.css';
import logo from '../../img/logo.png';
import circle from '../../img/circle.png';
import CountUp from 'react-countup';
import { useModal } from 'react-hooks-use-modal';
import Transition from '../Transition/Transition';
import { BsXSquareFill } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";

export default function Home(){
    const [fachas, setFachas] = useState([{name: 'Maga', kg: 22},{name: 'Juan', kg: 16},{name: 'Santi', kg: 47},{name: 'Fran', kg: 469}]);
    const [selected, setSelected] = useState(0);
    const [newFacha, setNewFacha] = useState('');
    const Navigate = useNavigate();

    const [ModalFacha, openFacha, closeFacha] = useModal('root', {preventScroll: true,closeOnOverlayClick: true});
    const [ModalNew, openNew, closeNew] = useModal('root', {preventScroll: true, closeOnOverlayClick: true});

    const handleDate = function(){
        let today = new Date();
        return today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    }

    const handleSubmit = function(e){
        e.preventDefault();
        setFachas(prev=> [...prev, {name: newFacha, kg: 0}]);
        closeNew();
        toast.success(`${newFacha} agregadx`);
        setNewFacha('');
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
                                <CountUp duration={3} useEasing={true} className={s.counter} end={69} />
                            </div>
                            <p className={s.statsLabel}>Bolsas de basura desechadas</p>
                        </div>
                        <div className={s.kg}>
                            <div className={s.circleBags} style={{backgroundImage: `url(${circle})`}}>
                                <CountUp duration={3} useEasing={true} className={s.counter} end={420} />
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
                                    <div className={s.facha} onClick={()=>{setSelected(i); openFacha();}} key={f.name}>
                                        <p className={s.fachaName}>{f.name}</p>
                                        <p className={s.fachaKg}>{f.kg} Kg</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className={s.newFacha} onClick={openNew} >New Facha</button>
                </div>

                <div className={s.diaContainer}>
                    <h3 className={s.diaTitle}>Nuevo Día</h3>
                    <p className={s.date}>{handleDate()}</p>
                    <button className={s.newDia} onClick={()=>Navigate("/NewDay")}>Crear</button>
                </div>

            </div>

            <ModalFacha>
                <Transition>
                    <div className={s.modalContainer}>
                        <div className={s.buttonContainer}>
                            <BsXSquareFill className={s.closeModal} onClick={closeFacha}/>
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
            </ModalFacha>

            <ModalNew>
                <Transition>
                    <div className={s.modalContainer}>
                        <div className={s.newFachaData}>
                            <h3 className={s.newFachaTitle}>Nuevo Facha</h3>
                            <form className={s.form} onSubmit={handleSubmit}>
                                <input className={s.newFachaInput} placeholder='Nombre...' onChange={(e)=>setNewFacha(e.target.value)} />
                                <button className={s.newFachaBtn} type='submit' >Agregar</button>
                            </form>
                        </div>
                    </div>
                </Transition>
            </ModalNew>

        </div>
    )
}