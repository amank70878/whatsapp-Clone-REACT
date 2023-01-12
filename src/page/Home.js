import React, { useEffect, useState } from "react";
import ChatBody from "../Components/ChatBody";
import Sidebar from "../Components/Sidebar";
import styled from "styled-components";
import Login from "./Login";

const Home = () => {
  // eslint-disable-next-line
  const [loginUserEmail, setLoginUserEmail] = useState("");

  useEffect(() => {
    setLoginUserEmail(localStorage.getItem("loggedInWhatsappCloneEmail"));
  }, []);

  var hours = 2; // to clear the localStorage after 1 hour
  var now = new Date().getTime();
  var setupTime = localStorage.getItem("setupTime");
  if (setupTime == null) {
    localStorage.setItem("setupTime", now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("setupTime", now);
    }
  }

  return (
    <>
      {!loginUserEmail ? (
        <Login />
      ) : (
        <Container>
          <Sidebar />
          <ChatBody />
        </Container>
      )}
    </>
  );
};

export default Home;

const Container = styled.div`
  width: 85vw;
  height: 95vh;
  display: flex;
  flex-direction: row;
  color: var(--textColor);
  overflow: hidden;
  @media only screen and (max-width: 1500px) {
    width: 90vw;
    height: 95vh;
  }
  @media only screen and (max-width: 800px) {
    width: 100vw;
    height: 100vh;
  }
`;
