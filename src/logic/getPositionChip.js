/**
 * Recupera la columna y fila del indice de inicio
 * @param {number} fromIndex - El índice de inicio.
 */
export const getStartPosition = (fromIndex) => {
  return [Math.floor(fromIndex / 8), fromIndex % 8];
};

/**
 * Determina si una ficha puede moverse a una casilla en especifico
 * @param {number} toIndex - El índice de inicio.
 */
export const getEndPosition = (toIndex) => {
  return [Math.floor(toIndex / 8), toIndex % 8];
};
