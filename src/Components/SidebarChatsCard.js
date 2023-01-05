import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";

const SidebarChatsCard = ({ name, id }) => {
  const dispatch = useDispatch();
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

  const toggleChatFunc = () => {
    dispatch({
      type: "menuToggleType",
      payload: false,
    });
  };

  return (
    <Link to={`/rooms/${id}`} onClick={toggleChatFunc}>
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
        </div>
      </ChatsSection>
    </Link>
  );
};

export default SidebarChatsCard;

const ChatsSection = styled.div`
  padding: 5px 10px;
  margin: 8px 5px;
  height: 52px;
  border-radius: 10px;
  background-color: var(--componentBgColor);
  display: flex;
  flex-direction: row;
  align-items: center;
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
      font-size: 1.2em;
      color: #e9edef;
      white-space: nowrap;
    }
    .ChatsSection--lastChat {
      font-size: 0.9em;
      color: #b4b4b4;
      white-space: nowrap;
      width: 90%;
      overflow: hidden;
    }
  }
  @media only screen and (max-width: 1350px) {
    .rightChats {
      padding: 0 5px;
    }
    .ChatsSection--title {
      font-size: 1.1em;
    }
  }
  @media only screen and (max-width: 800px) {
    padding: 5px 10px;
    margin: 8px 5px;
    height: 52px;
    border: none;
    border-radius: 10px;
    background-color: var(--componentBgColor);
    .avatar {
      width: 30px;
      height: 30px;
    }
    .rightChats {
      padding: 0 2px;
    }
  }
  @media only screen and (max-width: 550px) {
    margin: 8px 5px;
    .rightChats {
      .ChatsSection--title {
        font-size: 1em;
        font-weight: 500;
      }
      .ChatsSection--lastChat {
        font-size: 0.9em;
      }
    }
  }
`;
