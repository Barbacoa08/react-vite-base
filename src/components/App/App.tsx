import { useState } from "react";

import "./App.css";

export const App = () => {
	const [count, setCount] = useState(0);

	return (
		<main>
			<h1>Vite + React</h1>

			<div className="card">
				<button type="button" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>

				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
		</main>
	);
};
