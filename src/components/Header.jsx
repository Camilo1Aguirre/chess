export function Header({ resetGame }) {
  return (
    <div className="header">
      <button className="resetButton" onClick={resetGame}>
        Reiniciar partida
      </button>
    </div>
  );
}
