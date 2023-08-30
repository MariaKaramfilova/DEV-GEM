import React, { useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { Addon, AddonsContext } from "../../context/AddonsContext.ts";
import { getAllAddons } from "../../services/addon.services.ts";
import { onValue, ref } from "@firebase/database";
import { database } from "../../config/firebase.ts";

interface AddonsContextProviderProps {
  children: ReactNode;
}

/**
 * A context provider component for managing posts data within the application.
 *
 * Fetches all posts data and provides it through a context for other components to access.
 *
 * @component
 * @param {object} children - The nested components that will be wrapped by this context provider.
 * @returns {JSX.Element} Rendered component with posts context provider.
 */
export default function AddonsContextProvider({ children }: AddonsContextProviderProps): JSX.Element {
  const { allAddons, setAllAddons } = useContext(AddonsContext);
  const [appAddonsState, setAppAddonsState] = useState({ allAddons, setAllAddons });

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllAddons();
        setAppAddonsState((prev) => ({ ...prev, allAddons: result }));
      } catch (err) {
        console.log(err);
      }
    })();

    const addonsRef = ref(database, "addons");

    const addonsListener = onValue(addonsRef, (snapshot) => {
      const updatedAddons: Addon[] = [];

      snapshot.forEach((currentAddon) => {
        const addon = currentAddon.val();
        updatedAddons.push(addon);
      });

      setAppAddonsState((prev) => ({ ...prev, allAddons: updatedAddons }));
    });

    return () => {
      addonsListener();
    };
  }, []);

  return (
    <div className="main-content">
      <AddonsContext.Provider
        value={{ ...appAddonsState, setAllAddons: setAppAddonsState }}
      >
        {children}
      </AddonsContext.Provider>
    </div>
  );
}
