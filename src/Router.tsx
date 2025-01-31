import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import {
	AboutPage,
	GroceriesPage,
	HomePage,
	InterosPage,
	TodoPage,
} from "./pages/";

export interface Route {
	path: string;
	element: JSX.Element;
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
		path: "/interos",
		element: <InterosPage />,
		name: "Interos",
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
