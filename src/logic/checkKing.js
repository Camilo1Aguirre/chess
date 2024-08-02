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

export const isUnderThreat = (toIndex, board, opponentChips, turn) => {
  for (let fromIndex = 0; fromIndex < board.length; fromIndex++) {
    if (board[fromIndex] !== null && opponentChips.includes(board[fromIndex])) {
      if (canMove(board[fromIndex], fromIndex, toIndex, board, turn, true)) {
        if (canMove(board[fromIndex], fromIndex, toIndex, board, turn, true)) {
          return true;
        }
      }
    }
    return false;
  }
};

export const isInCheck = (toIndex, board, opponentChips, turn) => {
  for (let fromIndex = 0; fromIndex < board.length; fromIndex++) {
    if (board[fromIndex] !== null && opponentChips.includes(board[fromIndex])) {
      if (canMove(board[fromIndex], fromIndex, toIndex, board, turn)) {
        return true;
      }
    }
  }
};
