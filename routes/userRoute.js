const router = require("express").Router();

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidators");
const { isAuthenticated, allowedTo } = require("../middlewares/AuthMiddlewares");

const {
  uploadUserImage,
  resizeImage,
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
router.use(isAuthenticated);
router
  .route("/me")
  .get(getLoggedUser, getUser)
  .put(uploadUserImage, resizeImage, updateLoggedUser, updateUser)
  .delete(deleteLoggedUser, deleteUser);

router.use(allowedTo("admin"));
router.get("/", getUsers);
router.post("/", uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
