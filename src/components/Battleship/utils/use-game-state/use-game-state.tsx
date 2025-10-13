import { useCallback, useEffect, useMemo, useState } from "react";
import type { GameState, State } from "../../types";

const transitions: Record<State, State> = {
	"placing-player1": "transition-to-placing-player2",
	"transition-to-placing-player2": "placing-player2",
	"placing-player2": "transition-to-playing-player1",
	"transition-to-playing-player1": "playing-player1",
	"playing-player1": "transition-to-playing-player2",
	"transition-to-playing-player2": "playing-player2",
	"playing-player2": "transition-to-playing-player1",
	"game-over": "game-over",
};

export const MaximumTurns = 200;

export const useGameState = (): GameState => {
	const [state, setState] = useState<State>("placing-player1");

	const next = useCallback(() => {
		setState((prev) => transitions[prev]);
	}, []);

	const end = useCallback(() => {
		setState("game-over");
	}, []);

	const [turn, setTurn] = useState(0);
	useEffect(() => {
		if (turn > MaximumTurns) {
			end();
			alert("Game ended due to too many turns");
		}
	}, [turn, end]);
	useEffect(() => {
		if (state === "playing-player1" || state === "playing-player2") {
			setTurn((prev) => prev + 1);
		}
	}, [state]);

	const reset = useCallback(() => {
		setState("placing-player1");
		setTurn(0);
	}, []);

	const isTerminal = useMemo(() => state === "game-over", [state]);

	return { state, next, end, reset, isTerminal, turn };
};
