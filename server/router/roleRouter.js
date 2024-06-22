const Router = require("express").Router
const roleController = require("../controllers/roleController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware([`admin`]), roleController.createRole)
router.post(`/appoint`, roleMiddleware([`admin`]), roleController.appointRole)
router.delete(`/:id`, roleMiddleware([`admin`]), roleController.deleteRoleUser)
router.get(`/`, roleMiddleware([`admin`]), roleController.getAllRoles)

module.exports = router
