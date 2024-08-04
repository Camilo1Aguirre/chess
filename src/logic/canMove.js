// File canMove.js
import { BLACK_CHIPS } from '../constants';
import { isUnderThreat } from './threats';
import { getEndPosition, getStartPosition } from './getPositionChip';
import { captureChip } from './moveFunctions';

/**
 * Determina si una ficha puede moverse a una casilla en especifico
 * @param {string} chip - La pieza a mover.
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} chips - Es el conjunto de la pieza a mover
 * @param {boolean} capture - Aplica solo para el peón si se analiza que captura en diagonal
 */
export const canMove = (chip, fromIndex, toIndex, board, chips, capture = false) => {
  switch (chip) {
    case chips.bishop:
      return canMoveBishop(fromIndex, toIndex, board, chips);
    case chips.horse:
      return canMoveHorse(fromIndex, toIndex, board, chips);
    case chips.king:
      return canMoveKing(fromIndex, toIndex, board, chips);
    case chips.pawn:
      return canMovePawn(chip, fromIndex, toIndex, board, chips, capture);
    case chips.queen:
      return canMoveQueen(chip, fromIndex, toIndex, board, chips);
    case chips.rook:
      return canMoveRook(fromIndex, toIndex, board, chips);
    default:
      return false;
  }
};

/**
 * Determina si una ficha puede moverse a una casilla en especifico
 * @param {string} chip - La pieza a mover.
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} turn - Es el conjunto de la pieza a mover
 * @param {boolean} capture - Aplica solo para el peón si se analiza que captura en diagonal
 */
const canMovePawn = (chip, fromIndex, toIndex, board, turn, capture) => {
  const [fromRow, fromCol] = getStartPosition(fromIndex);
  const [toRow, toCol] = getEndPosition(toIndex);
  const isBlack = chip === BLACK_CHIPS.pawn;
  const step = isBlack ? 1 : -1;
  const initialRow = isBlack ? 1 : 6;
  const doubleStepRow = isBlack ? 3 : 4;

  if (turn.pawn !== chip) return false;

  if (toRow === fromRow + step && fromCol === toCol && board[toIndex] === null && !capture) {
    // Movimiento una casilla hacia adelante
    return true;
  }

  // Movimiento inicial de dos casillas
  if (
    fromRow === initialRow &&
    toRow === doubleStepRow &&
    fromCol === toCol &&
    board[toIndex] === null &&
    !capture
  ) {
    return true;
  }

  // Captura en diagonal
  if (
    toRow === fromRow + step &&
    Math.abs(fromCol - toCol) === 1 &&
    (captureChip(turn, toIndex, board) || capture)
  ) {
    return true;
  }

  return false;
};

/**
 * Determina si una ficha puede moverse a una casilla en especifico
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} turn - Es el conjunto de la pieza a mover
 */
const canMoveRook = (fromIndex, toIndex, board, turn) => {
  const [fromRow, fromCol] = getStartPosition(fromIndex);
  const [toRow, toCol] = getEndPosition(toIndex);

  if (turn.rook !== board[fromIndex]) {
    if (turn.queen !== board[fromIndex]) return false;
  }

  // Movimiento horizontal
  if (fromRow === toRow) {
    const step = toCol > fromCol ? 1 : -1;
    for (let col = fromCol + step; col !== toCol; col += step) {
      if (board[fromRow * 8 + col] !== null) {
        return false; // Hay una pieza en el camino
      }
    }
  }

  // Movimiento vertical
  if (fromCol === toCol) {
    const step = toRow > fromRow ? 1 : -1;

    for (let row = fromRow + step; row !== toRow; row += step) {
      if (board[row * 8 + fromCol] !== null) {
        return false; // Hay una pieza en el camino
      }
    }
  }

  // Verificar si la casilla de destino está vacía o tiene una pieza del oponente
  if (
    (fromCol === toCol || fromRow === toRow) &&
    (board[toIndex] === null || captureChip(turn, toIndex, board))
  ) {
    return true;
  }

  return false;
};

/**
 * Determina si una ficha puede moverse a una casilla en especifico
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} turn - Es el conjunto de la pieza a mover
 */
const canMoveKing = (fromIndex, toIndex, board, turn) => {
  const [fromRow, fromCol] = getStartPosition(fromIndex);
  const [toRow, toCol] = getEndPosition(toIndex);

  if (turn.king !== board[fromIndex]) return false;

  if (
    Math.abs(fromRow - toRow) <= 1 &&
    Math.abs(fromCol - toCol) <= 1 &&
    (board[toIndex] === null || captureChip(turn, toIndex, board))
  ) {
    if (!isUnderThreat(toIndex, board, turn)) {
      return true;
    }
  }

  return false;
};

/**
 * Determina si una ficha puede moverse a una casilla en especifico
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} turn - Es el conjunto de la pieza a mover
 */
const canMoveBishop = (fromIndex, toIndex, board, turn) => {
  const [fromRow, fromCol] = getStartPosition(fromIndex);
  const [toRow, toCol] = getEndPosition(toIndex);

  if (turn.bishop !== board[fromIndex]) {
    if (turn.queen !== board[fromIndex]) {
      return false;
    }
  }

  // Verificar que el movimiento sea diagonal
  if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) {
    return false;
  }

  // Determinar la dirección del movimiento
  const rowStep = toRow > fromRow ? 1 : -1;
  const colStep = toCol > fromCol ? 1 : -1;

  // Verificar si hay piezas en el camino
  let row = fromRow + rowStep;
  let col = fromCol + colStep;
  while (row !== toRow && col !== toCol) {
    if (board[row * 8 + col] !== null) {
      return false;
    }
    row += rowStep;
    col += colStep;
  }

  // Verificar si la casilla de destino está vacía o tiene una pieza del oponente
  if (board[toIndex] === null || captureChip(turn, toIndex, board)) {
    return true;
  }

  return false;
};

/**
 * Determina si una ficha puede moverse a una casilla en especifico
 * @param {string} chip - La pieza a mover.
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} turn - Es el conjunto de la pieza a mover
 */
const canMoveQueen = (chip, fromIndex, toIndex, board, turn) => {
  if (turn.queen !== board[fromIndex]) return false;
  if (
    canMoveBishop(chip, fromIndex, toIndex, board, turn) ||
    canMoveRook(chip, fromIndex, toIndex, board, turn)
  ) {
    return true;
  }

  return false;
};

/**
 * Determina si una ficha puede moverse a una casilla en especifico
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} turn - Es el conjunto de la pieza a mover
 */
const canMoveHorse = (fromIndex, toIndex, board, turn) => {
  const [fromRow, fromCol] = getStartPosition(fromIndex);
  const [toRow, toCol] = getEndPosition(toIndex);

  if (turn.horse !== board[fromIndex]) return false;

  if (
    Math.abs(fromRow - toRow) === 2 &&
    Math.abs(fromCol - toCol) === 1 &&
    (board[toIndex] === null || captureChip(turn, toIndex, board))
  ) {
    return true;
  }

  if (
    Math.abs(fromRow - toRow) === 1 &&
    Math.abs(fromCol - toCol) === 2 &&
    (board[toIndex] === null || captureChip(turn, toIndex, board))
  ) {
    return true;
  }

  return false;
};
