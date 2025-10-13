export type CellVisibleState = "hit" | "miss" | "empty" | "ship";
export interface CellState {
	myView: CellVisibleState;
	opponnentView: CellVisibleState;
	hasShip: boolean;
}

export type Board = CellState[][];

export type ShipPieces = number[];

export type Mode = "placing" | "playing" | "game-over";

export type Orientation = "horizontal" | "vertical";

export type State =
	| "placing-player1"
	| "transition-to-placing-player2"
	| "placing-player2"
	| "transition-to-playing-player1"
	| "playing-player1"
	| "transition-to-playing-player2"
	| "playing-player2"
	| "game-over";

export interface GameState {
	state: State;
	next: () => void;
	end: () => void;
	reset: () => void;
	isTerminal: boolean;
	turn: number;
}
