import type { Board, CellState } from "../../types";

const BOARD_SIZE = 10;
export const EmptyCell: CellState = {
	myView: "empty" as const,
	opponnentView: "empty" as const,
	hasShip: false,
} as const;

// NOTE: `*fill( *.fill() )` has issues, see: https://stackoverflow.com/a/47057799/1022765
export const startingBoard: Board = Array.from(new Array(BOARD_SIZE), () =>
	new Array(BOARD_SIZE).fill(EmptyCell),
);

export const makeEmptyBoard = (size: number): Board =>
	Array.from(new Array(size), () => new Array(size).fill(EmptyCell));
