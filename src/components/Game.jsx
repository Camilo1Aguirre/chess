import { useState } from 'react';
import { initialBoard, WHITE_CHIPS } from '../constants';
import { Board } from './Board';
import { chipFunctions } from '../logic/chipFunctions';
import { getPieceType } from '../logic/getPieceType';
import { Winner } from './Winner';
import { Header } from './Header';

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
  const [winner, setWinner] = useState(null); // null: No ha terminado la partida false: Empate

  /* TO DO:
    - Enroque
    - Promocion peones
    - Mostrar turno
    - Evitar que la partida se pierda
    - Fichas puedan comer a la ficha que da jaque
    - Que las fichas que estan protegiendo al rey no se puedan mover
    - Que fichas puedan proteger al rey
    - Rey ahogado
    - Ultimos movimientos repetido = empate
  */

  const saveGameState = (newBoard, newTurn) => {
    setBoard(newBoard);
    setTurn(newTurn);
    // Guardar en localStorage después de actualizar el estado
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', JSON.stringify(newTurn));
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedChip(null);
    setSelectedIndex(null);
    setTurn(WHITE_CHIPS);
    setWinner(null);
    // Limpiar localStorage
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  };

  const moveChip = (index) => {
    if (selectedChip !== null) {
      const pieceType = getPieceType(selectedChip);
      if (pieceType && chipFunctions[pieceType]) {
        // Actualizar el tablero y el turno directamente
        const newBoard = [...board];
        const newTurn = chipFunctions[pieceType](
          selectedChip,
          selectedIndex,
          index,
          newBoard,
          turn,
        );
        saveGameState(newBoard, newTurn);
        setBoard(newBoard);
        setTurn(newTurn);
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
      <div className="board">
        <Board board={board} moveChip={moveChip} />
        <Winner winner={winner} resetGame={resetGame} />
      </div>
    </section>
  );
}
