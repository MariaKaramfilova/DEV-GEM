import React, {useEffect, useState, useContext} from "react";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { TableAdminChat } from "./TableAdminChat";
import { AuthContext } from "../../context/AuthContext";

export const AdminGroupChat: React.FC = () => {
    const [allMessages, setAllMessages] = useState([]);
    const { loggedInUser, allUsers } = useContext(AuthContext);
    useEffect(() => {
        const addonsRef = ref(database, "adminMessages");
        
        const addonsListener = onValue(addonsRef, (snapshot) => {
          const updatedMessages: Addon[] = [];
    
          snapshot.forEach((childSnapshot) => {
            const addon = childSnapshot.val();
            updatedMessages.push(addon);
          });

          setAllMessages(updatedMessages)
        });
        return () => {
          addonsListener();
        };
      }, []);
    return (
        <>
            <TableAdminChat allMessages={allMessages} user={loggedInUser.username} avatar={loggedInUser.profilePictureURL} allUsers={allUsers}/>
        </>
    )
}