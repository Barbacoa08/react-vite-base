export const Todos = () => {
	return (
		<main className="todos-container">
			<h1>Todos</h1>

			<section>
				<div>
					<h2>The Queue</h2>

					<div className="queue">
						<label>
							<input type="checkbox" /> Clean the cat litter
						</label>

						<label>
							<input type="checkbox" /> Study mathmatics
						</label>

						<label>
							<input type="checkbox" /> Walk the dogs
						</label>
					</div>
				</div>

				<div className="completed">
					<h2>Completed</h2>

					<div className="completed">
						<label>
							<input type="checkbox" /> Clean the cat litter
						</label>

						<label>
							<input type="checkbox" /> Study mathmatics
						</label>

						<label>
							<input type="checkbox" /> Walk the dogs
						</label>
					</div>
				</div>
			</section>
		</main>
	);
};
