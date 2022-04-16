import React, {useState} from 'react';
import s from './NewDay.module.css';
import { BsXSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';

export default function NewDay(){
    const [fachas, setFachas] = useState({all: [{name: 'Maga', kg: 22},{name: 'Juan', kg: 16},{name: 'Santi', kg: 47},{name: 'Fran', kg: 469}], hoy: []});
    const [bolsas, setBolsas] = useState([])
    const [newBolsa, setNewBolsa] = useState('');
    const [selected, setSelected] = useState({})

    const [Modal, open, close] = useModal('root', {preventScroll: true, closeOnOverlayClick: true});

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
        if (newBolsa){
            setBolsas(prev=>([...prev, newBolsa]))
            setNewBolsa('');
        }
    }

    const deleteBolsa = function(){
        setBolsas((prev)=>
            prev.filter((b,index)=>{
                return index !== selected.id-1;
            })
        )
        close();
    }

    const handleDate = function(){
        let today = new Date();
        return today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    }

    const handleKg = function(){
        let total = 0;
        for(let i = 0;  i < bolsas?.length; i++){
            total = Number(total) + Number(bolsas[i]);
        }
        return total;
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

                <Transition>
                    <div className={s.fachasContainer}>
                        <h3 className={s.fachasTitle}>Fachas</h3>
                        <div className={s.fachas}>
                            {
                                fachas.all?.map((f,i) => {
                                    return (
                                        <Transition key={f.name}>
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
                                        <Transition key={f.name}>
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
                </Transition>

                <Transition timeout={100}>
                    <div className={s.bolsasContainer}>
                        <h3 className={s.bolsasTitle}>Bolsas</h3>
                        <div className={s.bolsas}>
                            {
                                bolsas?.map((f,i) => {
                                    return (
                                        <Transition key={f}>
                                            <div className={s.bolsa} onClick={()=>{ setSelected({id: i+1 , kg: f}); open();}}  >
                                                <p className={s.bolsaName}>Bolsa {i+1}</p>
                                                <p className={s.bolsaName}>{f}</p>
                                            </div>
                                        </Transition>
                                    )
                                })
                            }
                            <div className={s.bolsaForm}>
                                <form className={s.form} onSubmit={handleSubmit}>
                                    <div className={s.newBolsaDiv}>
                                        <p className={s.bolsaName}>Bolsa {bolsas?.length+1}</p>
                                        <input className={s.bolsaInput} onChange={handleBolsa} value={newBolsa} type='number'/>
                                    </div>
                                    <button className={s.bolsaBtn}>Agregar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Transition>

                <Transition timeout={200}>
                    <div className={s.resumenContainer}>
                        <h3 className={s.resumenTitle}>Resumen</h3>
                        <p className={s.data}>{handleDate()}</p>
                        <p className={s.data}>{fachas.hoy.length} Fachas</p>
                        <p className={s.data}>{bolsas?.length} Bolsas</p>
                        <p className={s.data}>Total: {handleKg()} Kg</p>
                        <button className={ (fachas.hoy.length && bolsas.length) ? s.confirmBtn : s.confirmBtnError}>Confirmar</button>
                    </div>
                </Transition>

            </div>

            <Modal>
                <Transition>
                    <div className={s.modalContainer}>
                        <h3 className={s.deleteBolsaTitle}>Bolsa {selected.id}</h3>
                        <p className={s.data}>{selected.kg} Kg</p>
                        <button className={s.deleteBolsaBtn} onClick={deleteBolsa} >Borrar</button>
                    </div>
                </Transition>
            </Modal>

        </div>
    )
}