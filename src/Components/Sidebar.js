import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SidebarHeader from "./SidebarHeader";
import SearchIcon from "@mui/icons-material/Search";
import SegmentIcon from "@mui/icons-material/Segment";
import SidebarChatsCard from "./SidebarChatsCard";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  orderBy,
} from "@firebase/firestore";

const Sidebar = () => {
  const [room, setRoom] = useState("");
  const roomsCollectionRef = collection(db, "room");
  const [toggleTrue, setToggleTrue] = useState(false);

  useEffect(() => {
    fetchAllRooms(); // eslint-disable-next-line
  }, []);

  const fetchAllRooms = async () => {
    const rooms = await getDocs(
      collection(db, "room"),
      orderBy("addedTime", "desc")
    );
    setRoom(rooms.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addRoomFunc = async (e) => {
    e.preventDefault();
    const newRoom = prompt("enter a new to create a new room");
    await addDoc(roomsCollectionRef, {
      name: newRoom,
      addedTime: serverTimestamp(),
    });
    fetchAllRooms();
  };

  const toggleChatFunc = () => {
    setToggleTrue((previousState) => !previousState);
  };

  return (
    <SidebarSection>
      <SidebarHeader />
      <SidebarChatsContainer>
        <SideChats>
          <SideChatsSearch>
            <div className="SideChats--InputDiv">
              <SearchIcon className="SideChatsSearch-svg1" />
              <input type="text" placeholder="Search or start new chat" />
            </div>
            <span>
              <SegmentIcon />
            </span>
            <span>
              <svg
                className="toggleChatFuncClass"
                onClick={toggleChatFunc}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
              </svg>
            </span>
          </SideChatsSearch>
          <AddNewRoom>
            <button onClick={addRoomFunc}>Add a new Room</button>
          </AddNewRoom>
          <SidebarChatsBody toggle={toggleTrue}>
            {!room.length ? (
              <h1
                style={{
                  textAlign: "center",
                  margin: "10px",
                  fontSize: ".9em",
                  fontWeight: "600",
                }}
              >
                Loading rooms, please wait......
              </h1>
            ) : (
              room.map((item, k) => {
                k++;
                return (
                  <SidebarChatsCard key={k} name={item.name} id={item.id} />
                );
              })
            )}
          </SidebarChatsBody>
        </SideChats>
      </SidebarChatsContainer>
    </SidebarSection>
  );
};

export default Sidebar;

const SidebarSection = styled.section`
  width: 23vw;
  background-color: inherit;
  border-right: 1px solid #d1d7db2b;
  border-left: 1px solid #d1d7db2b;
  border-bottom: 1px solid #d1d7db2b;
  overflow: hidden;
  z-index: 100;
  @media only screen and (max-width: 800px) {
    border: none;
    width: 100vw;
  }
`;
const SidebarChatsContainer = styled.section`
  min-height: 100%;
`;
const SideChats = styled.section`
  overflow: hidden;
`;
const SideChatsSearch = styled.div`
  margin: 8px 0;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  svg {
    color: var(--svgColor);
    fill: currentColor;
    cursor: pointer;
  }
  .SideChatsSearch-svg1 {
    width: 20px;
    height: 20px;
  }
  .SideChats--InputDiv {
    width: 90%;
    background-color: var(--componentBgColor);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 15px;
    input {
      padding: 0px 10px;
      padding-left: 25px;
      width: 100%;
      background-color: inherit;
      border: none;
      outline: none;
      font-size: 0.85em;
      letter-spacing: 0.2px;
      font-weight: 500;
      color: rgba(225, 225, 225, 0.4);
      &::placeholder {
        color: rgba(225, 225, 225, 0.4);
      }
    }
  }
  span {
    display: grid;
    place-items: center;
  }
  span svg {
    margin: 0 5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 4px;
    &:hover {
      background-color: var(--greenTextColor);
    }
  }
`;
const AddNewRoom = styled.div`
  display: grid;
  place-items: center;
  margin: 10px 0;
  & > button {
    padding: 5px 10px;
    background-color: #6288ac;
    font-size: 0.9em;
    font-weight: 600;
    border-radius: 12px;
  }
  @media (max-width: 1100px) {
    button {
      padding: 1px 7px;
      font-size: 0.8em;
      font-weight: 500;
      border-radius: 9px;
    }
  }
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;
const SidebarChatsBody = styled.div`
  padding: 10px 10px;
  @media only screen and (max-width: 800px) {
    padding: 0px;
    display: ${(props) => `${props.toggle ? "flex" : "none"}`};
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 120px;
    overflow-x: scroll;
    overflow-y: hidden;
  }
`;
