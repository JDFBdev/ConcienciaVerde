const express = require('express');
const router = express.Router();
const db = require('../db');
const Days = require('../models/days')

router.get('/', async (req, res) => {
    let days = await Days.findAll();
    console.log(days);
    if(days) {
        let bolsasTotales = 0;
        let kgTotales = 0;
        days.forEach(day => {
            bolsasTotales += day.bolsas
            kgTotales += day.kg
        });
        res.send({bolsasTotales, kgTotales});
    } else {
        res.send("error")
    }
})

module.exports = router;