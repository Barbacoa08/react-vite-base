import { useCallback, useEffect, useState } from "react";
import { Battleship } from "src/components/";
import { BattleshipContextProvider } from "src/components/Battleship/BattleshipContext";
import type {
	Board,
	Orientation,
	ShipPieces,
} from "src/components/Battleship/types";
import {
	autoPlace,
	placeShip,
	startingBoard,
	useGameState,
	useRotationHandler,
} from "src/components/Battleship/utils";

const DefaultSetOfShips: ShipPieces = [5, 4, 4, 3, 2];

export const BattleshipPage = () => {
	const gameState = useGameState();
	const { state, next, end } = gameState;

	const [placementOrientation, setPlacementOrientation] =
		useState<Orientation>("horizontal");
	useRotationHandler(setPlacementOrientation);

	const [player1Board, setPlayer1Board] = useState<Board>(startingBoard);
	const [player2Board, setPlayer2Board] = useState<Board>(startingBoard);
	const [player1ShipToPlace, setPlayer1ShipsToPlace] =
		useState<ShipPieces>(DefaultSetOfShips);
	const [player2ShipToPlace, setPlayer2ShipsToPlace] =
		useState<ShipPieces>(DefaultSetOfShips);

	// handle reset
	useEffect(() => {
		if (state === "placing-player1") {
			setPlayer1Board(startingBoard);
			setPlayer2Board(startingBoard);
			setPlayer1ShipsToPlace(DefaultSetOfShips);
			setPlayer2ShipsToPlace(DefaultSetOfShips);
		}
	}, [state]);

	// handle win condition
	useEffect(() => {
		const allShipsSunk = (board: Board) =>
			board.every((row) =>
				row.every((cell) => (cell.hasShip ? cell.myView === "hit" : true)),
			);

		if (
			state === "transition-to-playing-player1" &&
			allShipsSunk(player1Board)
		) {
			alert("Player 2 wins! 🏆");
			end();
		} else if (
			state === "transition-to-playing-player2" &&
			allShipsSunk(player2Board)
		) {
			alert("Player 1 wins! 🏆");
			end();
		}
	}, [state, player1Board, player2Board, end]);

	const handleClickPlayer1Board = useCallback(
		(i: number, j: number) => {
			if (state === "placing-player1") {
				const updatedBoard = placeShip(
					player1Board,
					player1ShipToPlace[0],
					i,
					j,
					placementOrientation === "horizontal",
				);
				if (!updatedBoard) {
					alert("Invalid placement");
				} else {
					setPlayer1Board(updatedBoard);

					const remainingShips = player1ShipToPlace.slice(1);
					setPlayer1ShipsToPlace(remainingShips);

					if (remainingShips.length === 0) {
						next();
					}
				}
			} else if (state === "playing-player2") {
				const updatedBoard = structuredClone(player1Board);
				const cell = updatedBoard[i][j];
				if (cell.opponentView === "hit" || cell.opponentView === "miss") {
					alert("Already shot here");
					return;
				}

				if (cell.hasShip) {
					updatedBoard[i][j] = {
						...cell,
						opponentView: "hit",
						myView: "hit",
					};
					alert("Hit! Great shot! 🎯");
				} else {
					updatedBoard[i][j] = {
						...cell,
						opponentView: "miss",
						myView: "miss",
					};
					alert("Miss! So close! ❌");
				}
				next();
				setPlayer1Board(updatedBoard);
			}
		},
		[player1Board, player1ShipToPlace, placementOrientation, next, state],
	);

	const handleClickPlayer2Board = useCallback(
		(i: number, j: number) => {
			if (state === "placing-player2") {
				const updatedBoard = placeShip(
					player2Board,
					player2ShipToPlace[0],
					i,
					j,
					placementOrientation === "horizontal",
				);
				if (!updatedBoard) {
					alert("Invalid placement");
				} else {
					setPlayer2Board(updatedBoard);

					const remainingShips = player2ShipToPlace.slice(1);
					setPlayer2ShipsToPlace(remainingShips);

					if (remainingShips.length === 0) {
						next();
					}
				}
			} else if (state === "playing-player1") {
				const updatedBoard = structuredClone(player2Board);
				const cell = updatedBoard[i][j];
				if (cell.opponentView === "hit" || cell.opponentView === "miss") {
					alert("Already shot here");
					return;
				}

				if (cell.hasShip) {
					updatedBoard[i][j] = {
						...cell,
						opponentView: "hit",
						myView: "hit",
					};
					alert("Hit! Great shot! 🎯");
				} else {
					updatedBoard[i][j] = {
						...cell,
						opponentView: "miss",
						myView: "miss",
					};
					alert("Miss! So close! ❌");
				}
				next();
				setPlayer2Board(updatedBoard);
			}
		},
		[player2Board, next, placementOrientation, player2ShipToPlace, state],
	);

	const handleAutoPlace = useCallback(
		(isPlayer1: boolean) => {
			try {
				if (isPlayer1) {
					setPlayer1Board(autoPlace(player1Board, player1ShipToPlace));
					setPlayer1ShipsToPlace([]);
				} else {
					setPlayer2Board(autoPlace(player2Board, player2ShipToPlace));
					setPlayer2ShipsToPlace([]);
				}

				next();
			} catch (e) {
				if (e instanceof Error) {
					alert(e.message);
				}
			}
		},
		[player1Board, player2Board, player1ShipToPlace, player2ShipToPlace, next],
	);

	return (
		<BattleshipContextProvider
			value={{
				gameState,
				placementOrientation,
				setPlacementOrientation,
				player1Board,
				setPlayer1Board,
				player2Board,
				setPlayer2Board,
				player1ShipToPlace,
				setPlayer1ShipsToPlace,
				player2ShipToPlace,
				setPlayer2ShipsToPlace,
				handleAutoPlace,
				handleClickPlayer1Board,
				handleClickPlayer2Board,
			}}
		>
			<Battleship />
		</BattleshipContextProvider>
	);
};
