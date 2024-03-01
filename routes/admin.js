const router = require('express').Router();

const adminController = require('../controllers/admin');
const isAuthenticated = require('../middleware/isAuthenticated');
    
router.post('/createUser', isAuthenticated, adminController.createUser);

router.put('/updataUser', isAuthenticated, adminController.updateUser);

router.delete('/deleteUser', isAuthenticated, adminController.deleteUser);

module.exports = router;