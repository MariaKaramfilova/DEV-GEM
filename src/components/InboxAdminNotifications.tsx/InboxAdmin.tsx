import React, { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import TableWithPendingAddons from "./TableWithNewAddons";


export const AdminInbox: React.FC = () => {
    const addonsRef = ref(database, "addons");
    const [addons, setAddons] = useState([]);

  useEffect(() => {
    const usersListener = onValue(addonsRef, (snapshot) => {
      const updatedAddons = [];
      snapshot.forEach((childSnapshot) => {
        const addon = childSnapshot.val();
        updatedAddons.push(addon);
      });
      setAddons(updatedAddons);
    });
    return () => {
      usersListener();
    };
  }, []);

    return (
      <>
        <h1 style={{textAlign:'start'}}>Notifications</h1>
        <TableWithPendingAddons incomeAddons={addons}/>
      </>
    )
}