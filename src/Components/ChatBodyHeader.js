import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import MenuTwoToneIcon from "@material-ui/icons/MenuTwoTone";
import { useDispatch, useSelector } from "react-redux";

const ChatBodyHeader = (props) => {
  const dispatch = useDispatch();
  const { menuToggleState } = useSelector((state) => state.amountRedur);
  // const seed = Math.floor(Math.random() * 5000);
  const [fetchedMessages, setFetchedMessages] = useState("");
  const { roomId } = useParams();
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchMessagesFunc = async () => {
      const q = query(
        collection(db, `room/${roomId}/messages`),
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
  }, []);

  const fetchTimeFunc = async () => {
    const lastSeenVar = await fetchedMessages[0].timestamp.toDate();
    const timeVar = new Date(lastSeenVar).toLocaleTimeString().toString();
    setTime(timeVar);
    console.log("last time ", time);
  };

  const toggleChatFunc = () => {
    dispatch({
      type: "menuToggleType",
      payload: true,
    });
  };

  return (
    <ChatBodyHeaderSection toggleByChatHeader={menuToggleState}>
      <ChatBodyHeadeR>
        <div className="ChatBodyHeader--left">
          <span onClick={toggleChatFunc} className="toggleSpan">
            <MenuTwoToneIcon />
          </span>
          <div className="toggleSpanLine"></div>
          <Avatar
            className="avatar"
            // src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
          />
          <div className="ChatBodyHeader--left--info">
            <div className="userName">
              {props.name
                ? props.name.length < 30
                  ? props.name
                  : props.name.slice(0, 30) + `......`
                : "Default Name"}
            </div>
            <div className="userLastSeen">
              last Message at {time ? time : "fetching..."}
            </div>
          </div>
        </div>
      </ChatBodyHeadeR>
    </ChatBodyHeaderSection>
  );
};

export default ChatBodyHeader;

const ChatBodyHeaderSection = styled.nav`
  background-color: var(--componentBgColor);
  .ChatBodyHeader--left {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .toggleSpan {
      display: none;
      place-items: center;
      border-radius: 50%;
      color: var(--svgColor);
      fill: currentColor;
      cursor: pointer;
      &:hover {
        background-color: var(--greenTextColor);
      }
    }
    .avatar {
      width: 36px;
      height: 36px;
      cursor: pointer;
      margin: 0 10px;
      margin-right: 20px;
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
  @media only screen and (max-width: 800px) {
    .ChatBodyHeader--left {
      .toggleSpan {
        display: grid;
        margin: 0 5px;
      }
      .toggleSpanLine {
        background: #75757573;
        width: 1px;
        height: 62px;
        margin: 0 5px;
      }
      .avatar {
        width: 30px;
        height: 30px;
        cursor: pointer;
        margin: 0 5px;
        margin-right: 20px;
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
  }
`;
const ChatBodyHeadeR = styled.nav`
  height: 62px;
  padding: 15px 20px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  @media only screen and (max-width: 800px) {
    padding: 0px 10px;
  }
`;
