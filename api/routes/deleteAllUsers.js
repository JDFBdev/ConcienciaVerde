const express = require('express');
const router = express.Router();
const db = require('../db');
const Users = require('../models/users')

router.post('/', async (req, res) => {
    try {
        let user = await Users.destroy({ where: {} });
        res.send(`Los usuarios fueron borrados correctamente`);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
})

module.exports = router;