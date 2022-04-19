const e = require('express');
const express = require('express');
const router = express.Router();
const db = require('../db');
const Days = require('../models/days')
const Users = require('../models/users')

router.post('/', async (req, res) => {
    let {usernames, bolsas} = req.body;
    let kg = 0;
    let today = new Date();
    for (let i=0; i < bolsas.length; i++) {
        kg += bolsas[i];
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

    let kgPorPersona = Math.ceil(kg / usernames.length)
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