import { useState } from 'react';
import { Icon } from './Icon';

// A small playable illustration of the Connect 4 logic described on the
// project page. Written for this portfolio — not the original project code.

const ROWS = 6;
const COLS = 7;
type Cell = 0 | 1 | 2;
const empty = (): Cell[][] => Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0));

function winningLine(b: Cell[][], r: number, c: number): [number, number][] | null {
  const p = b[r][c];
  const dirs: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (const [dr, dc] of dirs) {
    const line: [number, number][] = [[r, c]];
    for (const s of [1, -1]) {
      let rr = r + dr * s;
      let cc = c + dc * s;
      while (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS && b[rr][cc] === p) {
        line.push([rr, cc]);
        rr += dr * s;
        cc += dc * s;
      }
    }
    if (line.length >= 4) return line;
  }
  return null;
}

export function ConnectFour() {
  const [board, setBoard] = useState<Cell[][]>(empty);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [win, setWin] = useState<[number, number][] | null>(null);
  const [message, setMessage] = useState('Player 1 (terracotta) to move.');

  const full = board[0].every((v) => v !== 0);
  const over = Boolean(win) || full;

  const drop = (c: number) => {
    if (over) return;
    // Scan the column from the bottom row upward for the first empty cell.
    let r = ROWS - 1;
    while (r >= 0 && board[r][c] !== 0) r--;
    if (r < 0) {
      setMessage(`Column ${c + 1} is full.`);
      return;
    }
    const next = board.map((row) => row.slice()) as Cell[][];
    next[r][c] = player;
    setBoard(next);
    const line = winningLine(next, r, c);
    if (line) {
      setWin(line);
      setMessage(`Player ${player} wins with four in a row.`);
    } else if (next[0].every((v) => v !== 0)) {
      setMessage('The board is full — it’s a draw.');
    } else {
      const n = player === 1 ? 2 : 1;
      setPlayer(n);
      setMessage(`Player ${player} played column ${c + 1}. Player ${n} (${n === 1 ? 'terracotta' : 'peach'}) to move.`);
    }
  };

  const reset = () => {
    setBoard(empty());
    setPlayer(1);
    setWin(null);
    setMessage('New game. Player 1 (terracotta) to move.');
  };

  const isWin = (r: number, c: number) => win?.some(([wr, wc]) => wr === r && wc === c);

  return (
    <div className="c4">
      <div className="c4__cols" role="group" aria-label="Drop a piece">
        {Array.from({ length: COLS }).map((_, c) => (
          <button key={c} className="c4__col" onClick={() => drop(c)} disabled={over || board[0][c] !== 0} aria-label={`Drop in column ${c + 1}`}>
            <Icon name="arrowUp" size={14} className="c4__arrow" />
          </button>
        ))}
      </div>
      <div className="c4__board" aria-hidden="true">
        {board.map((row, r) =>
          row.map((v, c) => <span key={`${r}-${c}`} className={`c4__cell c4__cell--${v} ${isWin(r, c) ? 'is-win' : ''}`} />),
        )}
      </div>
      <div className="c4__bar">
        <p role="status" aria-live="polite">
          {message}
        </p>
        <button className="btn btn--small btn--outline" onClick={reset}>
          <Icon name="refresh" size={15} /> Reset
        </button>
      </div>
    </div>
  );
}
