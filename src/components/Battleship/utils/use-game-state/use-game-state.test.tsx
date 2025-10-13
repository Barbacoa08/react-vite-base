import { act, renderHook } from "@testing-library/react-hooks";
import { MaximumTurns, useGameState } from ".";

describe("useGameState", () => {
	it("should initialize with the correct state", () => {
		const { result } = renderHook(() => useGameState());
		expect(result.current.state).toBe("placing-player1");
	});

	it("should transition to the next state correctly", () => {
		const { result } = renderHook(() => useGameState());
		act(() => {
			result.current.next();
		});
		expect(result.current.state).toBe("transition-to-placing-player2");
	});

	it("should end the game correctly", () => {
		const { result } = renderHook(() => useGameState());
		act(() => {
			result.current.end();
		});
		expect(result.current.state).toBe("game-over");
	});

	it("should reset the game correctly", () => {
		const { result } = renderHook(() => useGameState());
		act(() => {
			result.current.reset();
		});
		expect(result.current.state).toBe("placing-player1");

		act(() => {
			// move random point in game
			result.current.next();
			result.current.next();
			result.current.next();
			result.current.next();

			result.current.end();
		});
		expect(result.current.state).toBe("game-over");
	});

	it("should correctly identify terminal state", () => {
		const { result } = renderHook(() => useGameState());
		expect(result.current.isTerminal).toBe(false);

		act(() => {
			result.current.end();
		});
		expect(result.current.isTerminal).toBe(true);
	});

	it("should track turns correctly", () => {
		const { result } = renderHook(() => useGameState());
		expect(result.current.turn).toBe(0);

		act(() => {
			result.current.next(); // transition-to-placing-player2
		});
		expect(result.current.turn).toBe(0);

		act(() => {
			result.current.next(); // placing-player2
		});
		expect(result.current.turn).toBe(0);

		act(() => {
			result.current.next(); // transition-to-playing-player1
		});
		expect(result.current.turn).toBe(0);

		act(() => {
			result.current.next(); // playing-player1
		});
		expect(result.current.turn).toBe(1);

		act(() => {
			result.current.next(); // transition-to-playing-player2
			result.current.next(); // playing-player2
		});
		expect(result.current.turn).toBe(2);
	});

	it(`should force end if turns exceed ${MaximumTurns}`, () => {
		const { result } = renderHook(() => useGameState());
		expect(result.current.turn).toBe(0);

		for (let i = 0; i < MaximumTurns * 2; i++) {
			act(() => {
				result.current.next();
				result.current.next();
			});
		}
		expect(result.current.turn).toBe(MaximumTurns + 1); // locks at MaximumTurns + 1
		expect(result.current.state).toBe("game-over");
		expect(result.current.isTerminal).toBe(true);
	});
});
