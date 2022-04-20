const express = require('express');
const router = express.Router();
const db = require('../db');
const Users = require('../models/users')

router.post('/', async (req, res) => {
    let {username} = req.body;
    try {
        let user = await Users.create({
            username,
            kg : 0
        })
        res.send(`${username} registrado correctamente`);
    }
    catch(err){
        console.log(err);
        // res.sendStatus(500).send(err);
    }
})

module.exports = router;