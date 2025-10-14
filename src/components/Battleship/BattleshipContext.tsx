import { createContext, useContext } from "react";
import type { Board, GameState, Orientation } from "./types";

export interface BattleshipContextType {
	gameState: GameState;

	placementOrientation: Orientation;
	setPlacementOrientation: (orientation: Orientation) => void;

	player1Board: Board;
	setPlayer1Board: (board: Board) => void;

	player1Hover: string[];
	setPlayer1Hover: (hoveredCells: string[]) => void;

	player2Hover: string[];
	setPlayer2Hover: (hoveredCells: string[]) => void;

	player2Board: Board;
	setPlayer2Board: (board: Board) => void;

	player1ShipsToPlace: number[];
	setPlayer1ShipsToPlace: (ships: number[]) => void;

	player2ShipsToPlace: number[];
	setPlayer2ShipsToPlace: (ships: number[]) => void;

	handleAutoPlace: (isPlayer1: boolean) => void;

	handleClickPlayer1Board: (i: number, j: number) => void;

	handleClickPlayer2Board: (i: number, j: number) => void;
}

interface BattleshipContextProviderProps {
	children: React.ReactNode;
	value: BattleshipContextType;
}

const BattleshipContext = createContext<BattleshipContextType>({
	gameState: {} as GameState,
	placementOrientation: "horizontal",
	setPlacementOrientation: () => {},
	player1Board: [[]],
	setPlayer1Board: () => {},
	player2Board: [[]],
	setPlayer2Board: () => {},
	player1ShipsToPlace: [],
	setPlayer1ShipsToPlace: () => {},
	player2ShipsToPlace: [],
	setPlayer2ShipsToPlace: () => {},
	handleAutoPlace: () => {},
	handleClickPlayer1Board: () => {},
	handleClickPlayer2Board: () => {},
	player1Hover: [],
	setPlayer1Hover: () => {},
	player2Hover: [],
	setPlayer2Hover: () => {},
});

export const BattleshipContextProvider: React.FC<
	BattleshipContextProviderProps
> = ({ children, value }) => (
	<BattleshipContext.Provider value={value}>
		{children}
	</BattleshipContext.Provider>
);

export const useBattleshipContext = () => {
	const context = useContext(BattleshipContext);

	if (context === undefined) {
		throw new Error(
			"useBattleshipContext must be used within a BattleshipContextProvider",
		);
	}

	return context;
};
