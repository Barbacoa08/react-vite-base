import { useCallback, useState } from "react";

import "./Welcome.css";
import { useGlobalContext } from "src/GlobalContext";

export const Welcome = () => {
	const [count, setCount] = useState(0);
	const { name } = useGlobalContext();

	const travel = useCallback(() => {
		fetch("/travel-guide/stpaul/usa", {
			method: "POST",
		}).then((v) => console.log(v));
	}, []);

	return (
		<main>
			<h1>Vite + React + @barbajoe/css-lib</h1>

			<section>
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
			</section>

			<section>
				<h2>NEW! Now with AWS Lambda (via Netlify Serverless) functions!</h2>

				<p>Get the super basic "hello" result by clicking here:</p>

				<button type="button" onClick={() => fetch("/api/hello")}>
					GET 'hello'
				</button>

				<p>
					And get the slightly cooler result of your city and country result by
					clicking here:
				</p>

				<button type="button" onClick={travel}>
					POST 'stpaul usa'
				</button>
			</section>
		</main>
	);
};
