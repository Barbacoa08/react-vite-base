import { Fragment, useCallback, useState } from "react";

import "./Checkerboard.css";

const BOARD_SIZE = 8;

// NOTE: `*fill( *.fill() )` has issues, see: https://stackoverflow.com/a/47057799/1022765
const startingBoard = Array.from(new Array(BOARD_SIZE), () =>
	new Array(BOARD_SIZE).fill(0),
);

const getCellClassName = (i: number, j: number) =>
	(i + j) % 2 ? "black" : "white";

export const Checkerboard = () => {
	const [wholeBoard, setWholeBoard] = useState(startingBoard);
	const [largestNumberOfClicks, setLargestNumberOfClicks] = useState(0);

	const handleClick = useCallback(
		(i: number, j: number) => {
			const updatedBoard = structuredClone(wholeBoard);
			updatedBoard[i][j]++;
			setWholeBoard(updatedBoard);

			if (largestNumberOfClicks < updatedBoard[i][j]) {
				setLargestNumberOfClicks(updatedBoard[i][j]);
			}
		},
		[wholeBoard, largestNumberOfClicks],
	);

	return (
		<main>
			<h1>Checkerboard</h1>
			<p>Most clicks on a single square: {largestNumberOfClicks}</p>

			<div className="board">
				{wholeBoard.map((boardRow, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: no better key builder, unfortunately
					<Fragment key={`board-row-${i}`}>
						{boardRow.map((clickCount: number, j) => (
							<button
								type="button"
								key={`cell-{${i}-${j}-${clickCount}}`}
								aria-label="click to increase count"
								className={getCellClassName(i, j)}
								onClick={() => handleClick(i, j)}
							>
								{clickCount}
							</button>
						))}
					</Fragment>
				))}
			</div>
		</main>
	);
};
