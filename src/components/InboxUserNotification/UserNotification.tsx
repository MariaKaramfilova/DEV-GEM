import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TableWithNotifications } from "./TableWithUserNotifications";
export const UserNotification: React.FC = () => {
    const { loggedInUser } = useContext(AuthContext);
    const usersRef = ref(database, `users/${loggedInUser.username}/notifications`);
    const [notification, setNotification] = useState([]);

  useEffect(() => {
    const usersListener = onValue(usersRef, (snapshot) => {
      const updatedUsers = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        updatedUsers.push(user);
      });
      setNotification(updatedUsers);
    });
    return () => {
      usersListener();
    };
  }, []);
    return (
        <>
            <h1 style={{textAlign:'start'}}>Notifications</h1>
            <TableWithNotifications incomeNotifications={notification} user={loggedInUser.username}/>
        </>
    )
}