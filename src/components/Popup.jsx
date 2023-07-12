import React from "react";
import { useRef } from "react";

const Popup = () => {
  const loginElm = useRef();
  const login = () => {
    loginElm.current.classList.remove("popup-display");
  };
  const noLogin = () => {
    console.log(loginElm.current);
    loginElm.current.classList.remove("popup-display");
  };
  return (
    <div ref={loginElm} className="popup popup-display">
      <h2 className="popup-heading1">
        Be the best by challenging the best And beating the best
      </h2>
      <h3 className="popup-heading2">
        To unlock the challenge feature, login/signup your account
      </h3>
      <button className="login" onClick={login}>
        Login
      </button>
      <hr />
      <button className="no-login" onClick={noLogin}>
        Start Without Login
      </button>
    </div>
  );
};

export default Popup;
