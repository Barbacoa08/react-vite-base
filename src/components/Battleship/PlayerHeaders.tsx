import { useMemo } from "react";
import { useBattleshipContext } from "./BattleshipContext";

export const Player1BoardHeader = () => {
	const { state } = useBattleshipContext().gameState;

	const addtionalText = useMemo(() => {
		let result = "";

		if (state === "placing-player1") {
			result = "(Place your ships 🚢)";
		} else if (state === "playing-player2") {
			result = "(Fire away! 🎯)";
		}

		return result;
	}, [state]);

	return <h2>Player 1's Board {addtionalText}</h2>;
};

export const Player2BoardHeader = () => {
	const { state } = useBattleshipContext().gameState;

	const addtionalText = useMemo(() => {
		let result = "";

		if (state === "placing-player2") {
			result = "(Place your ships 🚢)";
		} else if (state === "playing-player1") {
			result = "(Fire away! 🎯)";
		}

		return result;
	}, [state]);

	return <h2>Player 2's Board {addtionalText}</h2>;
};
