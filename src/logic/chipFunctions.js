import { movePawn, moveRook, moveKing, moveBishop, moveQueen, moveHorse } from './pieceMovents';

/**
 * Movimiento de cada ficha
 */
export const chipFunctions = {
  pawn: movePawn,
  rook: moveRook,
  king: moveKing,
  bishop: moveBishop,
  queen: moveQueen,
  horse: moveHorse,
};
