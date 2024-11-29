import { Router, routes } from "src/Router";

export const App = () => {
	const currentPath = window.location.pathname;

	return (
		<>
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
		</>
	);
};
