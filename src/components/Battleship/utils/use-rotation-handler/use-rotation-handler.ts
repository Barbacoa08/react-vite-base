import { useEffect } from "react";

export const useRotationHandler = (
	setPlacementOrientation: React.Dispatch<
		React.SetStateAction<"horizontal" | "vertical">
	>,
) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Ignore if user is typing in an input field
			const target = e.target as HTMLElement;
			if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
				return;
			}

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
