export const WHITE_CHIPS = {
  king: '♔',
  queen: '♕',
  rook: '♖',
  bishop: '♗',
  horse: '♘',
  pawn: '♙',
};

export const BLACK_CHIPS = {
  king: '♚',
  queen: '♛',
  rook: '♜',
  bishop: '♝',
  horse: '♞',
  pawn: '♟',
};

const blackChips = [
  BLACK_CHIPS.rook,
  BLACK_CHIPS.horse,
  BLACK_CHIPS.bishop,
  BLACK_CHIPS.queen,
  BLACK_CHIPS.king,
  BLACK_CHIPS.bishop,
  BLACK_CHIPS.horse,
  BLACK_CHIPS.rook,
];
const whiteChips = [
  WHITE_CHIPS.rook,
  WHITE_CHIPS.horse,
  WHITE_CHIPS.bishop,
  WHITE_CHIPS.queen,
  WHITE_CHIPS.king,
  WHITE_CHIPS.bishop,
  WHITE_CHIPS.horse,
  WHITE_CHIPS.rook,
];

const blackPawns = Array(8).fill(BLACK_CHIPS.pawn);
const whitePawns = Array(8).fill(WHITE_CHIPS.pawn);

export const initialBoard = [
  ...blackChips,
  ...blackPawns,
  ...Array(32).fill(null),
  ...whitePawns,
  ...whiteChips,
];
