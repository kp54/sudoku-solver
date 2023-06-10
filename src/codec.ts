import type {Board, Cell, WritableBoard} from './types';

export const decode = (value: string): Board => {
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

export const encode = (board: Board): string => board.flatMap(row => row.join('')).join('');
