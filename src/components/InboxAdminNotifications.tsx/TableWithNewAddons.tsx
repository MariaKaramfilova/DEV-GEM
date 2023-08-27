import React, { useState, useEffect } from "react";
import { Table } from "@mui/joy";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { updateAddonStatus } from "../../services/addon.services";

const TableWithPendingAddons: React.FC = () => {
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    const addonsRef = ref(database, "addons");
    
    const addonsListener = onValue(addonsRef, (snapshot) => {
      const updatedAddons = [];

      snapshot.forEach((childSnapshot) => {
        const addon = childSnapshot.val();
        updatedAddons.push(addon);
      });

      const pendingAddons = updatedAddons.filter(addon => addon.status === 'pending');

      setAddons(pendingAddons);
    });

    return () => {
      addonsListener();
    };
  }, []);

  const handleAcceptAddon = (addonId) => {
    updateAddonStatus(addonId, "accepted");
  };
  
  const handleRejectAddon = (addonId) => {
    updateAddonStatus(addonId, "rejected");
  };
  
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th style={{textAlign: 'center'}}>Image</th>
            <th style={{ textAlign: "center" }}>Addon Name</th>
            <th style={{ textAlign: "center" }}>Created On</th>
            <th style={{ textAlign: "center" }}>Target IDE</th>
            <th style={{ textAlign: "center" }}>Download Link</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addons.map((addon) => (
            <tr key={addon.addonId}>
              <td><img src={addon.logo} alt="logo" style={{ width: "50px", borderRadius: '10px' }}/></td>
              <td>{addon.name}</td>
              <td>{new Date(addon.createdOn).toLocaleString()}</td>
              <td>{addon.targetIDE}</td>
              <td>heelo</td>
              <td>
                <IconButton
                  aria-label="accept addon"
                  onClick={() => handleAcceptAddon(addon.addonId)}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  aria-label="reject addon"
                  onClick={() => handleRejectAddon(addon.addonId)}
                >
                  <ClearIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableWithPendingAddons;
