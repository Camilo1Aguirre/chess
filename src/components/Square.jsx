export function Square({ index, item, onClick, isSelected }) {
  let className;

  if (isSelected) {
    className = 'square-is-selected';
  } else if (index >= 0) {
    const row = Math.floor(index / 8);
    const col = index % 8;
    className = (row + col) % 2 === 0 ? 'squareWhite' : 'squareBlack';
  } else {
    className = 'square';
  }

  const handleClick = () => {
    onClick(index);
  };

  return (
    <div key={index} className={className} onClick={handleClick}>
      {item}
    </div>
  );
}
