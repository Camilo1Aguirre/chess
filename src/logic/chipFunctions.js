import { BLACK_CHIPS, WHITE_CHIPS } from '../constants';
import {
  canMoveBishop,
  canMoveHorse,
  canMoveKing,
  canMovePawn,
  canMoveQueen,
  canMoveRook,
  getEndPosition,
} from '../logic/canMove';
import { castlingKing, castlingRook, isInCheck } from './kingFunctions';

const promotePawn = (chip, toIndex, board) => {
  const [toRow] = getEndPosition(toIndex);
  const lastRow = chip === BLACK_CHIPS.pawn ? 7 : 0;

  if (toRow === lastRow) {
    const colorChip = chip === BLACK_CHIPS.pawn ? BLACK_CHIPS : WHITE_CHIPS;
    board[toIndex] = colorChip.queen; // Actualiza la pieza en el tablero
  }
};

const replaceChip = (chip, fromIndex, toIndex, newBoard) => {
  newBoard[fromIndex] = null;
  newBoard[toIndex] = chip;
};

export const chipFunctions = {
  pawn: (chip, selectedIndex, index, board, turn) => {
    if (canMovePawn(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
      replaceChip(chip, selectedIndex, index, board, turn);
      promotePawn(chip, index, board);
      return turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
    }
    return turn; // Retorna el mismo turno si el movimiento no es válido
  },
  rook: (chip, selectedIndex, index, board, turn) => {
    if (canMoveRook(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
      replaceChip(chip, selectedIndex, index, board, turn);
      return turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
    }
    return turn;
  },
  king: (chip, selectedIndex, index, board, turn) => {
    if (canMoveKing(chip, selectedIndex, index, board, turn)) {
      replaceChip(chip, selectedIndex, index, board);
      return turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
    } else if (castlingKing(selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
      replaceChip(chip, selectedIndex, index, board);
      castlingRook(selectedIndex, index, board, turn);
      return turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
    }
    return turn;
  },
  bishop: (chip, selectedIndex, index, board, turn) => {
    if (canMoveBishop(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
      replaceChip(chip, selectedIndex, index, board);
      return turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
    }
    return turn;
  },
  queen: (chip, selectedIndex, index, board, turn) => {
    if (canMoveQueen(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
      replaceChip(chip, selectedIndex, index, board);
      return turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
    }
    return turn;
  },
  horse: (chip, selectedIndex, index, board, turn) => {
    if (canMoveHorse(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
      replaceChip(chip, selectedIndex, index, board);
      return turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
    }
    return turn;
  },
};
