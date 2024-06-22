import { useEffect, useState } from "react"
import { HiClipboardDocumentList } from "react-icons/hi2"
import { IoMdClose } from "react-icons/io"
import { IoClose, IoSend } from "react-icons/io5"
import { MdModeEdit } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"

import Modal from "../../components/modal/Modal"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { Genre } from "../../models/IGenre"
import { RouteName } from "../../routes"
import st from "./BookInfo.module.scss"
import Chapters from "./components/chapters/Chapters"
import Comment from "./components/comment/Comment"
import EditBook from "./components/editBook/EditBook"
import Pagination from "./components/pagination/Pagination"
import {
	addCommentBook,
	addGenreToBook,
	addRecommendationBook,
	checkRecommendationBook,
	deleteBook,
	getBook,
	getCommentBook,
	getGenre,
	removeGenreBook,
	removeRecommendationBook,
} from "./service/bookInfoService"
import { checkExistGenre } from "./utils/checkExistGenre"

const BookInfo = () => {
	const { id } = useParams()
	const router = useNavigate()

	const [isVisibleEdit, setVisibleEdit] = useState(false)
	const [selectButton, setSelectButton] = useState("description")
	const [currentPage, setCurrentPage] = useState(1)
	const [message, setMessage] = useState("")
	const [genresArr, setGenresArr] = useState<Genre[]>([])
	const limit = 5

	const { isAuth, currentUser } = useAppSelector(state => state.authReducer)
	const { genres } = useAppSelector(state => state.catalogReducer)
	const { currentBook, countCommentBook, commentsBook, checkRecommendation } =
		useAppSelector(state => state.bookReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (Number.isInteger(Number(id))) {
			dispatch(getBook(Number(id)))
			dispatch(getGenre())
			dispatch(checkRecommendationBook(Number(id)))
		}
	}, [])
	useEffect(() => {
		if (Number.isInteger(Number(id))) {
			dispatch(getCommentBook(Number(id), currentPage, limit))
		}
	}, [currentPage])
	const createComment = () => {
		if (id && message.length > 0) {
			dispatch(addCommentBook(Number(id), message))
			setMessage("")
		}
	}
	const addGenre = (genre: Genre) => {
		if (checkExistGenre(genresArr, genre)) {
			setGenresArr([...genresArr, genre])
		}
	}
	const removeGenre = (name: string) => {
		setGenresArr(genresArr.filter(f => f.name !== name))
	}
	const startRead = () => {
		currentBook?.chapters &&
			currentBook?.chapters.length &&
			router(
				RouteName.CHAPTER +
					"/" +
					currentBook?.id +
					"/" +
					currentBook?.chapters[currentBook?.chapters?.length - 1].id +
					"/" +
					"0"
			)
	}
	const removeBookHandler = () => {
		dispatch(deleteBook(Number(id)))
		router(RouteName.CATALOG)
	}

	return (
		<div className={st.wrap}>
			<div className={st.left}>
				<img
					src={`${process.env.REACT_APP_API_URL}books/${currentBook?.id}/${currentBook?.image}`}
					alt=""
				/>
				<button onClick={startRead} className={st.read}>
					Читать
				</button>
				{(currentUser?.roles.find(f => f.role === "admin") ||
					currentUser?.roles.find(f => f.role === "writer")) &&
					(checkRecommendation ? (
						<button
							onClick={() => dispatch(removeRecommendationBook(Number(id)))}
							className={st.read}
						>
							Убрать из избранного
						</button>
					) : (
						<button
							onClick={() => dispatch(addRecommendationBook(Number(id)))}
							className={st.read}
						>
							Добавить в избранное
						</button>
					))}
			</div>
			<div className={st.right}>
				<div className={st.sub_info}>
					<p>{currentBook?.type}</p>
					<p>{currentBook?.release_date}</p>
					<p>{currentBook?.status}</p>
				</div>
				<div className={st.header}>
					<h2 className={st.name}>{currentBook?.name}</h2>
					{(currentUser?.roles.find(f => f.role === "admin") ||
						currentUser?.roles.find(f => f.role === "writer")) && (
						<div className={st.tools}>
							<button
								title="Редактировать"
								onClick={() => setVisibleEdit(true)}
								className={st.edit}
							>
								<MdModeEdit />
							</button>
							<button
								title="Удалить"
								onClick={removeBookHandler}
								className={st.remove_book}
							>
								<IoClose />
							</button>
						</div>
					)}
				</div>
				{(currentUser?.roles.find(f => f.role === "admin") ||
					currentUser?.roles.find(f => f.role === "writer")) && (
					<select
						onChange={e => addGenre(JSON.parse(e.target.value))}
						className={st.select_genres}
					>
						<option defaultChecked>Жанры</option>
						{genres?.map(
							genre =>
								checkExistGenre(genresArr, genre) && (
									<option key={genre.id} value={JSON.stringify(genre)}>
										{genre.name}
									</option>
								)
						)}
					</select>
				)}
				<div className={st.preview_genre}>
					{(currentUser?.roles.find(f => f.role === "admin") ||
						currentUser?.roles.find(f => f.role === "writer")) &&
						genresArr.map(genre => (
							<div key={genre.id} className={st.genre}>
								<p>{genre.name}</p>
								<button
									onClick={() => removeGenre(genre.name)}
									className={st.remove_genre}
								>
									<IoMdClose />
								</button>
							</div>
						))}
				</div>
				{(currentUser?.roles.find(f => f.role === "admin") ||
					currentUser?.roles.find(f => f.role === "writer")) &&
				genresArr.length ? (
					<button
						onClick={() => addGenreToBook(genresArr, Number(id))}
						className={st.add_genre}
					>
						Добавить жанры
					</button>
				) : (
					<></>
				)}
				<div className={st.genres}>
					{currentBook?.genres.map(genre => (
						<div className={st.genre} key={genre.id}>
							<span>{genre.name}</span>
							{(currentUser?.roles.find(f => f.role === "admin") ||
								currentUser?.roles.find(f => f.role === "writer")) && (
								<button
									key={genre.id}
									title="Удалить жанр"
									onClick={() => dispatch(removeGenreBook(genre.book_genre.id))}
									className={st.remove_genre}
								>
									<IoMdClose />
								</button>
							)}
						</div>
					))}
				</div>

				<div className={st.select}>
					<button
						className={`${selectButton === "description" ? st.active : ""}`}
						onClick={() => setSelectButton("description")}
					>
						Описание
					</button>
					<button
						className={`${selectButton === "chapter" ? st.active : ""}`}
						onClick={() => setSelectButton("chapter")}
					>
						Главы
					</button>
					<button
						className={`${selectButton === "comments" ? st.active : ""}`}
						onClick={() => setSelectButton("comments")}
					>
						Комментарии
					</button>
				</div>
				{selectButton === "description" && (
					<p className={st.description}>{currentBook?.description}</p>
				)}
				{selectButton === "chapter" && <Chapters />}
				{selectButton === "comments" && (
					<div className={st.comments}>
						{isAuth ? (
							<div className={st.create_comment}>
								<input
									type="text"
									placeholder="Сообщение..."
									value={message}
									onChange={e => setMessage(e.target.value)}
								/>
								<button onClick={createComment} className={st.send}>
									<IoSend />
								</button>
							</div>
						) : (
							<p className={st.not_auth}>
								Авторизуйтесь что бы оставить комментарий
							</p>
						)}
						{countCommentBook > 0 ? (
							commentsBook?.map(comment => (
								<Comment key={comment.id} comment={comment} />
							))
						) : (
							<div className={st.empty}>
								<HiClipboardDocumentList />
								<p>Комментариев нет</p>
							</div>
						)}
						{countCommentBook > limit && (
							<Pagination
								currentPage={currentPage}
								limit={limit}
								setCurrentPage={setCurrentPage}
							/>
						)}
					</div>
				)}
			</div>
			<Modal visible={isVisibleEdit} setVisible={setVisibleEdit}>
				{(currentUser?.roles.find(f => f.role === "admin") ||
					currentUser?.roles.find(f => f.role === "writer")) && <EditBook />}
			</Modal>
		</div>
	)
}

export default BookInfo
