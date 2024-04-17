const router = require("express").Router();

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidators");
const { isAuthenticated } = require("../middlewares/AuthMiddlewares");

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getLoggedUser,
  updateLoggedUser,
  deleteLoggedUser,
} = require("../controllers/userController");

// router.use(isAuthenticated, allowedTo("admin"));
router.get("/getMe", isAuthenticated, getLoggedUser, getUser);
router.put("/updateMe", isAuthenticated, updateLoggedUser, updateUser);
router.delete("/deleteMe", isAuthenticated, deleteLoggedUser, deleteUser);

router.get("/", getUsers);
router.post("/", createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
