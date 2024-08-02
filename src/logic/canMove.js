import { BLACK_CHIPS, WHITE_CHIPS } from '../constants';
import { isUnderThreat } from './checkKing';

const getStartPosition = (fromIndex) => {
  return [Math.floor(fromIndex / 8), fromIndex % 8];
};

export const getEndPosition = (toIndex) => {
  return [Math.floor(toIndex / 8), toIndex % 8];
};

const getColorChip = (chip) => {
  if (Object.values(WHITE_CHIPS).includes(chip)) {
    return BLACK_CHIPS;
  } else if (Object.values(BLACK_CHIPS).includes(chip)) {
    return WHITE_CHIPS;
  }
  return null;
};

const captureChip = (chip, toIndex, board) => {
  const opponentChips = getColorChip(chip);
  if (opponentChips == null) {
    return false;
  } else {
    return Object.values(opponentChips).includes(board[toIndex]);
  }
};

export const canMovePawn = (chip, fromIndex, toIndex, board, turn, capture = false) => {
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
    (captureChip(chip, toIndex, board) || capture)
  ) {
    return true;
  }

  return false;
};

export const canMoveRook = (chip, fromIndex, toIndex, board, turn) => {
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
    (board[toIndex] === null || captureChip(chip, toIndex, board))
  ) {
    return true;
  }

  return false;
};

export const canMoveKing = (chip, fromIndex, toIndex, board, turn) => {
  const [fromRow, fromCol] = getStartPosition(fromIndex);
  const [toRow, toCol] = getEndPosition(toIndex);

  if (turn.king !== board[fromIndex]) return false;

  if (
    Math.abs(fromRow - toRow) <= 1 &&
    Math.abs(fromCol - toCol) <= 1 &&
    (board[toIndex] === null || captureChip(chip, toIndex, board))
  ) {
    if (!isUnderThreat(toIndex, board, turn)) {
      return true;
    }
  }

  return false;
};

export const canMoveBishop = (chip, fromIndex, toIndex, board, turn) => {
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
  if (board[toIndex] === null || captureChip(chip, toIndex, board)) {
    return true;
  }

  return false;
};

export const canMoveQueen = (chip, fromIndex, toIndex, board, turn) => {
  if (turn.queen !== board[fromIndex]) return false;
  if (
    canMoveBishop(chip, fromIndex, toIndex, board, turn) ||
    canMoveRook(chip, fromIndex, toIndex, board, turn)
  ) {
    return true;
  }

  return false;
};

export const canMoveHorse = (chip, fromIndex, toIndex, board, turn) => {
  const [fromRow, fromCol] = getStartPosition(fromIndex);
  const [toRow, toCol] = getEndPosition(toIndex);

  if (turn.horse !== board[fromIndex]) return false;

  if (
    Math.abs(fromRow - toRow) === 2 &&
    Math.abs(fromCol - toCol) === 1 &&
    (board[toIndex] === null || captureChip(chip, toIndex, board))
  ) {
    return true;
  }

  if (
    Math.abs(fromRow - toRow) === 1 &&
    Math.abs(fromCol - toCol) === 2 &&
    (board[toIndex] === null || captureChip(chip, toIndex, board))
  ) {
    return true;
  }

  return false;
};
