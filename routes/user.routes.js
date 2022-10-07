const router = require('express').Router();

// route des controllers
const authController = require ('../controllers/auth.controller.js')
const userController = require ('../controllers/user.controller.js')


// Pour aller sur localhost/api/user/register
router.post('/register', authController.signUp);

// User DB
router.get('/', userController.getAllusers);
// quand dans notre chemin on a un parametre id on prend les infos de l'utalisateur en question
router.get('/:id', userController.userInfo)
// pour update avec le put depuis le controller user
router.put("/:id", userController.updateUser )


module.exports = router;