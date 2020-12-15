const express = require('express')
const router = express.Router()

const friendsCtrl = require('../controllers/friends')

router.get('/', friendsCtrl.getFriends)
router.put('/add', friendsCtrl.addFriend)

module.exports = router
