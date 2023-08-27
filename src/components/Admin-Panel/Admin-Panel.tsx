import React, { useContext, useState, useEffect } from "react";
import { CardInvertedColors } from "./Card";
import "./AdminPanel.css";
import { AuthContext } from "../../context/AuthContext";
import { getAllAddons, getAllIDEs } from "../../services/addon.services";
import PeopleTable from "./PeopleTable";
import { Inbox, Search } from "@mui/icons-material";
import { Button } from "@mui/material";

interface User {
  id: string;
  firstName: string;
}

const AdminPanel: React.FC = () => {
  const { loggedInUser, allUsers } = useContext(AuthContext);
  const [addons, setAddons] = useState<string[]>([]);
  const [IDEs, setAllIDEs] = useState<string[]>([]);

  useEffect(() => {
    const fetchAddons = async () => {
      const allAddons = await getAllAddons();
      const allIDEs = await getAllIDEs();
      setAddons(allAddons);
      setAllIDEs(allIDEs);
    };
    fetchAddons();
  }, []);

  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Welcome back, {loggedInUser.firstName}!</span>
        <Button style={{ marginLeft: "auto", color: 'black' }}>
          <Inbox />
        </Button>
      </h1>
      <div className="card-grid-admin-panel">
        <CardInvertedColors child="Total Users" count={allUsers.length} />
        <CardInvertedColors child="Total Addons" count={addons.length} />
        <CardInvertedColors child="Total IDEs" count={IDEs.length} />
      </div>
      <div style={{ width: "50%", overflowX: "auto", marginTop: "30px" }}>
        <h2 style={{ textAlign: "left" }}>All Users</h2>
        <PeopleTable users={allUsers} />
      </div>
    </>
  );
};

export default AdminPanel;
