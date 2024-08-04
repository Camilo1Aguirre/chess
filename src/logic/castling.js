/**
 * Verefica si el enroque del rey es posible
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} turn - Es el conjunto de la pieza a mover
 */
export const castlingKing = (fromIndex, toIndex, board, turn) => {
  const rookPosition = toIndex > fromIndex ? 1 : -1;

  if (board[toIndex + rookPosition] !== turn.rook) return false;

  if (toIndex < fromIndex) {
    for (let i = toIndex; i < fromIndex; i++) {
      if (board[i] !== null) return false;
    }
  } else if (toIndex > fromIndex) {
    for (let i = fromIndex + rookPosition; i <= toIndex; i++) {
      if (board[i] !== null) return false;
    }
  }
  return true;
};

/**
 * Realiza el movimiento de enroque de la torre
 * @param {number} fromIndex - El índice de inicio.
 * @param {number} toIndex - El índice del destino.
 * @param {Array} board - El estado actual del tablero.
 * @param {Object} turn - Es el conjunto de la pieza a mover
 */
export const castlingRook = (fromIndex, toIndex, board, turn) => {
  const rookPosition = toIndex > fromIndex ? 1 : -1;
  board[toIndex + rookPosition] = null;
  board[toIndex - rookPosition] = turn.rook;
};
