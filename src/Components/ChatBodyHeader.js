import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const ChatBodyHeader = (props) => {
  const [fetchedMessages, setFetchedMessages] = useState("");
  const { roomId } = useParams();
  const [seed, setSeed] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const randomNumberVar = Math.floor(Math.random() * 5000);
    setSeed(randomNumberVar);
    const fetchMessagesFunc = async () => {
      const msgDataCollectionRef = collection(db, `room/${roomId}/messages`);
      const q = query(msgDataCollectionRef, orderBy("timestamp", "desc"));
      const result = await getDocs(q);
      setFetchedMessages(
        result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      fetchTimeFunc();
    };
    fetchMessagesFunc(); // eslint-disable-next-line
  }, []);

  const fetchTimeFunc = async () => {
    const lastMsgVar = await (fetchedMessages.length - 1);
    const lastSeenVar = await fetchedMessages[lastMsgVar].timestamp.toDate();
    const timeVar = new Date(lastSeenVar).toLocaleTimeString();
    setTime(timeVar);
  };

  return (
    <ChatBodyHeaderSection>
      <div className="ChatBodyHeader--left">
        <Avatar
          className="avatar"
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="ChatBodyHeader--left--info">
          <div className="userName">{props.name ? props.name : "default"}</div>
          <div className="userLastSeen">
            last seen at {time ? time : "....."}
          </div>
        </div>
      </div>
      <div className="ChatBodyheader--right">
        <span>
          <SearchIcon />
        </span>
        <span>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            className=""
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
            ></path>
          </svg>
        </span>
      </div>
    </ChatBodyHeaderSection>
  );
};

export default ChatBodyHeader;

const ChatBodyHeaderSection = styled.nav`
  height: 62px;
  overflow: hidden;
  padding: 15px 20px;
  background-color: var(--componentBgColor);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .ChatBodyHeader--left {
    display: inherit;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 36px;
      height: 36px;
      cursor: pointer;
      margin: 0 10px;
    }
    .ChatBodyHeader--left--info {
      display: inherit;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      line-height: 1.3;
      cursor: pointer;
      .userName {
        font-size: 1.1em;
        font-weight: 500;
        color: var(--primaryText);
      }
      .userLastSeen {
        font-size: 0.8em;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: var(--secondaryText);
      }
    }
  }
  .ChatBodyheader--right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    span {
      display: grid;
      place-items: center;
      margin-left: 20px;
      svg {
        width: 24px;
        height: 24px;
        color: var(--svgColor);
        fill: currentColor;
        cursor: pointer;
      }
    }
  }
`;
