import { Fragment, useCallback, useMemo } from "react";
import { useBattleshipContext } from "./BattleshipContext";
import type { Board, CellState, State } from "./types";

export const BattleshipBoard = ({
	board,
	isMyBoard,
	onClick,
}: {
	board: Board;
	isMyBoard: boolean;
	onClick: (x: number, y: number) => void;
}) => {
	const {
		gameState: { state },
		placementOrientation,
	} = useBattleshipContext();

	const boardClassNames = useMemo(() => {
		const classNames = ["board"];

		if (isMyBoard && state.includes("placing") && placementOrientation) {
			classNames.push(placementOrientation);
		}

		return classNames.join(" ");
	}, [state, placementOrientation, isMyBoard]);

	return (
		<div className={boardClassNames}>
			{board.map((row, i) => (
				<BoardRow
					// biome-ignore lint/suspicious/noArrayIndexKey: no better key
					key={`board-row-${i}`}
					row={row}
					rowIndex={i}
					onClick={onClick}
					gameState={state}
					isMyBoard={isMyBoard}
				/>
			))}
		</div>
	);
};

const BoardRow = ({
	gameState,
	row,
	rowIndex,
	onClick,
	isMyBoard,
}: {
	gameState: State;
	row: CellState[];
	rowIndex: number;
	onClick: (x: number, y: number) => void;
	isMyBoard: boolean;
}) => (
	<Fragment>
		{row.map((cellState, colIndex) => (
			<BoardCell
				// biome-ignore lint/suspicious/noArrayIndexKey: no better key
				key={`cell-${rowIndex}-${colIndex}`}
				x={rowIndex}
				y={colIndex}
				cellState={cellState}
				onClick={onClick}
				gameState={gameState}
				isMyBoard={isMyBoard}
			/>
		))}
	</Fragment>
);

const BoardCell = ({
	x,
	y,
	gameState,
	cellState,
	onClick,
	isMyBoard,
}: {
	x: number;
	y: number;
	gameState: State;
	cellState: CellState;
	onClick: (x: number, y: number) => void;
	isMyBoard: boolean;
}) => {
	const {
		placementOrientation,
		player1Hover,
		setPlayer1Hover,
		player2Hover,
		setPlayer2Hover,
		player1ShipsToPlace,
		player2ShipsToPlace,
	} = useBattleshipContext();

	const setPlayerHover = useCallback(
		(
			xPos: number,
			yPos: number,
			shipLength: number,
			orientation: "horizontal" | "vertical",
			setHover: (hover: string[]) => void,
		) => {
			const newHover = [];
			for (let i = 0; i < shipLength; i++) {
				newHover.push(
					orientation === "vertical"
						? `[${xPos + i}, ${yPos}]`
						: `[${xPos}, ${yPos + i}]`,
				);
			}
			setHover(newHover);
		},
		[],
	);

	const setPlacingCells = useCallback(
		(xPos: number, yPos: number) => {
			if (player1ShipsToPlace.length > 0 && gameState === "placing-player1") {
				setPlayerHover(
					xPos,
					yPos,
					player1ShipsToPlace[0],
					placementOrientation,
					setPlayer1Hover,
				);
			} else if (
				player2ShipsToPlace.length > 0 &&
				gameState === "placing-player2"
			) {
				setPlayerHover(
					xPos,
					yPos,
					player2ShipsToPlace[0],
					placementOrientation,
					setPlayer2Hover,
				);
			}
		},
		[
			gameState,
			setPlayer1Hover,
			setPlayer2Hover,
			placementOrientation,
			player1ShipsToPlace,
			player2ShipsToPlace,
			setPlayerHover,
		],
	);

	const unsetPlacingCells = useCallback(() => {
		if (
			[
				"placing-player1",
				"placing-player2",
				"transition-to-placing-player2",
				"transition-to-playing-player1",
			].includes(gameState)
		) {
			setPlayer1Hover([]);
			setPlayer2Hover([]);
		}
	}, [gameState, setPlayer1Hover, setPlayer2Hover]);

	const isFocused = useMemo(() => {
		if (player1Hover.length > 0) {
			return player1Hover.includes(`[${x}, ${y}]`);
		} else if (player2Hover.length > 0) {
			return player2Hover.includes(`[${x}, ${y}]`);
		}

		return false;
	}, [player1Hover, player2Hover, x, y]);

	return (
		<button
			type="button"
			aria-label="click to place strike"
			className={`cell ${isFocused ? "ship-placement-mode" : ""}`}
			onMouseEnter={() => setPlacingCells(x, y)}
			onMouseLeave={unsetPlacingCells}
			onFocus={() => setPlacingCells(x, y)}
			onBlur={unsetPlacingCells}
			disabled={isCellDisabled(gameState, cellState, isMyBoard)}
			onClick={() => onClick(x, y)}
		>
			{buildViewState(cellState, isMyBoard)}
		</button>
	);
};

const isCellDisabled = (
	state: State,
	cellState: CellState,
	isMyBoard: boolean,
) => {
	if (state.includes("transition") || state === "game-over") {
		return true;
	} else if (state.includes("placing") && !isMyBoard) {
		return true;
	} else if (state.includes("placing") && isMyBoard) {
		return cellState.hasShip; // can't place on top of another ship
	} else if (state.includes("playing") && isMyBoard) {
		return true; // can't click on your own board in playing state
	} else if (state.includes("playing") && !isMyBoard) {
		return cellState.myView === "hit" || cellState.myView === "miss";
	}

	// should not happen
	return false;
};

const buildViewState = (cellState: CellState, isMyBoard: boolean) => {
	const view = isMyBoard ? cellState.myView : cellState.opponentView;
	switch (view) {
		case "hit":
			return "💥";
		case "miss":
			return "❌";
		case "ship":
			return "🚢";
		default:
			return "○";
	}
};
