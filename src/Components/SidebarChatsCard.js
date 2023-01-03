import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const SidebarChatsCard = ({ name, id }) => {
  // eslint-disable-next-line
  const [seed, setSeed] = useState(Math.floor(Math.random() * 5000));
  const [lastMessage, setLastMessage] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState("");
  // console.log(`fetchedmessages :-> ${fetchedMessages}`);
  // console.log(`last messages :-> ${lastMessage}`);

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
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="rightChats">
          <div className="ChatsSection--title">{name}</div>
          <div className="ChatsSection--lastChat">
            {lastMessage ? lastMessage : "last message fetching...."}
          </div>
          <div className="ChatsSection--time">yesterday</div>
        </div>
      </ChatsSection>
    </Link>
  );
};

export default SidebarChatsCard;

const ChatsSection = styled.div`
  margin: 5px 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--bgColor);
  border-bottom: 0.5px solid rgba(225, 225, 225, 0.15);
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
      font-size: 1.3em;
      color: #e9edef;
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
