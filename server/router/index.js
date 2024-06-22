const Router = require("express").Router

const authRouter = require("./authRouter")
const roleRouter = require("./roleRouter")
const userRouter = require("./userRouter")
const bookRouter = require("./bookRouter")

const router = new Router()

router.use(`/auth`, authRouter)
router.use(`/role`, roleRouter)
router.use(`/user`, userRouter)
router.use(`/book`, bookRouter)

module.exports = router
