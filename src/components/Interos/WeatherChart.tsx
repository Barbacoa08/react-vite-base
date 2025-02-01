import { use } from "react";

const dogApiRoot = "https://api.thedogapi.com/";
const dogBreeds = (limit = 100, page = 0) =>
	`v1/breeds?limit=${limit}&page=${page}`;

const fetchDogData = async () => {
	const call = `${dogApiRoot}${dogBreeds()}`;
	const response = await fetch(call, {
		headers: {
			"x-api-key": import.meta.env.VITE_DOG_API,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch weather");
	}

	return response.json();
};
const getDogData = fetchDogData();

// 86400000: (24 * 60 * 60 * 1000) + {days}
// const todayPlusDay = (days: number) => {
// 	const date = new Date(Date.now() - (86400000 + days));
// 	return date.toISOString();
// };
// const weatherApiBase = "https://api.weatherapi.com/v1/current.json";
// const fetchWeather = async (postalcode = "55104", pastDays = 7) => {
// 	const call = `${weatherApiBase}?key=${import.meta.env.VITE_WEATHER_API}&q=${postalcode}&aqi=no&dt=${todayPlusDay(-pastDays)}`;
// 	const response = await fetch(call);
// 	if (!response.ok) {
// 		throw new Error("Failed to fetch weather");
// 	}
// 	return response.json();
// };
// const getWeatherData = fetchWeather();

export const WeatherChart = () => {
	const data = use(getDogData);
	console.log("data", data);

	return (
		<section>
			<h2>Weather Data</h2>

			{/* <p>
				{data.location.name}, {data.location.region}
			</p> */}
		</section>
	);
};
