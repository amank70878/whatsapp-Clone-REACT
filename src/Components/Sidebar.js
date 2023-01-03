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
            <SegmentIcon className="SideChatsSearch-svg2" />
          </SideChatsSearch>
          <AddNewRoom>
            <button onClick={addRoomFunc}>Add a new Room</button>
          </AddNewRoom>
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
                Loading rooms, please wait
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
  flex: 0.3;
  background-color: inherit;
  overflow: hidden;
  border-right: 1px solid #d1d7db2b;
  border-left: 1px solid #d1d7db2b;
  overflow-x: hidden;
  /* overflow-y: scroll; */
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
  justify-content: space-between;
  svg {
    color: var(--svgColor);
    fill: currentColor;
    cursor: pointer;
  }
  .SideChatsSearch-svg1 {
    width: 20px;
    height: 20px;
  }
  .SideChatsSearch-svg2 {
    margin: 0 10px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 3px;
    &:hover {
      background-color: var(--greenTextColor);
    }
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
`;
const AddNewRoom = styled.div`
  display: grid;
  place-items: center;
  & > button {
    padding: 5px 10px;
    background-color: #6288ac;
    font-size: 0.9em;
    font-weight: 600;
    border-radius: 12px;
  }
`;
const SidebarChatsBody = styled.div`
  padding: 10px 10px;
`;
