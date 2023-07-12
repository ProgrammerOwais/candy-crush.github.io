import React from "react";
import { useRef } from "react";

import proCandy1 from "../images/pro-candy1.png";
const ChallengePopup = ({ userAuth }) => {
  const challengePopupElm = useRef();

  return (
    <div ref={challengePopupElm} className="challenge-popup">
      {userAuth.name ? (
        <>
          <div className="challenge-div">
            <h2>Challenge The Best</h2>
            <div className="user-div">
              <h2>
                <img
                  src={proCandy1}
                  className="challenge-img"
                  alt="user image"
                />
                Muhammad Owais
              </h2>
              <h2>Score: 305</h2>
              <button
                className="challenge-btn"
                onClick={() =>
                  challengePopupElm.current.classList.toggle(
                    "challenge-popup-toggle"
                  )
                }
              >
                Take Challenge
              </button>
            </div>
          </div>
          <div className="challenge-div">
            <h2>Challenge Yourself</h2>
            <div className="user-div">
              <h2>
                <img
                  src={proCandy1}
                  className="challenge-img"
                  alt="user image"
                />
                Muhammad Owais
              </h2>
              <h2>Score: 305</h2>
              <button
                className="challenge-btn"
                onClick={() =>
                  challengePopupElm.current.classList.toggle(
                    "challenge-popup-toggle"
                  )
                }
              >
                Take Challenge
              </button>
            </div>
          </div>
          <div className="challenge-div">
            <h2>Without Challenge</h2>
            <div className="user-div user-div2">
              <button
                className="challenge-btn"
                onClick={() =>
                  challengePopupElm.current.classList.toggle(
                    "challenge-popup-toggle"
                  )
                }
              >
                Start
              </button>
            </div>
          </div>
        </>
      ) : (
        <h1 className="logout-heading"> To take a challenge, first login</h1>
      )}
    </div>
  );
};

export default ChallengePopup;
