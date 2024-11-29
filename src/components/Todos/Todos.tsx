import { useCallback, useState } from "react";

import "./Todos.css";

const TodoInputName = "add-todo-input";

export const Todos = () => {
	const [todos, setTodos] = useState([
		"Clean the cat litter",
		"Study mathmatics",
		"Walk the dogs",
	]);
	const [completed, setCompleted] = useState<string[]>([]);

	const handleTodoCompletion = useCallback(
		(name: string) => {
			setTodos(todos.filter((t) => t !== name));
			setCompleted([...completed, name]);
		},
		[completed, todos],
	);

	const handleCompletionUndo = useCallback(
		(name: string) => {
			setCompleted(completed.filter((t) => t !== name));
			setTodos([...todos, name]);
		},
		[completed, todos],
	);

	const handleAddTodo = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: why are form types so annoying?
		(e: any) => {
			const newTodo = e.target[TodoInputName].value;
			e.preventDefault();

			setTodos([...todos, newTodo]);

			e.target.reset();
		},
		[todos],
	);

	return (
		<main className="todos-container">
			<h1>Todos</h1>

			<form className="add-todo-container" onSubmit={handleAddTodo}>
				<label htmlFor={TodoInputName}>Add another?</label>
				<input id={TodoInputName} name={TodoInputName} type="text" />
				<button type="submit">Add</button>
			</form>

			<section className="flex-row">
				<div>
					<h2>The Queue</h2>

					<div className="queue">
						{todos.map((t) => (
							<label key={t}>
								<input
									type="checkbox"
									onClick={() => handleTodoCompletion(t)}
								/>
								{t}
							</label>
						))}
					</div>
				</div>

				<div>
					<h2>Completed</h2>

					<div className="completed">
						{completed.map((t) => (
							<label key={t}>
								<input
									type="checkbox"
									checked
									onClick={() => handleCompletionUndo(t)}
								/>
								{t}
							</label>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};
