var express = require('express');
var router = express.Router();

const createUser = require('./createUser');
const allUsers = require('./allUsers');
const createDay = require('./createDay');
const allDays = require('./allDays');
const deleteAllDays = require('./deleteAllDays');
const deleteAllUsers = require('./deleteAllUsers');

router.use('/createUser', createUser);
router.use('/allUsers', allUsers);
router.use('/createDay', createDay);
router.use('/allDays', allDays);
router.use('/deleteAllDays', deleteAllDays);
router.use('/deleteAllUsers', deleteAllUsers);

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send(`Endpoints:\nAllUsers\nAllDays`);
});

module.exports = router;