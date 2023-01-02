import React, { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import styled from "styled-components";

const Login = () => {
  // eslint-disable-next-line
  const [loginValue, setLoginValue] = useState("");

  const signInFunc = () => {
    signInWithPopup(auth, provider).then((data) => {
      setLoginValue(data.user.email);
      localStorage.setItem("loggedInWhatsappCloneEmail", data.user.email);
      localStorage.setItem("loggedInWhatsappCloneUser", data.user.displayName);
      localStorage.setItem("loggedInWhatsappCloneImg", data.user.photoURL);
      window.location.reload();
    });
  };
  useEffect(() => {
    setLoginValue(localStorage.getItem("email"));
  }, []);
  return (
    <LOGINWRAP>
      <LOGINBG>
        <div className="bg-div">
          <span className="login-span">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="39"
              viewBox="0 0 39 39"
            >
              <path
                fill="#00E676"
                d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
              ></path>
              <path
                fill="#FFF"
                d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
              ></path>
            </svg>
          </span>
          <p className="login-p">WHATSAPP WEB</p>
        </div>
      </LOGINBG>
      <LOGINDIV>
        <div>
          <h1>
            Click the <p>Log-in</p> Button to logged in the{" "}
            <p>whatsApp Clone</p>
          </h1>
          <button onClick={signInFunc}>Sign-In</button>
        </div>
      </LOGINDIV>
    </LOGINWRAP>
  );
};

export default Login;

const LOGINWRAP = styled.section`
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
`;
const LOGINBG = styled.div`
  width: 100vw;
  padding-top: 40px;
  height: 240px;
  background-color: #00a884;
  .bg-div {
    width: 55%;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    .login-span {
      display: grid;
      align-items: center;
      svg {
        width: 38px;
        height: 38px;
        @media (max-width: 700px) {
          width: 30px;
          height: 30px;
        }
      }
    }
    .login-p {
      font-size: 1em;
      color: #fff;
      font-weight: 500;
      margin: 0 15px;
      letter-spacing: 0.2px;
      @media (max-width: 700px) {
        font-size: 0.85em;
      }
    }
  }
`;
const LOGINDIV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 50px;
  background-color: #f6f6f6;
  width: 50vw;
  position: absolute;
  top: 14%;
  left: 50%;
  transform: translate(-50%);
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  @media (max-width: 950px) {
    padding: 40px;
    width: 70vw;
  }
  @media (max-width: 730px) {
    padding: 50px 20px;
    width: 80vw;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  & > div > h1 {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 1.2em;
    font-weight: 400;
    letter-spacing: 0.5px;
    @media (max-width: 1292px) {
      font-size: 0.86em;
    }
    @media (max-width: 730px) {
      font-size: 0.8em;
    }
  }
  & > div > h1 > p {
    font-size: 0.95em;
    font-weight: 700;
    margin: 0 5px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: grey;
      bottom: 5px;
    }
  }
  & > div > button {
    width: 100%;
    padding: 5px 10px;
    margin: 0 20px;
    margin-top: 50px;
    background-color: #00a884;
    border-radius: 10px;
    color: #e4e4e4;
    border: none;
    outline: none;
    font-size: 1.3em;
    font-weight: 500;
    letter-spacing: 0.2px;
    cursor: pointer;
    @media (max-width: 1292px) {
      font-size: 1em;
    }
    @media (max-width: 700px) {
      font-size: 0.85em;
    }
    &:hover,
    &:active {
      background-color: #009676;
    }
  }
`;
