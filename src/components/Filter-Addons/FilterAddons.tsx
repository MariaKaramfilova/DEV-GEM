import AddonsDetails from "../Addons-Library/AddonsDetails";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./FilterAddons.css";
import { Button } from "@mui/material";
import { getAllAddons } from "../../services/addon.services.ts";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { LOADING_MORE_ADDONS } from "../../common/common";
import { useLocation } from "react-router-dom";
import { AddonTSInterface } from "../TypeScript-Inteface/TypeScript-Interface.tsx";
import SearchBarForFilterMenu from "../../views/SearchBarForFilterMenu/SearchForFilterMenu.tsx";
import { Addon } from "../../context/AddonsContext.ts";

const FilterAddons: React.FC = () => {
  const [addons, setAddons] = useState<AddonTSInterface[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const { filter } = useParams<{ filter: string; ide?: string }>();
  const [filteredAddons, setFilteredAddons] = useState<Addon[]>([]);
  const [originalFilteredAddons, setOriginalFilteredAddons] = useState<Addon[]>([]);
  const [addonsPerPage, setAddonsPerPage] = useState<number>(3);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const searchSelectedIDE = new URLSearchParams(location.search).get("searchSelectedIDE");

  console.log(searchSelectedIDE);
  console.log(location);
  console.log(filter);
  console.log(searchQuery);

  useEffect(() => {
    const fetchAddons = async () => {
      const allAddons:AddonTSInterface[] = await getAllAddons();
      setAddons(allAddons);
    };
    fetchAddons();

    const addonsRef = ref(database, "addons");

    const addonsListener = onValue(addonsRef, (snapshot) => {
      const updatedAddons: AddonTSInterface[] = [];

      snapshot.forEach((currentAddon) => {
        const addon = currentAddon.val();
        updatedAddons.push(addon);
      });
      setAddons([...updatedAddons]);
    });

    return () => {
      addonsListener();
    };
  }, []);

  useEffect(() => {

    let filtered: Addon[] = addons;
    if (searchSelectedIDE && searchSelectedIDE !== 'All platforms') {
      console.log('here');

      filtered = addons.filter((addon) => addon.targetIDE === searchSelectedIDE);
    }
    if (filter === "search") {
      filtered = filtered.filter((addon) =>
        addon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter === "top-downloads") {
      filtered = filtered
        .slice()
        .sort((a, b) => b.downloads - a.downloads);

    } else if (filter === "top-related") {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);

    } else if (filter === "new-addons") {
      filtered = filtered
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        );
    }else if(filter === 'featured'){
      filtered = filtered
      .slice()
      .filter(
        (addon) => addon.featured === true
      )
    }
    let filterByPublished = filtered.filter((addon) => addon.status === 'published')

    if (currentFilter === "paid") {
      filterByPublished = filtered.filter((addon) => addon.isFree === false);
    } else if (currentFilter === "free") {
      filterByPublished = filtered.filter((addon) => addon.isFree === true);
    }
    setOriginalFilteredAddons(filterByPublished);
    const finallyFilter = filterByPublished.slice(0, addonsPerPage);
    setFilteredAddons(finallyFilter);

  }, [addons, currentFilter, addonsPerPage])


  const incrementItemsPerPage = () => {
    setAddonsPerPage(addonsPerPage + LOADING_MORE_ADDONS);
  };
  console.log(filteredAddons);

  return (
    <div style={{ marginTop: "100px" }}>
      <div>
        {searchQuery ? (
          <h1
            style={{
              textAlign: "left",
              fontSize: "40px",
              marginLeft: "20px",
              color: "gray",
            }}
          >
            You searched by name: {searchQuery}
          </h1>
        ) : (
          <h1
            style={{
              textAlign: "left",
              fontSize: "40px",
              marginLeft: "20px",
              color: "gray",
            }}
          >
            You searched by category: {filter}
          </h1>
        )}
      </div>
      {filteredAddons.length > 0 && (
        <div className="filter-container">
          <Button
            onClick={() => setCurrentFilter("all")}
            style={{
              color: currentFilter === "all" ? "red" : "black",
            }}
          >
            All
          </Button>
          <Button
            onClick={() => setCurrentFilter("paid")}
            style={{
              color: currentFilter === "paid" ? "red" : "black",
            }}
          >
            Paid
          </Button>
          <Button
            onClick={() => setCurrentFilter("free")}
            style={{
              color: currentFilter === "free" ? "red" : "black",
            }}
          >
            Free
          </Button>
        </div>
      )}
      {filteredAddons.length > 0 ? (
        <div className="addon-card-grid">
          {filteredAddons.map((addon) => (
            <AddonsDetails key={addon.addonId} {...addon} />
          ))}
        </div>
      ) : (
        <>
          <div className="filter-container">
          <Button
            onClick={() => setCurrentFilter("all")}
            style={{
              color: currentFilter === "all" ? "red" : "black",
            }}
          >
            All
          </Button>
          <Button
            onClick={() => setCurrentFilter("paid")}
            style={{
              color: currentFilter === "paid" ? "red" : "black",
            }}
          >
            Paid
          </Button>
          <Button
            onClick={() => setCurrentFilter("free")}
            style={{
              color: currentFilter === "free" ? "red" : "black",
            }}
          >
            Free
          </Button>
        </div>
        <h1 style={{ textAlign: "center", fontSize: "30px", marginLeft: "20px" }}>
          There are no addons available in this section!
          </h1>
        </>
      )}

      {originalFilteredAddons.length > addonsPerPage && filteredAddons.length >= addonsPerPage && (
        <Button
          onClick={() => incrementItemsPerPage()}
          style={{ marginTop: "20px" }}
        >
          Show More
        </Button>
      )}
    </div>
  );
};
export default FilterAddons;
