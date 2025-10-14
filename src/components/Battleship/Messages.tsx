import { useMemo } from "react";
import { useBattleshipContext } from "./BattleshipContext";

export const TransitionMessage = () => {
	const { state, next } = useBattleshipContext().gameState;

	const hide = useMemo(() => !state.includes("transition"), [state]);

	const message = useMemo(() => {
		if (
			[
				"transition-to-placing-player2",
				"transition-to-playing-player2",
			].includes(state)
		) {
			return "Player 1, please pass the device to Player 2";
		} else if (state === "transition-to-playing-player1") {
			return "Player 2, please pass the device to Player 1";
		}

		return "no message";
	}, [state]);

	return (
		<div className={hide ? "hide" : undefined}>
			<h2>Transitioning...</h2>

			<p>{message}</p>

			<div>
				<button type="button" onClick={next}>
					I'm ready
				</button>
			</div>
		</div>
	);
};

export const GameOverMessage = () => {
	const { state } = useBattleshipContext().gameState;

	const hide = useMemo(() => state !== "game-over", [state]);

	return (
		<div className={hide ? "hide" : undefined}>
			<h2>Game Over</h2>

			<p>Thanks for playing!</p>
		</div>
	);
};

export const Player1ContentMessage = () => {
	const {
		gameState: { state },
		placementOrientation,
		player1ShipToPlace,
		handleAutoPlace,
	} = useBattleshipContext();

	return (
		<section>
			{state === "placing-player1" ? (
				<>
					<p>Remaining Ships to place: {player1ShipToPlace.length}</p>

					<p>
						You are about to place a ship of length `{player1ShipToPlace[0]}`{" "}
						{placementOrientation}.
					</p>

					<p>Press 'r' to rotate your ship</p>

					<p>
						If you would like to have the remaining ships automatically placed
						for you, you can{" "}
						<button type="button" onClick={() => handleAutoPlace(true)}>
							click here
						</button>
					</p>
				</>
			) : (
				<p>
					An indicator will be placed where your opponent attacked automatically
				</p>
			)}
		</section>
	);
};

export const Player2ContentMessage = () => {
	const {
		gameState: { state },
		placementOrientation,
		player2ShipToPlace,
		handleAutoPlace,
	} = useBattleshipContext();

	return (
		<section>
			{state === "placing-player2" ? (
				<>
					<p>Remaining Ships to place: {player2ShipToPlace.length}</p>

					<p>
						You are about to place a ship of length `{player2ShipToPlace[0]}`{" "}
						{placementOrientation}.
					</p>

					<p>Press 'r' to rotate your ship</p>

					<p>
						If you would like to have the remaining ships automatically placed
						for you, you can{" "}
						<button type="button" onClick={() => handleAutoPlace(false)}>
							click here
						</button>
					</p>
				</>
			) : (
				<p>
					An indicator will be placed where your opponent attacked automatically
				</p>
			)}
		</section>
	);
};
