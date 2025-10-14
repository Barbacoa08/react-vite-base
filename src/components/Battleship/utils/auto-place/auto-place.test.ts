import type { ShipPieces } from "../../types";
import { makeEmptyBoard, startingBoard } from "../starting-board";
import { autoPlace } from "./auto-place";

describe("autoPlace", () => {
	it("should place all ships on an empty board", () => {
		const emptyBoard = structuredClone(startingBoard);

		const pieces: ShipPieces = [5, 4, 4, 3, 2];
		const newBoard = autoPlace(emptyBoard, pieces);

		// Count the number of ship cells placed
		const shipCells = newBoard.flat().filter((cell) => cell.hasShip);
		expect(shipCells.length).toBe(pieces.reduce((a, b) => a + b, 0));
	});

	it("should not overlap ships", () => {
		const emptyBoard = structuredClone(startingBoard);

		const pieces: ShipPieces = [5, 4, 3];
		const newBoard = autoPlace(emptyBoard, pieces);

		// Check that no two ships overlap
		const shipPositions = new Set<string>();
		newBoard.forEach((row, i) => {
			row.forEach((cell, j) => {
				if (cell.hasShip) {
					const pos = `${i},${j}`;
					expect(shipPositions.has(pos)).toBe(false);
					shipPositions.add(pos);
				}
			});
		});
	});

	it("should handle small boards", () => {
		const smallBoard = makeEmptyBoard(5);

		const pieces: ShipPieces = [3, 2];
		const newBoard = autoPlace(smallBoard, pieces);

		const shipCells = newBoard.flat().filter((cell) => cell.hasShip);

		expect(shipCells.length).toBe(pieces.reduce((a, b) => a + b, 0));
	});

	it("should return the same board if no pieces to place", () => {
		const board = structuredClone(startingBoard);

		const pieces: ShipPieces = [];
		const newBoard = autoPlace(board, pieces);
		expect(newBoard).toEqual(board);
	});

	it("should throw an error if placement is impossible", () => {
		const tinyBoard = makeEmptyBoard(3);
		const pieces: ShipPieces = [4]; // Impossible to place a ship of size 4 on a 3x3 board

		expect(() => autoPlace(tinyBoard, pieces)).toThrow(
			"Failed to place ship of size 4 after 1000 attempts",
		);
	});
});
