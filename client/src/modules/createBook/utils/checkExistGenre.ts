import { Genre } from "../../../models/IGenre"

export const checkExistGenre = (genresArr: Genre[], genre: Genre) => {
	if (!genresArr.length) {
		return true
	}
	let exist = true
	for (let i = 0; i < genresArr.length; i++) {
		if (genresArr[i].name === genre.name) {
			exist = false
			break
		}
	}
	return exist
}
