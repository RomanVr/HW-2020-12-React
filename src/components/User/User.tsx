import React from "react";

interface UserProps {
  logoutClick: () => void;
  nameUser: string;
}

export const User: React.FC<UserProps> = ({ logoutClick, nameUser }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    }}
  >
    <h3>Hello, {nameUser}!</h3>
    <button onClick={logoutClick} style={{ height: 30, alignSelf: "center" }}>
      Logout
    </button>
  </div>
);
