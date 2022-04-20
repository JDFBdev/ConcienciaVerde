const express = require('express');
const router = express.Router();
const db = require('../db');
const Days = require('../models/days');
const Users = require('../models/users');

router.get('/', async (req, res) => {

    let ans = []

    await Promise.all([Users.findAll(), Days.findAll()])
        .then(values=>{
            ans=[values[0], values[1]];
        })

    if(ans[0] && ans[1]) {

        let bolsasTotales = 0;
        let kgTotales = 0;
        ans[1].forEach(day => {
            bolsasTotales += day.bolsas
            kgTotales += day.kg
        });

        ans[0].sort(function(a, b){
            if(a.username < b.username) { return -1; }
            if(a.username > b.username) { return 1; }
            return 0;
        })

        res.send({days:{bolsasTotales, kgTotales}, users: ans[0]});
    } else {
        res.send("error")
    }
})

module.exports = router;