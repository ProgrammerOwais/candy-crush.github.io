import React from "react";
import lose from "../audio/lose.mp3";
import win from "../audio/win.mp3";
let winSound = new Audio(win);
let loseSound = new Audio(lose);
let playOnceForWin = true;
let playOnceForLose = true;
const GameScore = ({ score, moves, target, startAgain }) => {
  // const [render, setRender] = useState(true);
  let result = "";
  if (score >= target) {
    if (playOnceForWin) {
      winSound.play();
      playOnceForWin = false;
    }
    result = "You Win";
  } else if (moves <= 0) {
    if (playOnceForLose) {
      loseSound.play();
      playOnceForLose = false;
    }
    result = "You Loss";
  }
  // if user click on any game level i.e easy,normal,hard
  // then result = "", then I want if anybody wins again
  // play sound

  if (!result) {
    playOnceForWin = true;
    playOnceForLose = true;
  }

  // const startAgain = () => {
  //   window.location.reload();
  // };
  return (
    <>
      {moves > 0 && !result ? (
        <div className="game-data">
          <h2>Moves Left: {moves}</h2>
          <h2>Scores: {score}</h2>
          <h2>Target: {target}</h2>
        </div>
      ) : (
        <div className="game-data">
          <button
            onClick={() => {
              // result = "";
              // setRender((render) => (render = false));
              startAgain();
            }}
            type="button"
            className="btn"
          >
            Start Again
          </button>
          <h2>{result}</h2>
        </div>
      )}
    </>
  );
};

export default GameScore;
