import { useState } from "react";
import { Router, routes } from "src/Router";

import { GlobalContextProvider } from "./GlobalContext";

export const App = () => {
	const currentPath = window.location.pathname;

	const [name, setName] = useState("Unknown Name");

	return (
		<GlobalContextProvider value={{ name, setName }}>
			<header className="site-header">
				<ul className="site-header-links">
					{routes.map((route) => (
						<li
							key={route.path}
							className={currentPath === route.path ? "active" : ""}
						>
							<a href={route.path}>{route.name}</a>
						</li>
					))}
				</ul>
			</header>

			<Router />
		</GlobalContextProvider>
	);
};
