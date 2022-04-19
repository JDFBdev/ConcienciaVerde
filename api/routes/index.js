var express = require('express');
var router = express.Router();

const createUser = require('./createUser');
const allUsers = require('./allUsers');
const createDay = require('./createDay');
const allDays = require('./allDays');

router.use('/createUser', createUser);
router.use('/allUsers', allUsers);
router.use('/createDay', createDay);
router.use('/allDays', allDays);

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send(`Endpoints:\nAllUsers\nAllDays`);
});

module.exports = router;