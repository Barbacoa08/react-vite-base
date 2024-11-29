import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { AboutPage, HomePage } from "./pages/";

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
