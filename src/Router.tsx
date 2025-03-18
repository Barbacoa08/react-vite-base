import type React from "react";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { Checkerboard } from "./components";
import { AboutPage, GroceriesPage, HomePage, TodoPage } from "./pages/";

export interface Route {
	path: string;
	element: React.JSX.Element;
	name: string;
}

export const routes: Route[] = [
	{
		path: "/",
		element: <HomePage />,
		name: "Home",
	},
	{
		path: "/about",
		element: <AboutPage />,
		name: "About",
	},
	{
		path: "/todos",
		element: <TodoPage />,
		name: "Todos",
	},
	{
		path: "/groceries",
		element: <GroceriesPage />,
		name: "Groceries",
	},
	{
		path: "/checkerboard",
		element: <Checkerboard />,
		name: "Checkerboard",
	},
];

const router = createBrowserRouter([
	...routes,
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
