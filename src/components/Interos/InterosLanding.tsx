import { ExampleChart } from "./ExampleChart";
import { DoggoData } from "./DoggoData";

export const InterosLanding = () => {
	return (
		<main>
			<h1>Interos Landing</h1>

			<section>
				<h2>
					<span>Christopher Clark</span>

					<span>
						{" "}
						(<a href="https://www.linkedin.com/in/frencil/">LinkedIn</a>)
					</span>
				</h2>

				<ul>
					<li>Add `ErrorBoundary` to root</li>

					<li>Data visualizations (basic, SWAPI)</li>

					<li>
						be able to talk about "push/pull", "pub/sub", "polling", and JS's
						websockets
					</li>
				</ul>

				<ExampleChart />

				<DoggoData />
			</section>

			<section>
				<h2>
					<span>Chris Santero</span>

					<span>
						{" "}
						(
						<a href="https://www.linkedin.com/in/christopher-santero-08043b84/">
							LinkedIn
						</a>
						)
					</span>
				</h2>

				<ul>
					<li>
						<span>Write up some good types</span>

						<ul>
							<li>
								Optional props (one set OR other set) Be able to create a simple
							</li>

							<li>Use generics</li>
						</ul>
					</li>

					<li>class in JS</li>
				</ul>
			</section>
		</main>
	);
};
