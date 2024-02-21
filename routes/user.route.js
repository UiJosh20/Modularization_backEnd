const express = require('express');
const router = express.Router();
const {displayWelcome, aboutUser, register, login, upload,verifyToken} = require('../controller/user.controller')




router.get('/', displayWelcome)
router.get('/api', aboutUser)
router.post('/register', register)
router.post('/login', login)
router.post('/upload', upload)
router.post('/verifyToken', verifyToken)



module.exports = router;