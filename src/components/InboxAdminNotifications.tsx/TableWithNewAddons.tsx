import React, { useState, useEffect } from "react";
import { Button, Table } from "@mui/joy";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { handleCopyDetails } from "./HelperFunctions";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { AddonTSInterface } from "../TypeScript-Inteface/TypeScript-Interface";
import { handleAcceptAddon, handleRejectAddon } from "./HelperFunctions";
const TableWithPendingAddons: React.FC = ({ incomeAddons }) => {
  const [addons, setAddons] = useState<AddonTSInterface[]>([]);

  useEffect(() => {
    const pendingAddons = incomeAddons.filter(
      (addon) => addon.status === "pending"
    );

    setAddons(pendingAddons);
  }, [incomeAddons]);

  return (
    <div>
      {addons.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Image</th>
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
                <td>
                  <img
                    src={addon.logo}
                    alt="logo"
                    style={{ width: "50px", borderRadius: "10px" }}
                  />
                </td>
                <td>{addon.name}</td>
                <td>{new Date(addon.createdOn).toLocaleString()}</td>
                <td>{addon.targetIDE}</td>
                <Button
                  variant="outlined"
                  style={{ marginTop: "5px", border: "none" }}
                  onClick={() => handleCopyDetails(addon.downloadLink)}
                >
                  <FileCopyIcon />
                </Button>
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
      ) : (
        <h1>There are currently no notifications!</h1>
      )}
    </div>
  );
};

export default TableWithPendingAddons;
