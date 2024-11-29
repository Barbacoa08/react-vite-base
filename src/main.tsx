import "@barbajoe/css-lib/dist/barbajoe.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "src/App";

// biome-ignore lint/style/noNonNullAssertion: trust vite on this one
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
