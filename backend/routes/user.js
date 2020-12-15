const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

router.post('/auth/signup', userCtrl.signup)
router.post('/auth/login', userCtrl.login)

router.get('/profile/:id', userCtrl.getOneUser)
router.put('/profile/:id', userCtrl.modifyUser)

module.exports = router
