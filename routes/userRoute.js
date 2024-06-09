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

router.get("/", allowedTo("admin", "instructor"), getUsers);
router.post(
  "/",
  allowedTo("admin"),
  uploadUserImage,
  resizeImage,
  createUserValidator,
  createUser
);

router
  .route("/:id")
  .get(allowedTo("admin", "instructor"), getUserValidator, getUser)
  .put(
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    updateUserValidator,
    updateUser
  )
  .delete(allowedTo("admin"), deleteUserValidator, deleteUser);

module.exports = router;
