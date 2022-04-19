var express = require('express');
var router = express.Router();

const createUser = require('./createUser');
const allUsers = require('./allUsers');
const createDay = require('./createDay');

router.use('/createUser', createUser);
router.use('/allUsers', allUsers);
router.use('/createDay', createDay);

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send(`Endpoints:\nAllUsers\nAllDays`);
});

module.exports = router;