import { useEffect } from "react";

export const useRotationHandler = (
	setPlacementOrientation: React.Dispatch<
		React.SetStateAction<"horizontal" | "vertical">
	>,
) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === "r") {
				setPlacementOrientation((prev) =>
					prev === "horizontal" ? "vertical" : "horizontal",
				);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [setPlacementOrientation]);
};
