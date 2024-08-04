// src/logic/pieceMovements.js
import { canMove } from './canMove';
import { isInCheck } from './threats';
import { castlingKing, castlingRook } from './castling';
import { replaceChip, promotePawn } from './moveFunctions';
import { BLACK_CHIPS, WHITE_CHIPS } from '../constants';

/**
 * Movimiento de un peón.
 */
export const movePawn = (chip, selectedIndex, index, board, turn, moveKing) => {
  console.log(canMove(chip, selectedIndex, index, board, turn));
  if (canMove(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
    replaceChip(chip, selectedIndex, index, board);
    promotePawn(chip, index, board);
    return [turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS, moveKing];
  }
  return [turn, moveKing];
};

/**
 * Movimiento de una torre.
 */
export const moveRook = (chip, selectedIndex, index, board, turn, moveKing) => {
  if (canMove(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
    replaceChip(chip, selectedIndex, index, board);
    return [turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS, moveKing];
  }
  return [turn, moveKing];
};

/**
 * Movimiento de un rey y lógica de enroque.
 */
export const moveKing = (chip, selectedIndex, index, board, turn, moveKing) => {
  if (canMove(chip, selectedIndex, index, board, turn)) {
    replaceChip(chip, selectedIndex, index, board);
    return [turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS, true];
  } else if (
    castlingKing(selectedIndex, index, board, turn) &&
    !isInCheck(board, turn) &&
    !moveKing
  ) {
    replaceChip(chip, selectedIndex, index, board);
    castlingRook(selectedIndex, index, board, turn);
    return [turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS, true];
  }
  return [turn, moveKing];
};

/**
 * Movimiento de un alfil.
 */
export const moveBishop = (chip, selectedIndex, index, board, turn, moveKing) => {
  if (canMove(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
    replaceChip(chip, selectedIndex, index, board);
    return [turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS, moveKing];
  }
  return [turn, moveKing];
};

/**
 * Movimiento de una reina.
 */
export const moveQueen = (chip, selectedIndex, index, board, turn, moveKing) => {
  if (canMove(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
    replaceChip(chip, selectedIndex, index, board);
    return [turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS, moveKing];
  }
  return [turn, moveKing];
};

/**
 * Movimiento de un caballo.
 */
export const moveHorse = (chip, selectedIndex, index, board, turn, moveKing) => {
  if (canMove(chip, selectedIndex, index, board, turn) && !isInCheck(board, turn)) {
    replaceChip(chip, selectedIndex, index, board);
    return [turn === BLACK_CHIPS ? WHITE_CHIPS : BLACK_CHIPS, moveKing];
  }
  return [turn, moveKing];
};
