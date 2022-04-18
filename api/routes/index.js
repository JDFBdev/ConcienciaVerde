var express = require('express');
var router = express.Router();

const createUser = require('./createUser');
const allUsers = require('./allUsers');

router.use('/createUser', createUser);
router.use('/allUsers', allUsers);

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send(`Endpoints:\nAllUsers\nAllDays`);
});

module.exports = router;