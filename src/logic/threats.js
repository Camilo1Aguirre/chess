import { canMove } from './canMove';
import { BLACK_CHIPS, WHITE_CHIPS } from '../constants';
import { getPositionKing } from './getPositionKing';

/**
 * Verifica si una posición está bajo amenaza.
 */
export const isUnderThreat = (toIndex, board, turn) => {
  const opponentChips =
    turn === BLACK_CHIPS ? Object.values(WHITE_CHIPS) : Object.values(BLACK_CHIPS);
  const chips = turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS;
  for (let fromIndex = 0; fromIndex < board.length; fromIndex++) {
    if (board[fromIndex] !== null && opponentChips.includes(board[fromIndex])) {
      if (canMove(board[fromIndex], fromIndex, toIndex, board, chips, true)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Verifica si el rey está en jaque.
 */
export const isInCheck = (board, turn) => {
  const kingPosition = getPositionKing(board, turn);
  return kingPosition !== null && isUnderThreat(kingPosition, board, turn);
};
