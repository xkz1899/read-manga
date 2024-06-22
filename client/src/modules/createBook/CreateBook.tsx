import React, { useEffect, useState } from "react"
import { BsFillImageFill } from "react-icons/bs"
import { FaCloudUploadAlt } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { useNavigate } from "react-router-dom"

import Loader from "../../components/loader/Loader"
import ModalDisable from "../../components/modalDisable/ModalDisable"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { Genre } from "../../models/IGenre"
import { validImageType } from "../../utils/validType"
import st from "./CreateBook.module.scss"
import { createBook, createGenre, getGenres } from "./service/createBookService"
import { checkExistGenre } from "./utils/checkExistGenre"
import { RouteName } from "../../routes"

const CreateBook = () => {
	const router = useNavigate()

	const [name, setName] = useState("")
	const [year, setYear] = useState("2021")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState("Завершен")
	const [type, setType] = useState("Манга")
	const [image, setImage] = useState<FileList | null>(null)
	const [imageUrl, setImageUrl] = useState("")
	const [genresArr, setGenresArr] = useState<Genre[]>([])
	const [select, setSelect] = useState("book")
	const [genreValue, setGenreValue] = useState("")

	const { currentUser } = useAppSelector(state => state.authReducer)
	const { genres } = useAppSelector(state => state.catalogReducer)
	const { isLoadingUploadBook } = useAppSelector(state => state.bookReducer)
	const dispatch = useAppDispatch()

	const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validImageType(e.target.files![0].name)) {
			setImage(e.target.files)
			e.target.files && setImageUrl(URL.createObjectURL(e.target.files[0]))
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
	const createBookHandler = () => {
		if (
			image &&
			genresArr?.length &&
			year.length &&
			status.length &&
			name.length &&
			description.length &&
			type.length
		) {
			dispatch(
				createBook(year, status, name, description, type, image[0], genresArr)
			)
			router(RouteName.CATALOG)
		}
	}

	useEffect(() => {
		dispatch(getGenres())
	}, [])

	const createGenreHandler = () => {
		if (genreValue.length) {
			createGenre(genreValue)
			setGenreValue("")
		}
	}

	return (
		<>
			<div className={st.select}>
				<button
					onClick={() => setSelect("book")}
					className={select === "book" ? st.active : ""}
				>
					Книги
				</button>
				{currentUser?.roles.find(f => f.role === "admin") && (
					<button
						onClick={() => setSelect("genre")}
						className={select === "genre" ? st.active : ""}
					>
						Жанры
					</button>
				)}
			</div>
			{currentUser?.roles.find(f => f.role === "admin") &&
				select === "genre" && (
					<div className={st.create_genre}>
						<input
							type="text"
							value={genreValue}
							placeholder="Новый жанр..."
							onChange={e => setGenreValue(e.target.value)}
						/>
						<button
							className={st.create_genre_btn}
							onClick={createGenreHandler}
						>
							Создать
						</button>
					</div>
				)}
			{!isLoadingUploadBook ? (
				select === "book" && (
					<div className={st.wrap}>
						<div className={st.create}>
							<input
								type="text"
								className={st.input_name}
								placeholder="Название..."
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<input
								type="text"
								className={st.input_description}
								placeholder="Описание..."
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
							<input
								className={st.input_year}
								type="number"
								min="1900"
								max="2099"
								step="1"
								value={year}
								onChange={e => setYear(e.target.value)}
							/>
							<select
								className={st.select_status}
								onChange={e => setStatus(e.target.value)}
								name="status"
							>
								<option value="Завершен">Завершен</option>
								<option value="Продолжается">Продолжается</option>
								<option value="Заморожен">Заморожен</option>
								<option value="Заброшен">Заброшен</option>
							</select>
							<select
								className={st.select_type}
								onChange={e => setType(e.target.value)}
								name="type"
							>
								<option value="Манга">Манга</option>
								<option value="Манхва">Манхва</option>
								<option value="Маньхуа">Маньхуа</option>
							</select>

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
							<label
								title="Загрузить изображение"
								className={st.upload}
								htmlFor="image-book"
							>
								<FaCloudUploadAlt />
								<input id="image-book" type="file" onChange={changeImage} />
							</label>
							<button className={st.create_book} onClick={createBookHandler}>
								Создать
							</button>
						</div>
						<div className={st.preview}>
							<div className={st.left}>
								{imageUrl.length ? (
									<img src={imageUrl} alt="" />
								) : (
									<div className={st.empty_img}>
										<BsFillImageFill />
									</div>
								)}
								<button className={st.read}>Читать</button>
							</div>
							<div className={st.right}>
								<div className={st.sub_info}>
									<p>{type}</p>
									<p>{year}</p>
									<p>{status}</p>
								</div>
								<h2 className={st.name}>{name}</h2>
								<div className={st.genres}>
									{genresArr.map(genre => (
										<div className={st.genre} key={genre.id}>
											<p>{genre.name}</p>
											<button
												onClick={() => removeGenre(genre.name)}
												className={st.close}
											>
												<IoMdClose />
											</button>
										</div>
									))}
								</div>
								<div className={st.select}>
									<button className={st.active}>Описание</button>
									<button>Главы</button>
									<button>Комментарии</button>
								</div>
								<p className={st.description}>{description}</p>
							</div>
						</div>
					</div>
				)
			) : (
				<ModalDisable>
					<Loader />
				</ModalDisable>
			)}
		</>
	)
}

export default CreateBook
