import { Square } from './Square';

export function Board({ board, moveChip }) {
  return (
    <>
      {board.map((item, index) => (
        <Square key={index} index={index} item={item} onClick={moveChip} />
      ))}
    </>
  );
}
