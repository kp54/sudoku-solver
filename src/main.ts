import { readFileSync } from "node:fs";
import { decode, encode } from "./codec.js";
import type { Board, Cell, FilledCell, Pos, WritableBoard } from "./types";

const enumerate = <T extends readonly unknown[]>(
	value: T,
): Array<[number, T[number]]> => value.map((x, i) => [i, x]);

const findEmpty = (board: Board): Pos | undefined => {
	for (const [i, row] of enumerate(board)) {
		for (const [j, cell] of enumerate(row)) {
			if (cell === 0) {
				return [j, i] as Pos;
			}
		}
	}

	return undefined;
};

const listGroupValues = (board: Board, pos: Pos): FilledCell[] => {
	const [posX, posY] = pos;

	const offsetX = Math.trunc(posX / 3) * 3;
	const offsetY = Math.trunc(posY / 3) * 3;

	const filledValues = new Set<FilledCell>();

	for (let i = 0; i < 3; i++) {
		const y = i + offsetY;

		for (let j = 0; j < 3; j++) {
			const x = j + offsetX;
			const cell = board[y][x];

			if (cell !== 0) {
				filledValues.add(cell);
			}
		}
	}

	return [...filledValues];
};

const findOptions = (board: Board, pos: Pos): Cell[] => {
	const [posX, posY] = pos;
	const options = new Set<FilledCell>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

	for (let i = 0; i < 9; i++) {
		const cell = board[posY][i];
		if (cell !== 0) {
			options.delete(cell);
		}
	}

	for (let i = 0; i < 9; i++) {
		const cell = board[i][posX];
		if (cell !== 0) {
			options.delete(cell);
		}
	}

	for (const value of listGroupValues(board, pos)) {
		options.delete(value);
	}

	return [...options];
};

const put = (board: Board, pos: Pos, cell: Cell): Board => {
	const [posX, posY] = pos;
	const newBoard = structuredClone(board as WritableBoard);
	newBoard[posY][posX] = cell;

	return newBoard;
};

const search = (board: Board): Board | undefined => {
	const pos = findEmpty(board);

	if (pos === undefined) {
		return board;
	}

	const options = findOptions(board, pos);

	for (const option of options) {
		const result = search(put(board, pos, option));
		if (result !== undefined) {
			return result;
		}
	}

	return undefined;
};

const formatBoard = (board: Board): string => {
	const lines: string[] = [];

	for (const [i, row] of enumerate(board)) {
		let line = "";
		for (const [j, cell] of enumerate(row)) {
			line += cell.toString();
			if ((j + 1) % 3 === 0) {
				line += "|";
			}
		}

		lines.push(line.slice(0, -1));

		if ((i + 1) % 3 === 0) {
			lines.push("---+---+---");
		}
	}

	return lines.slice(0, -1).join("\n");
};

const main = () => {
	const input = readFileSync("/dev/stdin", "utf8").toString();

	const result = search(decode(input));
	if (result === undefined) {
		console.log("no possible result found.");
		return;
	}

	console.log(formatBoard(result));
	console.log(encode(result));
};

main();
