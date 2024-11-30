import { useCallback } from "react";
import { useGlobalContext } from "src/GlobalContext";

const nameInputId = "name-input";

export const AboutPage = () => {
	const { name, setName } = useGlobalContext();

	const handleFormSubmit = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: form types, am I right?
		(e: any) => {
			const updatedName = e.target[nameInputId].value.trim();
			e.preventDefault();
			e.target.reset();

			if (updatedName) {
				setName(updatedName);
			}
		},
		[setName],
	);

	return (
		<main>
			<h1>About</h1>

			<p>
				This is the about page. You can change your name here. Your current
				defined name is: {name}
			</p>

			<form onSubmit={handleFormSubmit}>
				<label>
					New Name
					<input
						id={nameInputId}
						name={nameInputId}
						type="text"
						maxLength={25}
					/>
				</label>

				<button type="submit">Submit</button>
			</form>
		</main>
	);
};
