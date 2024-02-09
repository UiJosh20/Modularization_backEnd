const express = require('express');
const router = express.Router();
const {displayWelcome, aboutUser, register, login} = require('../controller/user.controller')




router.get('/', displayWelcome)
router.get('/api', aboutUser)
router.post('/register', register)
router.post('/login', login)



module.exports = router;