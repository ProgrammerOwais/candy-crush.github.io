import GameScore from "./components/GameScore";
import GameLevel from "./components/GameLevel";
// import Challenge from "./components/Challenge";
// import Popup from "./components/Popup";
import { useState, useEffect } from "react";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import purpleCandy from "./images/purple-candy.png";
import orangeCandy from "./images/orange-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import proCandy1 from "./images/pro-candy1.png";
import proCandy2 from "./images/pro-candy2.png";
import blank from "./images/blank.png";
import url from "./audio/score.mp3";
import bgUrl from "./audio/bg-sound.mp3";
import sweetUrl from "./audio/sweet.mp3";
import tastyUrl from "./audio/tasty.mp3";
import deliciousUrl from "./audio/delicious.mp3";
import sugarCrushUrl from "./audio/sugar-crush.mp3";

let width = 8;
let candyColors = [
  blueCandy,
  greenCandy,
  purpleCandy,
  orangeCandy,
  redCandy,
  yellowCandy,
];
let candyColorsWithPro = [
  proCandy1,
  proCandy2,
  blueCandy,
  greenCandy,
  purpleCandy,
  orangeCandy,
  redCandy,
  yellowCandy,
];

let sound = new Audio(url);
let bgSound = new Audio(bgUrl);
bgSound.volume = 0.5;
console.log("the sound is played");

setInterval(() => {
  bgSound.play();
}, 20000);
document.addEventListener("DOMContentLoaded", () => {
  bgSound.play();
});
// award voices
let sweet = new Audio(sweetUrl);
let tasty = new Audio(tastyUrl);
let sugarCrush = new Audio(sugarCrushUrl);
let delicious = new Audio(deliciousUrl);
let voicesArray = [sweet, tasty, sugarCrush, delicious];

// touch events handling variables
let initialVAlueX = 0;
let initialVAlueY = 0;
let lastX = 0;
let lastY = 0;

function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [score, setScore] = useState(0);
  // moves left for the game
  const [moves, setMoves] = useState(10);
  const [totalMoves, setTotalMoves] = useState(10);
  const [target, setTarget] = useState(40);

  // Create the game board logic
  const createBoard = () => {
    let randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      // get the random colors from 0 to 5 by using color box of candyColors
      let randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    // add the possibility of pro candies
    const randomWithProColor =
      candyColorsWithPro[Math.floor(Math.random() * candyColors.length)];
    randomColorArrangement[Math.floor(Math.random() * width * width)] =
      randomWithProColor;

    setCurrentColorArrangement(randomColorArrangement);
  };
  //******************************** Checking Boxes Vertically *******
  // Group Four boxes vertically & check it
  const checkForColumnofFour = () => {
    // if we check the board in vertically Four Four boxes
    // then its boxes becomes 39 from 64
    for (let i = 0; i <= 39; i++) {
      // integrate/grouped vertically 4 boxes
      let columnOFFour = [i, i + width, i + width * 2, i + width * 3];
      // pick any color from the column
      let decideColor = currentColorArrangement[i];
      let isBlank = currentColorArrangement[i] === blank;
      if (
        columnOFFour.every(
          // check if every four boxed contain same color
          (box) => currentColorArrangement[box] === decideColor && !isBlank
        )
      ) {
        columnOFFour.forEach((box) => (currentColorArrangement[box] = blank));
        setScore((score) => score + 4);
        sound.play();
        return true;
      }
    }
  };

  // Group 3 boxes vertically & check it
  const checkForColumnofThree = () => {
    // if we check the board in vertically three three boxes
    // then its boxes becomes 47 from 64
    for (let i = 0; i <= 47; i++) {
      // integrate/grouped vertically 3 boxes
      let columnOFThree = [i, i + width, i + width * 2];
      // pick any color from the column
      let decideColor = currentColorArrangement[i];
      let isBlank = currentColorArrangement[i] === blank;
      if (
        columnOFThree.every(
          (box) => currentColorArrangement[box] === decideColor && !isBlank
        )
      ) {
        columnOFThree.forEach((box) => (currentColorArrangement[box] = blank));
        setScore((score) => score + 3);
        sound.play();
        return true;
      }
    }
  };

  //******************************** Checking Boxes Horizontally *******
  // Group 4 boxes Horizontally & check it
  const checkForRowofFour = () => {
    for (let i = 0; i < 64; i++) {
      // As in board the last three boxes in every row are not valid to check
      // so we will skip it
      let notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      // integrate/grouped Horizontally 3 boxes
      let RowOFFour = [i, i + 1, i + 2, i + 3];
      // pick any color from the Row
      let decideColor = currentColorArrangement[i];
      let isBlank = currentColorArrangement[i] === blank;
      if (
        RowOFFour.every(
          (box) => currentColorArrangement[box] === decideColor && !isBlank
        )
      ) {
        RowOFFour.forEach((box) => (currentColorArrangement[box] = blank));

        setMoves((move) => move - 1);
        sound.play();
        return true;
      }
    }
  };
  // Group 3 boxes Horizontally & check it
  const checkForRowofThree = () => {
    for (let i = 0; i < 64; i++) {
      // As in board the last two boxes in every row are not valid to check
      // so we will skip it
      let notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      // integrate/grouped Horizontally 3 boxes
      let RowOFThree = [i, i + 1, i + 2];
      // pick any color from the Row
      let decideColor = currentColorArrangement[i];
      let isBlank = currentColorArrangement[i] === blank;
      if (
        RowOFThree.every(
          (box) => currentColorArrangement[box] === decideColor && !isBlank
        )
      ) {
        RowOFThree.forEach((box) => (currentColorArrangement[box] = blank));
        setScore((score) => score + 3);
        sound.play();

        return true;
      }
    }
  };

  // For avoiding rendring again & again
  useEffect(() => {
    createBoard();
  }, []);
  // if the box is empty fill that
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      let firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      if (firstRow.includes(i) && currentColorArrangement[i] == blank) {
        let randomColorNumber = Math.floor(Math.random() * candyColors.length);
        // add the possiblity of pro candy
        if (Math.floor(Math.random() * 10 > 8)) {
          currentColorArrangement[i] = candyColorsWithPro[randomColorNumber];
        } else {
          currentColorArrangement[i] = candyColors[randomColorNumber];
        }
      }
      // check if the below box is empty
      if (currentColorArrangement[i + width] === blank) {
        // then replace upper box with below one
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };
  //********************************* Adding the drag & drop property */
  const dragStart = (e) => {
    // get the drap element
    // console.log("the event value is: ", e.target);
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    // get the drop element => it will be element of that position where you want to drop
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    // if being replace element is out of space
    // (out of game board the element will be null)
    if (!squareBeingReplaced) return;
    // get elements id by using data-attribute
    let dragSquareId = parseInt(squareBeingDragged.getAttribute("data-id"));
    let replaceSquareId = parseInt(squareBeingReplaced.getAttribute("data-id"));

    sound.play();

    // replace the colors
    //*** under the hood first it will replace the colors
    currentColorArrangement[dragSquareId] =
      squareBeingReplaced.getAttribute("src");
    currentColorArrangement[replaceSquareId] =
      squareBeingDragged.getAttribute("src");

    // check if it is only movable one square/box apart
    const validMoves = [
      dragSquareId - 1,
      dragSquareId + 1,
      dragSquareId - width,
      dragSquareId + width,
    ];
    const validMove = validMoves.includes(replaceSquareId);
    // console.log(validMove);

    // check if any columns or row combination is valid means true

    /**** now here it will check is the 
                       moves valid,
                      replaced square is inside the board,
                      move that only if any of columns or row combination matches */

    if (validMove && replaceSquareId) {
      const isColFour = checkForColumnofFour();
      const isRowFour = checkForRowofFour();
      const isColThree = checkForColumnofThree();
      const isRowThree = checkForRowofThree();
      if (isColFour || isColThree || isRowFour || isRowThree) {
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
        // Also count the moves
        setMoves((move) => move - 1);
      } else {
        // else rewrite it again
        currentColorArrangement[dragSquareId] =
          squareBeingDragged.getAttribute("src");
        currentColorArrangement[replaceSquareId] =
          squareBeingReplaced.getAttribute("src");
        setCurrentColorArrangement([...currentColorArrangement]);
      }
    } else {
      // else rewrite it again
      currentColorArrangement[dragSquareId] =
        squareBeingDragged.getAttribute("src");
      currentColorArrangement[replaceSquareId] =
        squareBeingReplaced.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  //********************************* Adding the touch drap drop envets */
  const touchStart = (e) => {
    var touchLocation = e.targetTouches[0];
    initialVAlueX = touchLocation.pageX;
    initialVAlueY = touchLocation.pageY;
  };
  const touchMove = (e) => {
    var touchLocation = e.targetTouches[0];
    lastX = touchLocation.pageX - initialVAlueX;
    lastY = touchLocation.pageY - initialVAlueY;
  };
  const touchEnd = (e) => {
    // console.log(" the last values are: ( ", lastX, " ,", lastY, " )");
    let dragSquareId = parseInt(e.target.getAttribute("data-id"));

    // if the touch moves to left within range
    if (
      lastX < -15 &&
      lastX > -80 &&
      ((lastY <= 0 && lastY >= -10) || (lastY >= 0 && lastY <= 10))
    ) {
      let notValidMoves = [0, 8, 16, 24, 32, 40, 48, 56];
      if (notValidMoves.includes(dragSquareId)) return;
      let replaceSquareId = dragSquareId - 1;
      currentColorArrangement[replaceSquareId] = e.target.getAttribute("src");
      currentColorArrangement[dragSquareId] = document
        .querySelector(` [data-id ="${replaceSquareId}"]`)
        .getAttribute("src");
      if (replaceSquareId) {
        const isColFour = checkForColumnofFour();
        const isRowFour = checkForRowofFour();
        const isColThree = checkForColumnofThree();
        const isRowThree = checkForRowofThree();
        if (isColFour || isColThree || isRowFour || isRowThree) {
          setSquareBeingDragged(null);
          setSquareBeingReplaced(null);
          // Also count the moves
          setMoves((move) => move - 1);
        } else {
          // else rewrite it again
          currentColorArrangement[dragSquareId] = e.target.getAttribute("src");
          currentColorArrangement[replaceSquareId] = document
            .querySelector(` [data-id ="${replaceSquareId}"]`)
            .getAttribute("src");
          setCurrentColorArrangement([...currentColorArrangement]);
        }
      } else {
        // else rewrite it again
        currentColorArrangement[dragSquareId] = e.target.getAttribute("src");
        currentColorArrangement[replaceSquareId] = document
          .querySelector(` [data-id ="${replaceSquareId}"]`)
          .getAttribute("src");

        setCurrentColorArrangement([...currentColorArrangement]);
      }
      console.log("you moved left");
    }
    // if the touch moves to right within range
    else if (
      lastX > 15 &&
      lastX < 80 &&
      ((lastY <= 0 && lastY >= -10) || (lastY >= 0 && lastY <= 10))
    ) {
      let notValidMoves = [7, 15, 23, 31, 39, 47, 55, 63];
      if (notValidMoves.includes(dragSquareId)) return;
      let replaceSquareId = dragSquareId + 1;
      currentColorArrangement[replaceSquareId] = e.target.getAttribute("src");
      currentColorArrangement[dragSquareId] = document
        .querySelector(` [data-id ="${replaceSquareId}"]`)
        .getAttribute("src");
      if (replaceSquareId) {
        const isColFour = checkForColumnofFour();
        const isRowFour = checkForRowofFour();
        const isColThree = checkForColumnofThree();
        const isRowThree = checkForRowofThree();
        if (isColFour || isColThree || isRowFour || isRowThree) {
          setSquareBeingDragged(null);
          setSquareBeingReplaced(null);
          // Also count the moves
          setMoves((move) => move - 1);
        } else {
          // else rewrite it again
          currentColorArrangement[dragSquareId] = e.target.getAttribute("src");
          currentColorArrangement[replaceSquareId] = document
            .querySelector(` [data-id ="${replaceSquareId}"]`)
            .getAttribute("src");
          setCurrentColorArrangement([...currentColorArrangement]);
        }
      } else {
        // else rewrite it again
        currentColorArrangement[dragSquareId] = e.target.getAttribute("src");
        currentColorArrangement[replaceSquareId] = document
          .querySelector(` [data-id ="${replaceSquareId}"]`)
          .getAttribute("src");

        setCurrentColorArrangement([...currentColorArrangement]);
      }
      console.log("you moved right");
    }
    // if the touch moves top within range
    else if (
      lastY < -15 &&
      lastY > -80 &&
      ((lastX <= 0 && lastX >= -10) || (lastX >= 0 && lastX <= 10))
    ) {
      let notValidMoves = [0, 1, 2, 3, 4, 5, 6, 7];
      if (notValidMoves.includes(dragSquareId)) return;
      let replaceSquareId = dragSquareId - width;
      currentColorArrangement[replaceSquareId] = e.target.getAttribute("src");
      currentColorArrangement[dragSquareId] = document
        .querySelector(` [data-id ="${replaceSquareId}"]`)
        .getAttribute("src");
      if (replaceSquareId) {
        const isColFour = checkForColumnofFour();
        const isRowFour = checkForRowofFour();
        const isColThree = checkForColumnofThree();
        const isRowThree = checkForRowofThree();
        if (isColFour || isColThree || isRowFour || isRowThree) {
          setSquareBeingDragged(null);
          setSquareBeingReplaced(null);
          // Also count the moves
          setMoves((move) => move - 1);
        } else {
          // else rewrite it again
          currentColorArrangement[dragSquareId] = e.target.getAttribute("src");
          currentColorArrangement[replaceSquareId] = document
            .querySelector(` [data-id ="${replaceSquareId}"]`)
            .getAttribute("src");
          setCurrentColorArrangement([...currentColorArrangement]);
        }
      } else {
        // else rewrite it again
        currentColorArrangement[dragSquareId] = e.target.getAttribute("src");
        currentColorArrangement[replaceSquareId] = document
          .querySelector(` [data-id ="${replaceSquareId}"]`)
          .getAttribute("src");

        setCurrentColorArrangement([...currentColorArrangement]);
      }
      console.log("you moved top");
    }
    // if the touch moves bottom within range
    else if (
      lastY > 15 &&
      lastY < 80 &&
      ((lastX <= 0 && lastX >= -10) || (lastX >= 0 && lastX <= 10))
    ) {
      let notValidMoves = [56, 57, 58, 59, 60, 61, 62, 63];
      if (notValidMoves.includes(dragSquareId)) return;
      let replaceSquareId = dragSquareId + width;
      currentColorArrangement[replaceSquareId] = e.target.getAttribute("src");
      currentColorArrangement[dragSquareId] = document
        .querySelector(` [data-id ="${replaceSquareId}"]`)
        .getAttribute("src");
      if (replaceSquareId) {
        const isColFour = checkForColumnofFour();
        const isRowFour = checkForRowofFour();
        const isColThree = checkForColumnofThree();
        const isRowThree = checkForRowofThree();
        if (isColFour || isColThree || isRowFour || isRowThree) {
          setSquareBeingDragged(null);
          setSquareBeingReplaced(null);
          // Also count the moves
          setMoves((move) => move - 1);
        } else {
          // else rewrite it again
          currentColorArrangement[dragSquareId] = e.target.getAttribute("src");
          currentColorArrangement[replaceSquareId] = document
            .querySelector(` [data-id ="${replaceSquareId}"]`)
            .getAttribute("src");
          setCurrentColorArrangement([...currentColorArrangement]);
        }
      } else {
        // else rewrite it again
        currentColorArrangement[dragSquareId] = e.target.getAttribute("src");
        currentColorArrangement[replaceSquareId] = document
          .querySelector(` [data-id ="${replaceSquareId}"]`)
          .getAttribute("src");

        setCurrentColorArrangement([...currentColorArrangement]);
      }
      console.log("you moved bottom");
    } else {
      console.log("you exceed your limit");
    }
  };
  // For checking box in every 100 mms
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnofFour();
      checkForColumnofThree();
      checkForRowofFour();
      checkForRowofThree();
      moveIntoSquareBelow();
      // also set again the current color
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnofFour,
    checkForColumnofThree,
    checkForRowofFour,
    checkForRowofThree,
    ,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  // with bomb, destroy the candies on every side (3,3,3,3)
  const luckyBomb = (index) => {
    // console.log("the current index is: ", index);
    // upper invalid candies
    let top = [0, 1, 2, 3, 4, 5, 6, 7];
    // left invalid candies
    let left = [0, 8, 16, 24, 32, 40, 48, 56];
    // right invalid candies
    let right = [7, 15, 23, 31, 39, 47, 55, 63];
    // bottom invalid candies
    let bottom = [56, 57, 58, 59, 60, 61, 62, 63];

    // remove 3 candies on every side
    for (let i = 1; i <= 3; i++) {
      // for left
      if (!left.includes(index)) {
        if (!left.includes(index - i)) {
          currentColorArrangement[index - i] = blank;
          setScore((score) => score + 1);
        }
      }
      // for right
      if (!right.includes(index)) {
        if (!right.includes(index + i)) {
          currentColorArrangement[index + i] = blank;
          setScore((score) => score + 1);
        }
      }
      // for top
      if (!top.includes(index)) {
        if (!top.includes(index - width * i)) {
          currentColorArrangement[index - width * i] = blank;
          setScore((score) => score + 1);
        }
      }
      // for bottom
      if (!bottom.includes(index)) {
        if (!bottom.includes(index + width * i)) {
          currentColorArrangement[index + width * i] = blank;
          setScore((score) => score + 1);
        }
      }
    }
    currentColorArrangement[index] = blank;
    setScore((score) => score + 1);
    sound.play();
    const randomVoice = Math.floor(Math.random() * voicesArray.length);
    voicesArray[randomVoice].play();
  };

  const startAgain = () => {
    setCurrentColorArrangement([]);
    let prevTarget = target;
    setMoves((move) => (move = totalMoves));
    setTarget((target) => (target = prevTarget));
    setScore((score) => (score = 0));
    createBoard();
  };

  return (
    <div className="app">
      {/* <Challenge /> */}
      {/* <Popup /> */}
      <div className="game">
        {currentColorArrangement.map((candyColor, index) =>
          candyColor !== proCandy1 && candyColor !== proCandy2 ? (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              draggable={true}
              data-id={index}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
              onTouchStart={touchStart}
              onTouchMove={touchMove}
              onTouchEnd={touchEnd}
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              draggable={true}
              data-id={index}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
              onClick={() => luckyBomb(index)}
              className="lucky-bomb"
              onContextMenu={(e) => e.preventDefault()}
            />
          )
        )}
      </div>
      <GameLevel
        setMoves={setMoves}
        setTarget={setTarget}
        setScore={setScore}
        setBoard={createBoard}
        setTotalMoves={setTotalMoves}
      />
      <GameScore
        score={score}
        moves={moves}
        target={target}
        startAgain={startAgain}
      />
    </div>
  );
}

export default App;
