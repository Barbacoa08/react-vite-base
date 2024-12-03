import type { FormEvent } from "react";
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

	const handleDeleteCompletedTodo = useCallback(
		(name: string) => {
			setCompleted(completed.filter((t) => t !== name));
		},
		[completed],
	);

	const handleAddTodo = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const form = e.currentTarget;
			const input = form.elements.namedItem(TodoInputName) as HTMLInputElement;
			const newTodo = input.value.trim();
			form.reset();

			if (!newTodo) return;

			setTodos([...todos, newTodo]);
		},
		[todos],
	);

	return (
		<main className="todos-container">
			<h1>Todos</h1>

			<form className="add-todo-container" onSubmit={handleAddTodo}>
				<label htmlFor={TodoInputName}>Add another?</label>
				<input
					id={TodoInputName}
					name={TodoInputName}
					type="text"
					maxLength={20}
				/>
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
									onChange={() => handleTodoCompletion(t)}
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
							<div key={t}>
								<label>
									<input
										type="checkbox"
										checked
										onChange={() => handleCompletionUndo(t)}
									/>
									{t}
								</label>

								<button
									aria-label={`Delete ${t}`}
									className="icon-button"
									type="button"
									onClick={() => handleDeleteCompletedTodo(t)}
								>
									❌
								</button>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};
