import type { Board, ShipPieces } from "../../types";
import { placeShip } from "../place-ship";

// place on random spots until all pieces placed
export const autoPlace = (board: Board, pieces: ShipPieces): Board => {
	let boardClone = structuredClone(board);
	const directions: ("horizontal" | "vertical")[] = ["horizontal", "vertical"];

	for (const piece of pieces) {
		let placed = false;
		let attempts = 0;
		const MAX_ATTEMPTS = 1000;

		while (!placed && attempts < MAX_ATTEMPTS) {
			attempts++;
			const direction =
				directions[Math.floor(Math.random() * directions.length)];
			const x = Math.floor(Math.random() * board.length);
			const y = Math.floor(Math.random() * board[0].length);

			const result = placeShip(
				boardClone,
				piece,
				x,
				y,
				direction === "horizontal",
			);
			if (result) {
				boardClone = result;
				placed = true;
			}
		}

		if (!placed) {
			throw new Error(
				`Failed to place ship of size ${piece} after ${MAX_ATTEMPTS} attempts`,
			);
		}
	}

	return boardClone;
};
