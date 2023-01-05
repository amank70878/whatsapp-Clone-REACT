import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SidebarHeader from "./SidebarHeader";
import SearchIcon from "@mui/icons-material/Search";
import SegmentIcon from "@mui/icons-material/Segment";
import SidebarChatsCard from "./SidebarChatsCard";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  orderBy,
} from "@firebase/firestore";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { menuToggleState } = useSelector((state) => state.amountRedur);
  const [room, setRoom] = useState("");
  const roomsCollectionRef = collection(db, "room");

  useEffect(() => {
    fetchAllRooms(); // eslint-disable-next-line
  }, [menuToggleState]);

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
    if (newRoom) {
      await addDoc(roomsCollectionRef, {
        name: newRoom,
        addedTime: serverTimestamp(),
      });
      fetchAllRooms();
    }
  };

  const toggleChatFunc = () => {
    dispatch({
      type: "menuToggleType",
      payload: false,
    });
  };

  return (
    <SidebarSection toggleByChatHeader={menuToggleState}>
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
                onClick={toggleChatFunc}
                className="toggleChatFuncClass"
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
          {room && (
            <SidebarChatsBodyHeading>
              WhatsApp Clone's Server Rooms :
            </SidebarChatsBodyHeading>
          )}
          <SidebarChatsBody>
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
  flex: 0.25;
  background-color: inherit;
  border-right: 1px solid #d1d7db2b;
  border-left: 1px solid #d1d7db2b;
  border-bottom: 1px solid #d1d7db2b;
  overflow: hidden;
  z-index: 100;
  @media only screen and (max-width: 1200px) {
    flex: 0.35;
  }
  @media only screen and (max-width: 800px) {
    width: ${(props) => `${props.toggleByChatHeader ? "80vw" : "0vw"}`};
    position: fixed;
    z-index: 1000;
    min-height: 100%;
    background-color: var(--bgColor);
    transition: all 200ms ease-in;
    border-radius: 0 15px 15px 0;
  }
  @media only screen and (max-width: 500px) {
    width: ${(props) => `${props.toggleByChatHeader ? "95vw" : "0vw"}`};
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
      padding-left: 15px;
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
      @media only screen and (max-width: 800px) {
        padding: 5px 0px;
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
  .toggleChatFuncClass {
    transform: rotate(90deg);
    display: none;
    @media only screen and (max-width: 800px) {
      display: inline;
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
    background-color: var(--greenTextColor);
    font-size: 0.9em;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    outline: none;
  }
  @media (max-width: 1100px) {
    button {
      padding: 3px 7px;
      font-size: 0.75em;
      font-weight: 500;
      border-radius: 9px;
    }
  }
  @media only screen and (max-width: 800px) {
    /* display: none; */
  }
`;
const SidebarChatsBodyHeading = styled.h1`
  padding: 0px 20px;
  font-size: 1.1em;
  font-weight: 400;
  text-align: center;
`;
const SidebarChatsBody = styled.div`
  padding: 0px 10px;
`;
