import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
	const { params, geo } = context;

	console.log({ geo });

	if (req.method === "GET") {
		console.log("HIT GET");
	} else if (req.method === "POST") {
		console.log("HIT POST");
	}

	const { city, country } = params;
	return new Response(`You're visiting ${city} in ${country}!`);
};

// route: BASEURL/travel-guide/:city/:country
// example: GET https://deploy-preview-10--react-vite-base.netlify.app/travel-guide/stpaul/usa
export const config: Config = {
	path: "/travel-guide/:city/:country",
};
