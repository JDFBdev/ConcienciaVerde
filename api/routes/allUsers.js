const express = require('express');
const router = express.Router();
const db = require('../db');
const Users = require('../models/users')

router.get('/', async (req, res) => {
    let users = await Users.findAll().catch((e)=>{console.log(e)});
    if(users) {
        res.send(users);
    } else {
        res.send("error")
    }
})

module.exports = router;