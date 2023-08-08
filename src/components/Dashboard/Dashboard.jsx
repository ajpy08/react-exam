import React from "react";
import { Button, Avatar } from "@mui/material";
import MovieList from "../MovieList/MovieList";

const Dashboard = ({ onLogout }) => {
  return (
    <>
      <div
        style={{ width: "100%", marginLeft: "80%", backgroundColor: "#03067B" }}
      >
        <div style={{ marginLeft: 100 }}>
          <Avatar src="src/assets/files/myAvatar.jpg" alt="Avatar" />
        </div>
        <div>
          <Button variant="contained" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>{" "}
      <br />
      <br />
      <MovieList />
    </>
  );
};

export default Dashboard;
