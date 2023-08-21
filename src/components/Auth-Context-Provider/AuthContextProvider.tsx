import { AuthContext } from "../../context/AuthContext.ts";
// eslint-disable-next-line no-unused-vars
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase.ts";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import { getAllUsers, getUserData } from "../../services/user.services.ts";

/**
 * A component that handles the authentication state and provides it to its children.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.children - The children components to render.
 */
const AuthContextProvider = ({ children }: { children: ReactNode; }) => {
  const { user, loggedInUser } = useContext(AuthContext);
  const [appState, setAppState] = useState({ user, loggedInUser });
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      (async () => {
        try {
          const allUsers = await getAllUsers();
          if (currentUser) {
            const loggedUserSnapshot = await getUserData(currentUser.uid);
            const loggedInUser = Object.values(loggedUserSnapshot.val()).find(
              (el) => el.uid === currentUser.uid
            );
            setAppState((prev) => ({
              ...prev,
              loggedInUser,
              user: currentUser,
              allUsers,
            }));
          } else {
            setAppState((prev) => ({
              ...prev,
              loggedInUser: currentUser,
              user: currentUser,
              allUsers,
            }));
          }
        } catch (error) {
          setError(error);
        }
      })();
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

export default AuthContextProvider;

/**
 * PropTypes for the RoutePage component.
 *
 * @memberof RoutePage
 * @static
 */

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
