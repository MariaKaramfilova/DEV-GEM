import React, { ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import PropTypes from "prop-types";
import { onAuthStateChanged, User } from "firebase/auth";
import { getAllUsers, getUserData } from "../../services/user.services";
import { AuthContext } from "../../context/AuthContext";

interface UserData {
  uid: string;
}

interface AppState {
  user: User | null;
  loggedInUser: UserData | null;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const { user: contextUser, loggedInUser: contextLoggedInUser } = useContext(AuthContext);
  const [appState, setAppState] = useState<AppState>({ user: contextUser, loggedInUser: contextLoggedInUser });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        const allUsers = await getAllUsers();

        if (currentUser) {
          const loggedUserSnapshot = await getUserData(currentUser.uid);
          const userDataArray = Object.values(loggedUserSnapshot.val()) as UserData[];
          const loggedInUserData = userDataArray.find((el) => el.uid === currentUser.uid);
          
          setAppState((prev) => ({
            ...prev,
            loggedInUser: loggedInUserData || null,
            user: currentUser,
            allUsers,
          }));
        } else {
          setAppState((prev) => ({
            ...prev,
            loggedInUser: null,
            user: null,
            allUsers,
          }));
        }
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="main-content">
      <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
