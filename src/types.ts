export type FilledCell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Cell = 0 | FilledCell;
export type Row = readonly [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type Board = readonly [Row, Row, Row, Row, Row, Row, Row, Row, Row];
export type Pos = readonly [0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8];

export type WritableRow = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type WritableBoard = [WritableRow, WritableRow, WritableRow, WritableRow, WritableRow, WritableRow, WritableRow, WritableRow, WritableRow];
