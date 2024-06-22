import React, { useEffect, useState } from "react"
import { FaImages } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import { validImageType } from "../../utils/validType"
import st from "./CreateChapterPage.module.scss"
import ExistingPage from "./components/existingPage/ExistingPage"
import {
	createPage,
	getBook,
	getChapterPage
} from "./service/createChapterPageService"

const CreateChapterPage = () => {
	const { bookId, chapterId } = useParams()
	const router = useNavigate()

	const [count, setCount] = useState(2)
	const [images, setImages] = useState<File[]>([])
	const [imagesUrl, setImagesUrl] = useState<Array<string>>([])

	const { currentUser } = useAppSelector(state => state.authReducer)
	const { currentBook, chapterPages } = useAppSelector(
		state => state.bookReducer
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getBook(Number(bookId)))
	}, [bookId])

	useEffect(() => {
		dispatch(getChapterPage(Number(chapterId)))
	}, [chapterId])

	const createPageHandler = async () => {
		for (let i = 0; i < images?.length; i++) {
			if (chapterId) {
				if (chapterPages) {
					await dispatch(
						createPage(
							images[i],
							Number(chapterId),
							chapterPages?.length === 0
								? i + 1
								: chapterPages[chapterPages.length - 1].order + i + 1
						)
					)
				}
			}
		}
		await setImages([])
		await setImagesUrl([])
	}

	const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validImageType(e.target.files![0].name)) {
			if (images && e.target.files) {
				setImages([...images, e.target.files[0]])
			} else {
				e.target.files && setImages([e.target.files[0]])
			}
			e.target.files &&
				setImagesUrl([...imagesUrl, URL.createObjectURL(e.target.files[0])])
		}
	}

	return currentUser?.roles.find(f => f.role === "admin") ||
		currentUser?.roles.find(f => f.role === "writer") ? (
		<div>
			<h2 className={st.title}>
				Добавить страницы для:{" "}
				<span
					className={st.name_book}
					onClick={() => router(RouteName.BOOK + "/" + currentBook?.id)}
				>
					"{currentBook?.name}"
				</span>{" "}
				<span
					className={st.name_chapter}
					onClick={() =>
						router(
							RouteName.CHAPTER +
								"/" +
								currentBook?.id +
								"/" +
								chapterId +
								"/" +
								"0"
						)
					}
				>
					{currentBook?.chapters.find(f => f.id === Number(chapterId))?.name}
				</span>
			</h2>
			<input
				type="number"
				className={st.count}
				value={count}
				onChange={e => setCount(Number(e.target.value))}
			/>
			<div className={st.uploads}>
				{Array(count)
					.fill(1)
					.map((_, i) => (
						<div className={st.upload_wrap} key={i}>
							<label
								title="Добавить изображение"
								className={st.upload}
								htmlFor={`createImage${i}`}
							>
								{imagesUrl[i] ? (
									<img className={st.preview_image} src={imagesUrl[i]} alt="" />
								) : (
									<div className={st.preview_empty}>
										<FaImages />
									</div>
								)}
								<input
									onChange={changeImage}
									type="file"
									id={`createImage${i}`}
								/>
							</label>
						</div>
					))}
			</div>
			<button title="Добавить страницы" onClick={createPageHandler} className={st.add_page}>
				Добавить
			</button>
			<div className={st.existing_pages}>
				{chapterPages?.map(page => (
					<ExistingPage key={page.id} page={page} />
				))}
			</div>
		</div>
	) : (
		<></>
	)
}

export default CreateChapterPage
