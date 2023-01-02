import "./App.css";
import Home from "./page/Home";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Wrap>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/:roomId" element={<Home />} />
          </Routes>
        </Wrap>
      </Router>
    </>
  );
}

export default App;

const Wrap = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;
  background-color: var(--bgColor);
`;
