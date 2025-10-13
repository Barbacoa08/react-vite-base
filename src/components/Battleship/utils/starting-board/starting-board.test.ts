import { startingBoard } from ".";

describe("startingBoard", () => {
	it("creates a 10x10 board with all cells set to 'empty'", () => {
		expect(startingBoard.length).toBe(10);
		startingBoard.forEach((row) => {
			expect(row.length).toBe(10);
			row.forEach((cell) => {
				expect(cell.myView).toBe("empty");
				expect(cell.opponnentView).toBe("empty");
				expect(cell.hasShip).toBe(false);
			});
		});
	});
});
