import { useState } from 'react';
import { BLACK_CHIPS, initialBoard, WHITE_CHIPS } from '../constants';
import { Board } from './Board';
import { chipFunctions } from '../logic/chipFunctions';
import { getPieceType } from '../logic/getPieceType';
import { Winner } from './Winner';
import { Header } from './Header';
import { Square } from './Square';

/* TO DO:
    - Enroque se cancela cuando se hace uno
    - Promocion peones
    - Fichas puedan comer a la ficha que da jaque
    - Que las fichas que estan protegiendo al rey no se puedan mover
    - Que fichas puedan proteger al rey
    - Rey ahogado
    - Ultimos movimientos repetido = empate
    - Mostrar fichas eliminadas
    - Si una ficha intercepta el enroque
  */

/**
 * Componente principal del juego de ajedrez.
 */
export function Game() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return initialBoard;
  });
  const [selectedChip, setSelectedChip] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    if (turnFromStorage) return JSON.parse(turnFromStorage);
    return WHITE_CHIPS;
  });
  const [winner, setWinner] = useState(null);
  const [moveKing, setMoveKing] = useState(false);
  const [promotion, setPromotion] = useState(null);

  /**
   * Guarda el estado del juego en localStorage.
   */
  const saveGameState = (newBoard, newTurn) => {
    setBoard(newBoard);
    setTurn(newTurn);
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', JSON.stringify(newTurn));
  };

  /**
   * Reinicia el estado del juego.
   */
  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedChip(null);
    setSelectedIndex(null);
    setTurn(WHITE_CHIPS);
    setWinner(null);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  };

  /**
   * Maneja el movimiento de una pieza en el tablero.
   */
  const moveChip = (index) => {
    if (selectedChip !== null) {
      const pieceType = getPieceType(selectedChip);
      if (pieceType && chipFunctions[pieceType]) {
        const newBoard = [...board];
        const [newTurn, newMoveKing] = chipFunctions[pieceType](
          selectedChip,
          selectedIndex,
          index,
          newBoard,
          turn,
          moveKing,
        );
        saveGameState(newBoard, newTurn);
        setMoveKing(newMoveKing);
      }

      setSelectedChip(null);
      setSelectedIndex(null);
    } else if (board[index]) {
      setSelectedChip(board[index]);
      setSelectedIndex(index);
    }
  };

  return (
    <section className="game">
      <Header resetGame={resetGame} />
      <div className="chess">
        <Square isSelected={turn === WHITE_CHIPS} item={WHITE_CHIPS.king} />
        <div className="board">
          <Board board={board} moveChip={moveChip} />
          <Winner winner={winner} resetGame={resetGame} />
        </div>
        <Square isSelected={turn === BLACK_CHIPS} item={BLACK_CHIPS.king} />
      </div>
    </section>
  );
}
