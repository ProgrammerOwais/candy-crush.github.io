import { useRef } from "react";

const GameLevel = ({
  setMoves,
  setTarget,
  setScore,
  setBoard,
  setTotalMoves,
}) => {
  let easyBtn = useRef();
  let normalBtn = useRef();
  let hardBtn = useRef();
  let levelsBtn = useRef();
  return (
    <div className="game-level">
      <button
        ref={levelsBtn}
        type="button"
        className="btn-levels"
        onClick={(e) => e.target.classList.toggle("toggle")}
      >
        Levels &gt;
      </button>
      <button
        type="button"
        className="btn active"
        ref={easyBtn}
        onClick={(e) => {
          setTotalMoves((totalMoves) => (totalMoves = 10));
          setMoves((moves) => (moves = 10));
          setTarget((target) => (target = 40));
          setScore((score) => (score = 0));
          e.target.classList.add("active");
          if (normalBtn.current.classList.contains("active")) {
            normalBtn.current.classList.remove("active");
          }
          if (hardBtn.current.classList.contains("active")) {
            hardBtn.current.classList.remove("active");
          }
          levelsBtn.current.classList.toggle("toggle");
          setBoard();
        }}
      >
        Easy
      </button>
      <button
        type="button"
        ref={normalBtn}
        onClick={(e) => {
          setTotalMoves((totalMoves) => (totalMoves = 15));
          setMoves((moves) => (moves = 15));
          setTarget((target) => (target = 75));
          setScore((score) => (score = 0));
          e.target.classList.add("active");
          if (easyBtn.current.classList.contains("active")) {
            easyBtn.current.classList.remove("active");
          }
          if (hardBtn.current.classList.contains("active")) {
            hardBtn.current.classList.remove("active");
          }
          levelsBtn.current.classList.toggle("toggle");
          setBoard();
        }}
        className="btn"
      >
        Normal
      </button>
      <button
        type="button"
        className="btn"
        ref={hardBtn}
        onClick={(e) => {
          setTotalMoves((totalMoves) => (totalMoves = 25));
          setMoves((moves) => (moves = 25));
          setTarget((target) => (target = 150));
          setScore((score) => (score = 0));
          e.target.classList.add("active");
          if (normalBtn.current.classList.contains("active")) {
            normalBtn.current.classList.remove("active");
          }
          if (easyBtn.current.classList.contains("active")) {
            easyBtn.current.classList.remove("active");
          }
          levelsBtn.current.classList.toggle("toggle");
          setBoard();
        }}
      >
        Hard
      </button>
    </div>
  );
};

export default GameLevel;
