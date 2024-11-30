import { useState } from "react";

import "./Welcome.css";
import { useGlobalContext } from "src/GlobalContext";

export const Welcome = () => {
	const [count, setCount] = useState(0);
	const { name } = useGlobalContext();

	return (
		<main>
			<h1>Vite + React + @barbajoe/css-lib</h1>

			<p>
				Hello {name}! Click the button to see the most basic of ways to use{" "}
				<code>useState</code>
			</p>

			<button type="button" onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</button>

			<p>
				Or, edit <code>src/**.tsx</code> and save to test HMR
			</p>

			<p>
				OR! You can edit the global <code>name</code> value in the About page.
			</p>
		</main>
	);
};
