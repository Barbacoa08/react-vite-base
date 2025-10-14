import type { Board } from "../../types";

/**
 * @returns `null` if placement is invalid, otherwise returns new board with ship placed
 */
export const placeShip = (
	board: Board,
	shipSize: number,
	startRow: number,
	startCol: number,
	isHorizontal: boolean,
): Board | null => {
	const newBoard = structuredClone(board);
	const BOARD_SIZE = board.length;

	// Check if ship placement is within bounds
	if (isHorizontal) {
		if (startCol + shipSize > BOARD_SIZE) return null;
		for (let col = startCol; col < startCol + shipSize; col++) {
			if (newBoard[startRow][col].myView !== "empty") return null; // Overlap detected
		}
		for (let col = startCol; col < startCol + shipSize; col++) {
			const cell = newBoard[startRow][col];
			newBoard[startRow][col] = {
				...cell,
				myView: "ship",
				hasShip: true,
			};
		}
	} else {
		if (startRow + shipSize > BOARD_SIZE) return null;
		for (let row = startRow; row < startRow + shipSize; row++) {
			if (newBoard[row][startCol].myView !== "empty") return null; // Overlap detected
		}
		for (let row = startRow; row < startRow + shipSize; row++) {
			const cell = newBoard[row][startCol];
			newBoard[row][startCol] = {
				...cell,
				myView: "ship",
				hasShip: true,
			};
		}
	}

	return newBoard;
};
