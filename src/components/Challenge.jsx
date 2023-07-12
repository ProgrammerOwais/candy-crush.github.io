import proCandy1 from "../images/pro-candy1.png";
import ChallengePopup from "./ChallengePopup";
import jwtDecode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from "axios";

const Challenge = () => {
  const [userAuth, setUserAuth] = useState({
    name: "",
    email: "",
    image: "",
    id: "",
  });
  const [connectedToDB, setConnectedToDB] = useState(false);

  // let user = false;
  // console.log("user data: ", userAuth);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userData = res.data;
        setUserAuth((userAuth) => ({
          ...userAuth,
          name: userData.name,
          email: userData.email,
          image: userData.picture,
        }));
        // if (userData.name) {
        //   userDataSubmission(userData);
        // }
      } catch (error) {
        console.log("error in sign in button", error);
      }
    },
  });
  const logout = function googleLogout() {
    setUserAuth((userAuth) => ({
      ...userAuth,
      name: "",
      email: "",
      image: "",
      id: "",
    }));
    console.log("user is logged out");
  };
  const userDataSubmission = (userData) => {
    // const postData = async () => {
    //   console.log("the function is called");
    //   await axios
    //     .post("http://localhost:3500/api/auth", {
    //       name: userData.name,
    //       email: userData.email,
    //       image: userData.picture,
    //     })
    //     .then((res) => {
    //       if (res.status == 200 || res.status == 409) {
    //         console.log("the then func executed");
    //       }
    //     })
    //     .catch((error) => console.log(error.code));
    // };
    // postData();
    // const getUserData = async () => {
    //   await axios
    //     .get("http://localhost:3500/api/auth")
    //     .then((res) => {
    //       const data = res.data;
    //       console.log("the user data is: ", data);
    //       if (res.status == 200) {
    //         setConnectedToDB((prev) => (prev = true));
    //         setUserAuth((userAuth) => ({ ...userAuth, id: data._id }));
    //         console.log("the user id: ", userAuth.id);
    //       }
    //     })
    //     .catch((error) => console.log(error));
    // };
    // getUserData();
  };
  // if (userAuth.name) {
  //   if (!connectedToDB) {
  //     const postData = async () => {
  //       const res = await axios.post("http://localhost:3000/api/users");
  //     };
  //   }
  // }
  return (
    <>
      <nav className="navbar">
        {/* user ? ({" "} */}
        <>
          <button
            className="challenges "
            onClick={() =>
              document
                .querySelector(".challenge-popup")
                .classList.toggle("challenge-popup-toggle")
            }
          >
            {" "}
            Challenges
          </button>
          {/* <button className="sign-out"> LogOut</button> */}

          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse);

              const data = jwtDecode(credentialResponse.credential);
              userInfo(data);

              // console.log("user info: ", data.name, data.email, data.picture);
              // setUserAuth((userAuth) => data);
              // console.log("state: ", userAuth);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            text="Sign In"
          /> */}
          {userAuth.name ? (
            <button className="sign-in" onClick={() => logout()}>
              {" "}
              logout
            </button>
          ) : (
            <button className="sign-in" onClick={() => login()}>
              {" "}
              LogIn
            </button>
          )}

          {userAuth.image ? (
            <img src={userAuth.image} className="user-img " />
          ) : (
            <img src={proCandy1} className="user-img " />
          )}
        </>
        {/* ) : (
          <button className="sign-in" onClick={login}>
            {" "}
            LogIn
          </button> */}

        {/* ; ) */}
      </nav>
      <ChallengePopup userAuth={userAuth} />
    </>
  );
};

export default Challenge;
