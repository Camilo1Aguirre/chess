import { WHITE_CHIPS, BLACK_CHIPS } from '../constants';

const isPawn = (chip) => chip === WHITE_CHIPS.pawn || chip === BLACK_CHIPS.pawn;
const isRook = (chip) => chip === WHITE_CHIPS.rook || chip === BLACK_CHIPS.rook;
const isHorse = (chip) => chip === WHITE_CHIPS.horse || chip === BLACK_CHIPS.horse;
const isQueen = (chip) => chip === WHITE_CHIPS.queen || chip === BLACK_CHIPS.queen;
const isKing = (chip) => chip === WHITE_CHIPS.king || chip === BLACK_CHIPS.king;
const isBishop = (chip) => chip === WHITE_CHIPS.bishop || chip === BLACK_CHIPS.bishop;

export const getPieceType = (chip) => {
  if (isPawn(chip)) return 'pawn';
  if (isRook(chip)) return 'rook';
  if (isKing(chip)) return 'king';
  if (isBishop(chip)) return 'bishop';
  if (isQueen(chip)) return 'queen';
  if (isHorse(chip)) return 'horse';
  return null;
};
