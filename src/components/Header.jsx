export function Header({ resetGame }) {
  return (
    <>
      <button className="resetButton" onClick={resetGame}>
        Reiniciar partida
      </button>
    </>
  );
}
