import { useState } from "react";

import "./Welcome.css";

export const Welcome = () => {
	const [count, setCount] = useState(0);

	return (
		<main>
			<h1>Vite + React + @barbajoe/css-lib</h1>

			<button type="button" onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</button>

			<p>
				Edit <code>src/**.tsx</code> and save to test HMR
			</p>
		</main>
	);
};
