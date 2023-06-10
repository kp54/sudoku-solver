import type {Board, Cell, WritableBoard} from "./types";

const decode = (value: string): Board => {
	// eslint-disable-next-line unicorn/no-new-array
	const board = new Array<number[]>(9).fill([]).map(_ => new Array<number>(9).fill(0)) as WritableBoard;

	for (let i = 0; i < 9; i++) {
		const line = value.slice(9 * i, 9 * (i + 1));
		for (let j = 0; j < 9; j++) {
			const cell = line[j];
			board[i][j] = Number.parseInt(cell, 10) as Cell;
		}
	}

	return board;
};

export const dataset = [
	decode('070000043040009610800634900094052000358460020000800530080070091902100005007040802'),
	decode('000470001004030008200001090007540000506100042900000000030000020600000089000600400'),
] as const;
