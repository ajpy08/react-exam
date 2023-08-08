import React from "react";
import { Button, Avatar } from "@mui/material";
import MovieList from "../MovieList/MovieList";
import photo from '../../assets/files/myAvatar.jpg'

const Dashboard = ({ onLogout }) => {
  return (
    <>
      <div
        style={{ width: "100%", marginLeft: "80%", backgroundColor: "#03067B" }}
      >
        <div style={{ marginLeft: 100 }}>
          <Avatar src={photo} alt="Avatar" />
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
