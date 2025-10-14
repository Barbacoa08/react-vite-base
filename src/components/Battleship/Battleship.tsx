import { useMemo } from "react";
import { useGlobalContext } from "src/GlobalContext";
import { BattleshipBoard } from "./BattleshipBoard";
import { useBattleshipContext } from "./BattleshipContext";
import {
	GameOverMessage,
	Player1ContentMessage,
	Player2ContentMessage,
	TransitionMessage,
} from "./Messages";
import { Player1BoardHeader, Player2BoardHeader } from "./PlayerHeaders";

import "./Battleship.css";

export const Battleship = () => {
	const { name } = useGlobalContext();
	const {
		gameState,
		player1Board,
		player2Board,
		handleClickPlayer1Board,
		handleClickPlayer2Board,
	} = useBattleshipContext();
	const { state, turn, reset } = gameState;

	const playersTurn = useMemo(() => {
		if (state.includes("player1")) return name || "Player 1";
		if (state.includes("player2")) return "Player 2";

		// game over
		return "again";
	}, [state, name]);

	return (
		<main className="battleship-container">
			<h1>Battleship</h1>

			<section>
				<p>
					If you've had enough, you can end the game by clicking{" "}
					<button type="button" onClick={reset}>
						Reset Game
					</button>
				</p>

				<p>Let's play!</p>

				<p>The current turn number is: {turn}</p>

				<p>
					Let's go <b>{playersTurn}</b>!
				</p>
			</section>

			<TransitionMessage />
			<GameOverMessage />

			<section
				className={
					state.includes("transition") || state === "placing-player2"
						? "hide"
						: undefined
				}
			>
				<Player1BoardHeader />

				<Player1ContentMessage />

				<BattleshipBoard
					isMyBoard={state.includes("player1")}
					board={player1Board}
					onClick={handleClickPlayer1Board}
				/>
			</section>

			<section
				className={
					state.includes("transition") || state === "placing-player1"
						? "hide"
						: undefined
				}
			>
				<Player2BoardHeader />

				<Player2ContentMessage />

				<BattleshipBoard
					isMyBoard={state.includes("player2")}
					board={player2Board}
					onClick={handleClickPlayer2Board}
				/>
			</section>
		</main>
	);
};
