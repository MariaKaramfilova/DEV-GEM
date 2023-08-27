import React, { useContext, useState, useEffect } from "react";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import TableWithPendingAddons from "./TableWithNewAddons";


export const AdminInbox: React.FC = () => {
    const usersRef = ref(database, "addons");
    const [addons, setAddons] = useState([]);

  useEffect(() => {
    const usersListener = onValue(usersRef, (snapshot) => {
      const updatedUsers = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        updatedUsers.push(user);
      });
      setAddons(updatedUsers);
    });
    return () => {
      usersListener();
    };
  }, []);

    return (
      <>
        <h1 style={{textAlign:'start'}}>Notifications</h1>
        <TableWithPendingAddons />
      </>
    )
}