import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const SidebarChatsCard = ({ name, id }) => {
  const { roomId } = useParams();
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState("");
  console.log("fetchedMessages :-> ", fetchedMessages);
  console.log(id);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    const fetchMessagesFunc = async () => {
      const msgDataCollectionRef = collection(db, `room/${id}/messages`);
      const q = query(msgDataCollectionRef, orderBy("timestamp", "desc"));
      const result = await getDocs(q);
      setFetchedMessages(
        result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    fetchMessagesFunc();
  }, []);

  // const fetchLastMessageFunc = async () => {
  //   const num = await (fetchedMessages.length - 1);
  //   const lastMsgVar = await fetchedMessages[num].message;
  //   setLastMessage(lastMsgVar);
  // };
  // fetchLastMessageFunc();

  return (
    <Link to={`/rooms/${id}`}>
      <ChatsSection>
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="rightChats">
          <div className="ChatsSection--title">{name}</div>
          <div className="ChatsSection--lastChat">{lastMessage}...</div>
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
  background-color: var(--bhColor);
  border-bottom: 0.5px solid rgba(225, 225, 225, 0.15);
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
