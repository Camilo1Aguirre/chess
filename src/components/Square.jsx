// Square.jsx
export function Square({ index, item, onClick }) {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const className = (row + col) % 2 === 0 ? 'squareBlack' : 'squareWhite';

  return (
    <div key={index} className={className} onClick={() => onClick(index)}>
      {item}
    </div>
  );
}
