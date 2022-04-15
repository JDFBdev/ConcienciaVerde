import React, {useState} from 'react';
import s from './NewDay.module.css';
import { BsXSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import Transition from '../Transition/Transition';

export default function NewDay(){
    const [fachas, setFachas] = useState({all: [{name: 'Maga', kg: 22},{name: 'Juan', kg: 16},{name: 'Santi', kg: 47},{name: 'Fran', kg: 469}], hoy: []});
    const [bolsas, setBolsas] = useState([])
    const [newBolsa, setNewBolsa] = useState(0);

    const addFacha = function(i){

        setFachas((prev)=>({
            hoy: [...prev.hoy, prev.all[i]],
            all: prev.all.filter((f,index)=>{
                return index !== i;
            })
        }))

    }

    const removeFacha = function(i){
        setFachas((prev)=>({
            all: [...prev.all, prev.hoy[i]],
            hoy: prev.hoy.filter((f,index)=>{
                return index !== i;
            })
        }))
    }

    const handleBolsa = function(e){
        setNewBolsa(e.target.value);
    }

    const handleSubmit = function(e){
        e.preventDefault();
        setBolsas(prev=>([...prev, newBolsa]))
    }

    return(
        <div className={s.container}>

            <div className={s.banner}>
                <div className={s.circle1}/>
                <div className={s.circle2}/>
                <div className={s.header}>
                    <div className={s.appTitleContainer}>
                        <h3 className={s.appTitle}>Nuevo Día</h3>
                    </div>
                </div>
            </div>

            <div className={s.dataContainer}>

                <div className={s.fachasContainer}>
                    <h3 className={s.fachasTitle}>Fachas</h3>
                    <div className={s.fachas}>
                        {
                            fachas.all?.map((f,i) => {
                                return (
                                    <Transition>
                                        <div className={s.facha} >
                                            <p className={s.fachaName}>{f.name}</p>
                                            <BsPlusSquareFill className={s.addFacha} onClick={()=>addFacha(i)}/>
                                        </div>
                                    </Transition>
                                )
                            })
                        }
                        <div className={s.line} />
                        <h3 className={s.fachasTitle}>Fachas Hoy</h3>
                        {
                            fachas.hoy?.map((f,i) => {
                                return (
                                    <Transition>
                                        <div className={s.facha} >
                                            <p className={s.fachaName}>{f.name}</p>
                                            <BsXSquareFill className={s.removeFacha} onClick={()=>removeFacha(i)}/>
                                        </div>
                                    </Transition>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={s.bolsasContainer}>
                    <h3 className={s.bolsasTitle}>Bolsas</h3>
                    <div className={s.bolsas}>
                        {
                            bolsas?.map((f,i) => {
                                return (
                                    <Transition>
                                        <div className={s.bolsa} >
                                            <p className={s.bolsaName}>Bolsa {i+1}</p>
                                            <p className={s.bolsaName}>{f}</p>
                                        </div>
                                    </Transition>
                                )
                            })
                        }
                        <div className={s.bolsa}>
                            <form className={s.form} onSubmit={handleSubmit}>
                                <div className={s.newBolsaDiv}>
                                    <p className={s.bolsaName}>Bolsa {bolsas.length+1}</p>
                                    <input className={s.bolsaInput} onChange={handleBolsa} type='number'/>
                                </div>
                                <button className={s.bolsaBtn}>Agregar</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}