const express = require('express');
const router = express.Router();
const db = require('../db');
const Days = require('../models/days')

router.post('/', async (req, res) => {
    try {
        let day = await Days.destroy({ where: {} });
        res.send(`Los dias fueron borrados correctamente`);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
})

module.exports = router;