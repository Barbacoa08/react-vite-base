import { Fragment, useCallback, useState } from "react";

import "./Checkerboard.css";

// NOTE: `*fill( *.fill() )` has issues, see: https://stackoverflow.com/a/47057799/1022765
const startingBoard = Array.from(Array(8), () => new Array(8).fill(0));

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
						{boardRow.map((boardCell: number, j) => (
							<button
								type="button"
								key={`cell-{${i}-${j}-${boardCell}}`}
								aria-label="click to increase count"
								className={`${(i + j) % 2 === 0 ? "black" : "white"}`}
								onClick={() => handleClick(i, j)}
							>
								{boardCell}
							</button>
						))}
					</Fragment>
				))}
			</div>
		</main>
	);
};
