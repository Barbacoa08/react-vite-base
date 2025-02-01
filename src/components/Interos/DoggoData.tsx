import { use, useEffect, useState } from "react";

interface ApiResult {
	bred_for?: string;
	breed_group: string;
	height: ApiSize;
	id: number;
	image: ApiImage;
	life_span: string;
	name: string;
	origin: string;
	reference_image_id: string;
	temperament: string;
	weight: ApiSize;
}
interface ApiSize {
	imperial: string;
	metric: string;
}
interface ApiImage {
	id: string;
	width: number;
	height: number;
	url: string;
}

const dogApiRoot = "https://api.thedogapi.com/";
const dogBreeds = (limit = 10, page = 0) =>
	`v1/breeds?limit=${limit}&page=${page}`;

const fetchDogData = async (): Promise<ApiResult[]> => {
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

export const DoggoData = () => {
	const data = use(getDogData);

	const [temperaments, setTemperaments] = useState<string[]>([]);
	const [purpose, setPurpose] = useState<string[]>([]);

	useEffect(() => {
		const tOptions = new Set<string>();
		const pOptions = new Set<string>();

		for (let i = 0; i < data.length; i++) {
			const breed = data[i];

			const t = breed.temperament.split(", ");
			for (let j = 0; j < t.length; j++) {
				const breedTemperment = t[j];
				tOptions.add(breedTemperment);
			}

			const p = breed.bred_for?.split(", ") ?? [];
			for (let j = 0; j < p.length; j++) {
				const breedPurpose = p[j];
				pOptions.add(breedPurpose);
			}
		}

		setTemperaments(Array.from(tOptions).toSorted());
		setPurpose(Array.from(pOptions).toSorted());
	}, [data]);

	return (
		<section>
			<h2>Your Best Doggo</h2>

			<DoggoSelect options={temperaments} />
			<DoggoSelect options={purpose} />
		</section>
	);
};

const DoggoSelect = ({ options = [] }: { options: string[] }) => {
	if (options.length <= 0) return <div>loading...</div>;

	return (
		<select>
			<option>NONE SELECTED</option>

			{options.map((o) => (
				<option key={o} value={o}>
					{o}
				</option>
			))}
		</select>
	);
};
