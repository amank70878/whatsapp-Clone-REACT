import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";

const SidebarHeader = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [toggleTrue, setToggleTrue] = useState(false);

  useEffect(() => {
    const fetchingImgUrlFunc = async () => {
      const url = await localStorage.getItem("loggedInWhatsappCloneImg");
      setImgUrl(url);
    };
    fetchingImgUrlFunc();
  }, [toggleTrue]);

  const logoutFunc = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleTrueFunc = () => {
    setToggleTrue((previousState) => !previousState);
  };

  return (
    <SideHeader>
      <div className="sidebar--left">
        {imgUrl && <Avatar className="avatar" srcSet={imgUrl} />}
      </div>
      <div className="sidebar--right">
        <span className="toggleOptionSpan" onClick={toggleTrueFunc}>
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
          <div
            className={`optionDiv ${
              toggleTrue ? "optionDivGrid" : "optionDivNone"
            }`}
          >
            <button onClick={logoutFunc}>Logout</button>
          </div>
        </span>
      </div>
    </SideHeader>
  );
};

export default SidebarHeader;

const SideHeader = styled.nav`
  position: sticky;
  top: 0;
  background-color: var(--componentBgColor);
  z-index: 100;
  height: 62px;
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .sidebar--left {
    .avatar {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }
  .sidebar--right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    span {
      display: grid;
      place-items: center;
      margin-left: 25px;
      svg {
        width: 24px;
        height: 24px;
        color: var(--svgColor);
        fill: currentColor;
        cursor: pointer;
        border-radius: 50%;
        &:hover {
          background-color: var(--greenTextColor);
        }
      }
    }
    .toggleOptionSpan {
      position: relative;
      .optionDivGrid {
        display: grid;
      }
      .optionDivNone {
        display: none;
      }
      .optionDiv {
        place-items: center;
        position: absolute;
        top: 35px;
        right: 0px;
        z-index: 100;
        min-width: 70px;
        min-height: 4vh;
        background-color: #111b21;
        border-radius: 5px;
        button {
          padding: 2px 5px;
          border-radius: 6px;
          color: #d1d1d1;
          font-size: 0.85em;
          font-weight: 500;
          letter-spacing: 0.5px;
          background-color: #111b21;
          border: none;
          outline: none;
          position: relative;
          cursor: pointer;
          &:hover,
          &:active {
            &::before {
              content: "";
              display: block;
              width: 80%;
              height: 1px;
              position: absolute;
              bottom: 5px;
              left: 50%;
              transform: translate(-50%);
              background: #bebebe;
            }
          }
        }
      }
    }
  }
`;
