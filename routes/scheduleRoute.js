const router = require("express").Router();

const {
  getSchedules,
  createSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");
const {
  isAuthenticated,
  allowedTo,
} = require("../middlewares/AuthMiddlewares");

router.use(isAuthenticated);
router
  .route("/")
  .get(getSchedules)
  .post(allowedTo("admin", "instructor"), createSchedule);

router
  .route("/:id")
  .get(allowedTo("admin", "instructor"), getSchedule)
  .put(allowedTo("admin", "instructor"), updateSchedule)
  .delete(allowedTo("admin", "instructor"), deleteSchedule);

module.exports = router;
