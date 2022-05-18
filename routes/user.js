const router = require("express").Router();
const userController = require('../controllers/userController')
const auth =require('../middleware/auth')

router.get("/", userController.user_get)
router.get("/logout", userController.user_logout)
router.get("/secret",  userController.secretPage)
router.get("/data", auth, userController.all_Data)
router.post("/register", userController.user_create);
router.post("/login", userController.user_login);
router.put(`/register/:id`, userController.user_update);


module.exports = router;