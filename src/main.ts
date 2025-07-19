import { readFileSync } from "node:fs";
import type { Board, Cell, FilledCell, Pos } from "./types";
import { cloneBoard, decode, encode, enumerate } from "./utils.js";

const findEmpty = (board: Board): Pos | null => {
	for (const [y, row] of enumerate(board)) {
		for (const [x, cell] of enumerate(row)) {
			if (cell === 0) {
				return [x, y] as Pos;
			}
		}
	}

	return null;
};

const listRowValues = (board: Board, pos: Pos): FilledCell[] => {
	const [_, posY] = pos;
	const filledValues: FilledCell[] = [];

	for (let x = 0; x < 9; x++) {
		const cell = board[posY][x];
		if (cell !== 0) {
			filledValues.push(cell);
		}
	}

	return filledValues;
};

const listColumnValues = (board: Board, pos: Pos): FilledCell[] => {
	const [posX, _] = pos;
	const filledValues: FilledCell[] = [];

	for (let y = 0; y < 9; y++) {
		const cell = board[y][posX];
		if (cell !== 0) {
			filledValues.push(cell);
		}
	}

	return filledValues;
};

const listSquareValues = (board: Board, pos: Pos): FilledCell[] => {
	const [posX, posY] = pos;

	const offsetX = Math.trunc(posX / 3) * 3;
	const offsetY = Math.trunc(posY / 3) * 3;

	const filledValues = new Set<FilledCell>();

	for (let iy = 0; iy < 3; iy++) {
		const y = iy + offsetY;

		for (let ix = 0; ix < 3; ix++) {
			const x = ix + offsetX;
			const cell = board[y][x];

			if (cell !== 0) {
				filledValues.add(cell);
			}
		}
	}

	return [...filledValues];
};

const findOptions = (board: Board, pos: Pos): Cell[] => {
	const options = new Set<FilledCell>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

	for (const value of listRowValues(board, pos)) {
		options.delete(value);
	}

	for (const value of listColumnValues(board, pos)) {
		options.delete(value);
	}

	for (const value of listSquareValues(board, pos)) {
		options.delete(value);
	}

	return [...options];
};

const put = (board: Board, pos: Pos, cell: Cell): Board => {
	const [posX, posY] = pos;
	const updated = cloneBoard(board);
	updated[posY][posX] = cell;

	return updated;
};

const search = (board: Board): Board | null => {
	const pos = findEmpty(board);

	if (pos === null) {
		return board;
	}

	const options = findOptions(board, pos);

	for (const option of options) {
		const result = search(put(board, pos, option));
		if (result !== null) {
			return result;
		}
	}

	return null;
};

const formatBoard = (board: Board): string => {
	const lines: string[] = [];

	for (const [y, row] of enumerate(board)) {
		let line = "";
		for (const [x, cell] of enumerate(row)) {
			line += cell === 0 ? "." : cell.toString();
			if (x % 3 === 2) {
				line += "|";
			}
		}

		lines.push(line.slice(0, -1));

		if (y % 3 === 2) {
			lines.push("---+---+---");
		}
	}

	return lines.slice(0, -1).join("\n");
};

const main = () => {
	const input = readFileSync("/dev/stdin", "utf8").toString();
	const query = decode(input);

	if (query === null) {
		console.log("malformed input given.");
		return;
	}

	console.log(`${formatBoard(query)}\n`);

	const result = search(query);
	if (result === null) {
		console.log("no possible result found.");
		return;
	}

	console.log(`${formatBoard(result)}\n`);

	console.log(encode(result));
};

main();
