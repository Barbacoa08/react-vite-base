import "chart.js/auto";

import type { ChartData } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { useState } from "react";

export const ExampleChart = () => {
	const { data, setData } = useData();

	return (
		<section>
			<Line
				options={options}
				data={data}
				aria-label="random numbers line chart"
			/>

			<button onClick={setData} type="button">
				Randomize Data
			</button>
		</section>
	);
};

const useData = () => {
	const [data, setData] = useState<ChartData<"line", number[], string>>(
		generateData(),
	);

	return {
		data,
		setData: () => setData(generateData()),
	};
};

const getRandomNumber = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const generateData = (): ChartData<"line", number[], string> => ({
	labels,
	datasets: [
		{
			label: "Dataset 1",
			data: labels.map(() => getRandomNumber(-1000, 1000)),
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
		{
			label: "Dataset 2",
			data: labels.map(() => getRandomNumber(-1000, 1000)),
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
});
