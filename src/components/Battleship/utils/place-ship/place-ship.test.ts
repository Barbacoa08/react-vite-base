import type { Board } from "../../types";
import { EmptyCell } from "../starting-board";
import { placeShip } from ".";

describe("placeShip", () => {
	const emptyBoard: Board = [
		[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
		[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
		[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
		[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
		[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
	] as const;

	it("places a horizontal ship correctly", () => {
		const result = placeShip(emptyBoard, 3, 1, 1, true);

		expect(result).not.toBeNull();
		expect([
			result?.[1][1].hasShip,
			result?.[1][2].hasShip,
			result?.[1][3].hasShip,
		]).toEqual([true, true, true]);
	});

	it("places a vertical ship correctly", () => {
		const result = placeShip(emptyBoard, 2, 0, 2, false);

		expect(result).not.toBeNull();
		expect([result?.[0][2].hasShip, result?.[1][2].hasShip]).toEqual([
			true,
			true,
		]);
	});

	it("returns null for out-of-bounds horizontal placement", () => {
		expect(placeShip(emptyBoard, 4, 0, 2, true)).toBeNull();
	});

	it("returns null for out-of-bounds vertical placement", () => {
		expect(placeShip(emptyBoard, 3, 3, 0, false)).toBeNull();
	});

	it("returns null for overlapping ship placement", () => {
		const boardWithShip = placeShip(emptyBoard, 3, 1, 1, true) as Board;
		expect(boardWithShip).not.toBeNull();

		expect(placeShip(boardWithShip, 2, 1, 2, false)).toBeNull();
	});
});
