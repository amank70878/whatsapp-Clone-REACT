import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const SidebarChatsCard = ({ name, id }) => {
  const seed = Math.floor(Math.random() * 5000);
  const [lastMessage, setLastMessage] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState("");

  //fetching rooms id with useEffect hook
  useEffect(() => {
    const fetchMessagesFunc = async () => {
      const q = query(
        collection(db, `room/${id}/messages`),
        orderBy("timestamp", "desc")
      );
      const result = await getDocs(q);
      setFetchedMessages(
        result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    fetchTimeFunc();
    fetchMessagesFunc(); // eslint-disable-next-line
  }, [id]);

  const fetchTimeFunc = async () => {
    const lastSeenVar = await fetchedMessages[0].message;
    setLastMessage(lastSeenVar);
  };

  return (
    <Link to={`/rooms/${id}`}>
      <ChatsSection>
        <Avatar
          className="avatar"
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="rightChats">
          <div className="ChatsSection--title">
            {name
              ? name.length < 22
                ? name
                : name.slice(0, 22) + `...`
              : "Default Name"}
          </div>
          <div className="ChatsSection--lastChat">
            {lastMessage
              ? lastMessage.length < 22
                ? lastMessage
                : lastMessage.slice(0, 22) + `...`
              : "fetching..."}
          </div>
          {/* <div className="ChatsSection--time">yesterday</div> */}
        </div>
      </ChatsSection>
    </Link>
  );
};

export default SidebarChatsCard;

const ChatsSection = styled.div`
  margin: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--bgColor);
  border-bottom: 0.5px solid rgba(225, 225, 225, 0.15);
  @media only screen and (max-width: 1350px) {
    .rightChats {
      padding: 0 5px;
      .ChatsSection--lastChat {
        font-size: 0.75em;
        color: red;
      }
    }
  }
  @media only screen and (max-width: 800px) {
    padding: 5px;
    margin: 5px;
    width: 40vw;
    height: 45px;
    border: none;
    border-radius: 10px;
    background-color: var(--componentBgColor);
    .avatar {
      width: 30px;
      height: 30px;
    }
    .rightChats {
      padding: 0 5px;
      .ChatsSection--title {
        color: red;
      }
      .ChatsSection--time {
        display: none;
      }
      .ChatsSection--lastChat {
        display: none;
      }
    }
  }
  &:hover {
    background-color: #162731e0;
  }
  .rightChats {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 10px;
    overflow: hidden;
    line-height: 1.2;
    flex: 1;
    .ChatsSection--title {
      font-size: 1.2em;
      color: #e9edef;
      white-space: nowrap;
      @media only screen and (max-width: 1350px) {
        font-size: 1em;
      }
      @media only screen and (max-width: 800px) {
        font-size: 0.8em;
      }
    }
    .ChatsSection--lastChat {
      font-size: 0.9em;
      color: #d1d7db;
      white-space: nowrap;
      width: 90%;
      overflow: hidden;
    }
    .ChatsSection--time {
      position: absolute;
      right: 10px;
      font-size: 0.75em;
      color: #8696a0;
    }
  }
`;
