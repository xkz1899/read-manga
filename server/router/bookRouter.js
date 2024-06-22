const Router = require("express").Router
const bookController = require("../controllers/bookController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/comment`, roleMiddleware([`user`]), bookController.addCommentBook)
router.get(`/comment`, bookController.getCommentBook)
router.delete(
	`/comment/:id`,
	roleMiddleware(["user"]),
	bookController.deleteCommentBook
)
router.post(
	`/chapter/comment`,
	roleMiddleware([`user`]),
	bookController.addCommentChapter
)
router.get(`/chapter/comment`, bookController.getCommentChapter)
router.delete(
	`/chapter/comment/:id`,
	roleMiddleware(["user"]),
	bookController.deleteCommentChapter
)
router.patch(
	`/chapter/like/:chapterId`,
	roleMiddleware(["user"]),
	bookController.addLikeChapter
)
router.delete(
	`/chapter/:id`,
	roleMiddleware(["admin", "writer"]),
	bookController.deleteChapter
)
router.post(
	`/chapter/edit`,
	roleMiddleware(["admin", "writer"]),
	bookController.editChapter
)
router.get(`/genre`, bookController.getGenre)
router.post(`/genre`, roleMiddleware([`admin`]), bookController.createGenre)
router.get(`/current`, bookController.getBook)
router.get(`/chapter`, bookController.getChapter)
router.get(`/chapter/page`, bookController.getCharterPage)
router.delete(
	`/chapter/page/:id`,
	roleMiddleware([`admin`, `writer`]),
	bookController.deleteChapterPage
)
router.get(`/`, bookController.getCatalog)
router.delete(
	`/:id`,
	roleMiddleware([`admin`, `writer`]),
	bookController.deleteBook
)
router.post(`/`, roleMiddleware([`admin`, `writer`]), bookController.createBook)
router.patch(`/`, roleMiddleware([`admin`, `writer`]), bookController.editBook)
router.post(
	`/chapter`,
	roleMiddleware([`admin`, `writer`]),
	bookController.createChapter
)
router.post(
	`/connect`,
	roleMiddleware([`admin`, `writer`]),
	bookController.connectBookGenre
)
router.delete(
	`/connect/:id`,
	roleMiddleware([`admin`, `writer`]),
	bookController.deleteConnectBookGenre
)
router.post(
	`/chapter/page`,
	roleMiddleware([`admin`, `writer`]),
	bookController.createCharterPage
)
router.patch(
	`/chapter/page`,
	roleMiddleware([`admin`, `writer`]),
	bookController.editOrderPage
)
router.post(
	`/recommendation`,
	roleMiddleware([`admin`, `writer`]),
	bookController.addRecommendation
)
router.get(`/recommendation`, bookController.getRecommendation)
router.delete(
	`/recommendation/:id`,
	roleMiddleware([`admin`, `writer`]),
	bookController.deleteRecommendation
)
router.get(
	`/recommendation/check`,
	roleMiddleware([`admin`, `writer`]),
	bookController.checkRecommendation
)

module.exports = router
