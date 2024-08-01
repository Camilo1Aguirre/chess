import { useState } from 'react';
import { initialBoard, WHITE_CHIPS } from '../constants';
import { Board } from './Board';
import { chipFunctions } from '../logic/chipFunctions';
import { getPieceType } from '../logic/getPieceType';

export function Game() {
  const [board, setBoard] = useState(initialBoard);
  const [selectedChip, setSelectedChip] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [turn, setTurn] = useState(WHITE_CHIPS);

  const moveChip = (index) => {
    const newBoard = [...board];

    if (selectedChip !== null) {
      const pieceType = getPieceType(selectedChip);
      if (pieceType && chipFunctions[pieceType]) {
        const newTurn = chipFunctions[pieceType](
          selectedChip,
          selectedIndex,
          index,
          newBoard,
          turn,
        );
        setBoard(newBoard);
        setTurn(newTurn);
      }
      setSelectedChip(null);
      setSelectedIndex(null);
    } else if (newBoard[index]) {
      setSelectedChip(newBoard[index]);
      setSelectedIndex(index);
    }
  };

  return (
    <div className="board">
      <Board board={board} moveChip={moveChip} />
    </div>
  );
}
