const router = require("express").Router();

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidators");
const {
  isAuthenticated,
  allowedTo,
} = require("../middlewares/AuthMiddlewares");

const userController = require("../controllers/userController");

// router.use(isAuthenticated, allowedTo("admin"));

router.get("/", userController.getUsers);
router.post("/", createUserValidator, userController.createUser);

router
  .route("/:id")
  .get(getUserValidator, userController.getUser)
  .put(updateUserValidator, userController.updateUser)
  .delete(deleteUserValidator, userController.deleteUser);

module.exports = router;
