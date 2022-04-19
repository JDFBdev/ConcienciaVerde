import React, { useEffect, useState } from 'react';
import s from './Home.module.css';
import logo from '../../img/logo.png';
import circle from '../../img/circle.png';
import CountUp from 'react-countup';
import { useModal } from 'react-hooks-use-modal';
import Transition from '../Transition/Transition';
import { BsXSquareFill } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import axios from 'axios';

export default function Home({show}){
    const [fachas, setFachas] = useState([{username: '', kg: 0}]);
    const [selected, setSelected] = useState(0);
    const [newFacha, setNewFacha] = useState('');
    const Navigate = useNavigate();

    const [ModalFacha, openFacha, closeFacha] = useModal('root', {preventScroll: true,closeOnOverlayClick: true});
    const [ModalNew, openNew, closeNew] = useModal('root', {preventScroll: true, closeOnOverlayClick: true});

    useEffect(()=>{
        let fetchData = async function(){
            let promesa = await axios.get('http://localhost:3001/allUsers')
            let promesa2 = await axios.get('http://localhost:3001/allUsers')
            setFachas(promesa.data);
        }
        fetchData();
    },[])

    const handleDate = function(){
        let today = new Date();
        return today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    }

    const handleSubmit = function(e){
        e.preventDefault();

        let postData = async function(){
            let promesa = await axios.post('http://localhost:3001/createUser',
                {
                    username: newFacha,
                    kg: 0
                }
            )
            .then(toast.success(`${newFacha} agregadx`))
            .catch(e=>{
                toast.error(`Error al agregar a ${newFacha}`);
            })
        }
        postData();
        closeNew();
        setNewFacha('');
    }
    
    return(
        <div className={s.container} style={{display: show ? 'none' : ""}}>

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

                <Transition timeout={show ? 3100 : 0}>
                    <div className={s.stats}>
                        <h3 className={s.statsTitle}>Estadisticas</h3>
                        <div className={s.statsData}>
                            <div className={s.bags}>
                                <div className={s.circleBags} style={{backgroundImage: `url(${circle})`}}>
                                    <CountUp duration={3} useEasing={true} className={s.counter} end={69} delay={show ? 3 : 0} />
                                </div>
                                <p className={s.statsLabel}>Bolsas de basura desechadas</p>
                            </div>
                            <div className={s.kg}>
                                <div className={s.circleBags} style={{backgroundImage: `url(${circle})`}}>
                                    <CountUp duration={3} useEasing={true} className={s.counter} end={420} delay={show ? 3 : 0} />
                                </div>
                                <p className={s.statsLabel}>Kilos de basura sacados del mar</p>
                            </div>
                        </div>
                    </div>
                </Transition>

                <Transition timeout={show ? 3200 : 0}>
                    <div className={s.fachasContainer}>
                        <h3 className={s.fachasTitle}>Fachas</h3>
                        <div className={s.fachas}>
                            {
                                fachas?.map((f,i) => {
                                    return (
                                        <div className={s.facha} onClick={()=>{setSelected(i); openFacha();}} key={f.username}>
                                            <p className={s.fachaName}>{f.username}</p>
                                            <p className={s.fachaKg}>{f.kg} Kg</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className={s.newFacha} onClick={openNew} >New Facha</button>
                    </div>
                </Transition>

                <Transition timeout={show ? 3300 : 0}>
                    <div className={s.diaContainer}>
                        <h3 className={s.diaTitle}>Nuevo Día</h3>
                        <p className={s.date}>{handleDate()}</p>
                        <button className={s.newDia} onClick={()=>Navigate("/NewDay")}>Crear</button>
                    </div>
                </Transition>

            </div>

            <ModalFacha>
                <Transition>
                    <div className={s.modalContainer}>
                        <div className={s.buttonContainer}>
                            <BsXSquareFill className={s.closeModal} onClick={closeFacha}/>
                        </div>

                        <div className={s.fachaInfo}>
                            <div className={s.circleName}>
                                    {fachas[selected]?.username.charAt(0).toUpperCase()}
                            </div>
                            <div className={s.fachaTitleContainer}>
                                <p className={s.fachaTitle}>{fachas[selected].username}</p>
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