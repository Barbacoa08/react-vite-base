import { useMemo } from "react";

const call = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API}&q=55104&aqi=no`;

export const WeatherChart = () => {
	const data = useMemo(async () => {
		const response = await fetch(call);

		if (!response.ok) {
			console.error(`${response.status} - ${response.statusText}`);
		} else {
			const result = await response.json();
			console.log("result", result);
			return result;
		}
	}, []);
	console.log("data", data);

	return (
		<section>
			<h2>Weather Data</h2>

			<p>{JSON.stringify(data)}</p>
		</section>
	);
};
