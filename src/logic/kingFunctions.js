import { BLACK_CHIPS, WHITE_CHIPS } from '../constants';
import {
  canMoveBishop,
  canMoveHorse,
  canMoveKing,
  canMovePawn,
  canMoveQueen,
  canMoveRook,
} from './canMove';

export const getPositionKing = (board, turn) => {
  for (let fromIndex = 0; fromIndex < board.length; fromIndex++) {
    if (board[fromIndex] === turn.king) {
      return fromIndex;
    }
  }
};

const canMove = (chip, fromIndex, toIndex, board, turn, capture = false) => {
  const opponentChips = turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
  switch (chip) {
    case opponentChips.bishop:
      return canMoveBishop(chip, fromIndex, toIndex, board, opponentChips);
    case opponentChips.horse:
      return canMoveHorse(chip, fromIndex, toIndex, board, opponentChips);
    case opponentChips.king:
      return canMoveKing(chip, fromIndex, toIndex, board, opponentChips);
    case opponentChips.pawn:
      return canMovePawn(chip, fromIndex, toIndex, board, opponentChips, capture);
    case opponentChips.queen:
      return canMoveQueen(chip, fromIndex, toIndex, board, opponentChips);
    case opponentChips.rook:
      return canMoveRook(chip, fromIndex, toIndex, board, opponentChips);
  }
};

export const isUnderThreat = (toIndex, board, turn) => {
  const opponentChips =
    turn === BLACK_CHIPS ? Object.values(WHITE_CHIPS) : Object.values(BLACK_CHIPS);
  for (let fromIndex = 0; fromIndex < board.length; fromIndex++) {
    if (board[fromIndex] !== null && opponentChips.includes(board[fromIndex])) {
      if (canMove(board[fromIndex], fromIndex, toIndex, board, turn, true)) {
        return true;
      }
    }
  }
  return false;
};

export const isInCheck = (board, turn) => {
  const kingPosition = getPositionKing(board, turn);
  return isUnderThreat(kingPosition, board, turn);
};

export const castlingKing = (fromIndex, toIndex, board, turn) => {
  const rookPosition = toIndex > fromIndex ? 1 : -1;

  if (board[toIndex + rookPosition] !== turn.rook) return false;

  if (toIndex < fromIndex) {
    for (let i = toIndex; i < fromIndex; i++) {
      if (board[i] !== null) return false;
    }
  } else if (toIndex > fromIndex) {
    for (let i = fromIndex + rookPosition; i <= toIndex; i++) {
      if (board[i] !== null) {
        console.log(board[i]);
        return false;
      }
    }
  }
  return true;
};

export const castlingRook = (fromIndex, toIndex, board, turn) => {
  const rookPosition = toIndex > fromIndex ? 1 : -1;
  board[toIndex + rookPosition] = null;
  board[toIndex - rookPosition] = turn.rook;
};
