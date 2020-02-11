const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/updateProfile/:id',userController.updateProfile)
router.delete('/deleteProfile/:id', userController.deleteProfile);
module.exports = router;