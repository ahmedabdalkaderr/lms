const router = require("express").Router();

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidators");
const { isAuthenticated } = require("../middlewares/AuthMiddlewares");

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
router
  .route("/me")
  .get(isAuthenticated, getLoggedUser, getUser)
  .put(
    uploadUserImage,
    resizeImage,
    isAuthenticated,
    updateLoggedUser,
    updateUser
  )
  .delete(isAuthenticated, deleteLoggedUser, deleteUser);
router.get("/", getUsers);
router.post(
  "/",
  uploadUserImage,
  resizeImage,
  createUserValidator,
  createUser
);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
