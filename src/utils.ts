import type { Board, Cell, WritableBoard } from "./types";

export const enumerate = <T extends readonly unknown[]>(
	value: T,
): Array<[number, T[number]]> => value.map((x, i) => [i, x]);

export const newBoard = (): WritableBoard =>
	new Array<number[]>(9)
		.fill([])
		.map(() => new Array<number>(9).fill(0)) as WritableBoard;

export const cloneBoard = (board: Board): WritableBoard =>
	structuredClone(board) as WritableBoard;

export const decode = (value: string): Board => {
	const board = newBoard();

	for (let y = 0; y < 9; y++) {
		const line = value.slice(9 * y, 9 * (y + 1));
		for (let x = 0; x < 9; x++) {
			const cell = line[x];
			board[y][x] = Number.parseInt(cell, 10) as Cell;
		}
	}

	return board;
};

export const encode = (board: Board): string =>
	board.map((row) => row.join("")).join("");
