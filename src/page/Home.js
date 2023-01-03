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
  height: 95vh;
  display: flex;
  flex-direction: row;
  color: var(--textColor);
`;
