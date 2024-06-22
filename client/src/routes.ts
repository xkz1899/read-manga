import React from "react"

import Auth from "./pages/auth/Auth"
import Book from "./pages/book/Book"
import Catalog from "./pages/catalog/Catalog"
import Chapter from "./pages/chapter/Chapter"
import Create from "./pages/create/Create"
import CreatePage from "./pages/createPage/CreatePage"
import Main from "./pages/main/Main"
import UserRole from "./pages/userRole/UserRole"

interface IRoute {
	path: string
	Element: React.ElementType
}

export enum RouteName {
	AUTHORIZATION = "/auth",
	MAIN = "/",
	CATALOG = "/catalog",
	BOOK = "/book",
	CHAPTER = "/chapter",
	CREATE = "/create",
	CREATE_PAGE = "/page",
	USER_ROLE = "/users",
}

export const publicRoute: IRoute[] = [
	{ path: RouteName.AUTHORIZATION, Element: Auth },
	{ path: RouteName.CATALOG, Element: Catalog },
	{ path: RouteName.BOOK + "/" + ":id", Element: Book },
	{
		path: RouteName.CHAPTER + "/" + ":id" + "/" + ":chapterId" + "/" + ":page",
		Element: Chapter,
	},
	{ path: RouteName.MAIN, Element: Main },
	{ path: "*", Element: Main },
]

export const authRoute: IRoute[] = [
	{ path: RouteName.MAIN, Element: Main },
	{
		path: RouteName.CREATE_PAGE + "/" + ":bookId" + "/" + ":chapterId",
		Element: CreatePage,
	},
	{ path: RouteName.CATALOG, Element: Catalog },
	{ path: RouteName.BOOK + "/" + ":id", Element: Book },
	{ path: RouteName.USER_ROLE, Element: UserRole },
	{ path: RouteName.CREATE, Element: Create },
	{
		path: RouteName.CHAPTER + "/" + ":id" + "/" + ":chapterId" + "/" + ":page",
		Element: Chapter,
	},
	{ path: `*`, Element: Main },
]
