const e = require('express');
const express = require('express');
const router = express.Router();
const db = require('../db');
const Days = require('../models/days')
const Users = require('../models/users')

router.post('/', async (req, res) => {
    let {usernames, bolsas, kgTotal, kgPersona} = req.body;
    let today = new Date();
    let kg = 0;
    
    for (let i=0; i < bolsas.length; i++) {
        kg += bolsas[i];
    }

    let kgPorPersona = Math.round(kg / usernames.length)

    if ((Number(kg) !== Number(kgTotal)) || (Number(kgPorPersona) !== Number(kgPersona))) {
        console.log(kg, kgTotal, kgPersona, kgPorPersona);
        return res.sendStatus(500).send({message: "Error registrando nuevo dia"});
    }
    
    try {
        let day = await Days.create({
            users : usernames.length,
            bolsas : bolsas.length,
            kg,
            fecha : today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
        })
    }
    catch(err){
        console.log(err);
        res.sendStatus(500).send({message: "Error registrando nuevo dia"});
    }

    let fachas = []
    try {
        fachas = await Users.findAll({
            where: {
                username: usernames
            }
        })
    }
    catch(err){
        console.log(err);
    }
    let promesas = [];
    fachas.forEach(facha => {
        promesas.push(
            Users.update(
                {kg: facha.kg + kgPorPersona},
                {where: {id : facha.id}}
            )
        )
    });
    await Promise.all(promesas).catch((e) => {console.log(e)});
    
    res.send(`${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()} registrado correctamente`);
})

module.exports = router;