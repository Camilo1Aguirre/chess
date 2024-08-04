// src/logic/moveFunctions.js
import { BLACK_CHIPS, WHITE_CHIPS } from '../constants';
import { getEndPosition } from './getPositionChip';

/**
 * Promueve un peón si alcanza la última fila.
 * @param {string} chip - La pieza a mover.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 */
export const promotePawn = (chip, toIndex, board) => {
  const [toRow] = getEndPosition(toIndex);
  const lastRow = chip === BLACK_CHIPS.pawn ? 7 : 0;

  if (toRow === lastRow) {
    const colorChip = chip === BLACK_CHIPS.pawn ? BLACK_CHIPS : WHITE_CHIPS;
    board[toIndex] = colorChip.queen; // Actualiza la pieza en el tablero
  }
};

/**
 * Reemplaza una pieza en el tablero.
 * @param {string} chip - La pieza a mover.
 * @param {number} fromIndex - El índice de origen.
 * @param {number} toIndex - El índice de destino.
 * @param {Array} board - El estado actual del tablero.
 */
export const replaceChip = (chip, fromIndex, toIndex, board) => {
  board[fromIndex] = null;
  board[toIndex] = chip;
};

export const captureChip = (turn, toIndex, board) => {
  const opponentChips =
    turn === BLACK_CHIPS ? Object.values(WHITE_CHIPS) : Object.values(BLACK_CHIPS);
  if (opponentChips == null) {
    return false;
  } else {
    return Object.values(opponentChips).includes(board[toIndex]);
  }
};
