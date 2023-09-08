import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TableWithNotifications } from "./TableWithUserNotifications";
import { fetchUserNotifications } from "../../services/user.services";
export const UserNotification: React.FC = () => {
    const { loggedInUser } = useContext(AuthContext);
    const [notification, setNotification] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchUserNotifications(setNotification, loggedInUser.username);

    return () => {
      unsubscribe();
    };
  }, []);
    return (
        <>
            <h1 style={{textAlign:'start'}}>Notifications</h1>
            <TableWithNotifications incomeNotifications={notification} user={loggedInUser.username}/>
        </>
    )
}