import React, { useContext, useState, useEffect } from "react";
import { CardInvertedColors } from "./Card";
import "./AdminPanel.css";
import { AuthContext } from "../../context/AuthContext";
import { getAllAddons} from "../../services/addon.services";
import PeopleTable from "./PeopleTable";
import { Inbox } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import Typography from "@mui/material/Typography";
import { ADMIN_INBOX_PATH } from "../../common/common";
import { getAllIDEs } from "../../services/IDE.services";

interface Addon {
  name: string;
  status: string;
}

interface IDE {
  name: string;
}

const AdminPanel: React.FC = () => {
  const { loggedInUser, allUsers } = useContext(AuthContext);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [IDEs, setAllIDEs] = useState<IDE[]>([]);
  const [pendingAddons, setPendingAddons] = useState(false);
  useEffect(() => {
    const fetchAddons = async () => {
      const allAddons: Addon[] = await getAllAddons();
      const allIDEs: IDE[] = await getAllIDEs();
      setAddons(allAddons);
      setAllIDEs(allIDEs);
    };
    fetchAddons();
    const addonsRef = ref(database, "addons");
    
    const addonsListener = onValue(addonsRef, (snapshot) => {
      const updatedAddons: Addon[] = [];

      snapshot.forEach((childSnapshot) => {
        const addon = childSnapshot.val();
        updatedAddons.push(addon);
      });

      const pendingAddonsFilter = updatedAddons.filter(addon => addon.status === 'pending');
      if (pendingAddonsFilter.length > 0) {
        setPendingAddons(true);
      }

    });
    return () => {
      addonsListener();
    };
  }, []);

  return (
    <>
      <Typography variant="h5"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: '15px',
          marginBottom: '2em',
          fontWeight: "bold"
        }}
      >
        <span>Welcome back, {loggedInUser.firstName}!</span>
        <Link
          to={ADMIN_INBOX_PATH}
        >
          <Button>
            <Inbox />
            {pendingAddons && <div className="notification-indicator" />}
          </Button>
        </Link>
      </Typography>
      <div className="card-grid-admin-panel" style={{gap: 50}}>
        <CardInvertedColors child="Total Users" count={allUsers.length} />
        <CardInvertedColors child="Total Addons" count={addons.length} />
        <CardInvertedColors child="Total IDEs" count={IDEs.length} />
      </div>
      <div style={{ width: "60%", overflowX: "auto", marginTop: "30px" }}>
        <h2 style={{ textAlign: "left" }}>All Users</h2>
        <PeopleTable/>
      </div>
    </>
  );
};

export default AdminPanel;
