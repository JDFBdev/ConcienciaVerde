const express = require('express');
const router = express.Router();
const db = require('../db');
const Users = require('../models/users')

router.get('/', async (req, res) => {
    let users = await Users.findAll().catch((e)=>{console.log(e)});

    users.sort(function(a, b){
        if(a.username < b.username) { return -1; }
        if(a.username > b.username) { return 1; }
        return 0;
    })

    if(users) {
        res.send(users);
    } else {
        res.send("error")
    }
})

module.exports = router;