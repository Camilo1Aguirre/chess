/**
 * Obtiene la posición del rey en el tablero.
 */
export const getPositionKing = (board, turn) => {
  for (let fromIndex = 0; fromIndex < board.length; fromIndex++) {
    if (board[fromIndex] === turn.king) {
      return fromIndex;
    }
  }
  return null; // Devuelve null si no se encuentra el rey
};
