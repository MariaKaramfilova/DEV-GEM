import React, {useEffect, useState, useContext} from "react";
import { database } from "../../config/firebase";
import { TableAdminChat } from "./TableAdminChat";
import { AuthContext } from "../../context/AuthContext";
import { ADMIN } from "../../common/common";
import { fetchAdminMessagesAndUpdateState } from "../../services/user.services";

export const AdminGroupChat: React.FC = () => {
    const [allMessages, setAllMessages] = useState([]);
    const { loggedInUser, allUsers } = useContext(AuthContext);
    const filterAdmins = allUsers.filter((user: User) => user.role === ADMIN);
    useEffect(() => {
      const unsubscribe = fetchAdminMessagesAndUpdateState(setAllMessages);

      return () => {
        unsubscribe();
      };
      }, []);
    return (
        <>
            <TableAdminChat allMessages={allMessages} user={loggedInUser.username} avatar={loggedInUser.profilePictureURL} filterAdmins={filterAdmins}/>
        </>
    )
}