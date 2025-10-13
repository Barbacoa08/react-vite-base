import { Fragment, useMemo } from "react";
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
				key={`cell-${rowIndex}-${colIndex}-${cellState}`}
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
}) => (
	<button
		type="button"
		aria-label="click to place strike"
		className="cell"
		disabled={isCellDisabled(gameState, cellState, isMyBoard)}
		onClick={() => onClick(x, y)}
	>
		{buildViewState(cellState, isMyBoard)}
	</button>
);

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
	const view = isMyBoard ? cellState.myView : cellState.opponnentView;
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
