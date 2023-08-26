import React, { useContext, useState, useEffect } from "react";
import { CardInvertedColors } from "./Card";
import "./AdminPanel.css";
import { AuthContext } from "../../context/AuthContext";
import { getAllAddons, getAllIDEs } from "../../services/addon.services";
import PeopleTable from "./PeopleTable";

interface User {
  id: string;
  firstName: string;
  // Add other properties if needed
}

const AdminPanel: React.FC = () => {
  const { loggedInUser, allUsers } = useContext(AuthContext);
  const [addons, setAddons] = useState<string[]>([]); // Change to appropriate type
  const [IDEs, setAllIDEs] = useState<string[]>([]); // Change to appropriate type

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
      <h1 style={{ textAlign: "left" }}>
        Welcome back, {loggedInUser.firstName}!
      </h1>
      <div className="card-grid-admin-panel">
        <CardInvertedColors child="Total Users" count={allUsers.length} />
        <CardInvertedColors child="Total Addons" count={addons.length} />
        <CardInvertedColors child="Total IDEs" count={IDEs.length} />
      </div>
      <div style={{ width: "50%", overflowX: "auto", marginTop: '30px' }}>
        <h2 style={{ textAlign: "left" }}>All Users</h2>
        <PeopleTable users={allUsers} />
      </div>
    </>
  );
};

export default AdminPanel;
