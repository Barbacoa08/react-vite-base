import { use, useEffect, useId, useMemo, useState } from "react";

const stringSeperator = ", ";

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

interface DoggoForm {
	temperament?: string;
	purpose?: string;
}

const dogApiRoot = "https://api.thedogapi.com/";
const dogBreeds = (limit = 100, page = 0) =>
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
	const [purposes, setPurposes] = useState<string[]>([]);

	const [formData, setFormData] = useState<DoggoForm>({});

	useEffect(() => {
		const tOptions = new Set<string>();
		const pOptions = new Set<string>();

		for (let i = 0; i < data.length; i++) {
			const breed = data[i];

			const t = breed.temperament.split(stringSeperator);
			for (let j = 0; j < t.length; j++) {
				const breedTemperment = t[j];
				tOptions.add(breedTemperment);
			}

			const p = breed.bred_for?.split(stringSeperator) ?? [];
			for (let j = 0; j < p.length; j++) {
				const breedPurpose = p[j];
				pOptions.add(breedPurpose);
			}
		}

		setTemperaments(Array.from(tOptions).toSorted());
		setPurposes(Array.from(pOptions).toSorted());
	}, [data]);

	return (
		<section>
			<h2>Your Best Doggo</h2>

			<DoggoSelect
				label="Temperament"
				options={temperaments}
				onSelect={(v) => setFormData((prev) => ({ ...prev, temperament: v }))}
			/>
			<DoggoSelect
				label="Bred For Purpose"
				options={purposes}
				onSelect={(v) => setFormData((prev) => ({ ...prev, purpose: v }))}
			/>

			<BestDoggo doggos={data} formData={formData} />
		</section>
	);
};

const DoggoSelect = ({
	label,
	options = [],
	onSelect,
	id = useId(),
}: {
	label: string;
	options: string[];
	onSelect: (v: string) => void;
	id?: string;
}) => {
	if (options.length <= 0) return <div>loading...</div>;

	return (
		<div>
			<label htmlFor={id}>{label}</label>

			<select id={id} onChange={(e) => onSelect(e.target.value)}>
				<option value="">NONE SELECTED</option>

				{options.map((o) => (
					<option key={o} value={o}>
						{o}
					</option>
				))}
			</select>
		</div>
	);
};

const BestDoggo = ({
	doggos,
	formData: { purpose, temperament },
}: { doggos: ApiResult[]; formData: DoggoForm }) => {
	const matches = useMemo(() => {
		return purpose && temperament
			? doggos
					.filter(
						(d) =>
							d.bred_for?.includes(purpose) &&
							d.temperament.split(stringSeperator).includes(temperament),
					)
					.map((d) => d.name)
			: [];
	}, [doggos, purpose, temperament]);

	return (
		<section>
			<h3>Results</h3>

			<section>
				{purpose || temperament ? (
					<>
						<p>Temperament: {temperament || "not yet selected"}</p>
						<p>Purpose: {purpose || "not yet selected"}</p>
					</>
				) : (
					<p>No selectios made</p>
				)}
			</section>

			<section>
				<p>
					True Match result:{" "}
					{matches.length
						? matches.join(stringSeperator)
						: "no matches found 😭"}
				</p>
			</section>
		</section>
	);
};
