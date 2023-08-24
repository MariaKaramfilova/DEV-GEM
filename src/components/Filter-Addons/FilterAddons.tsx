import AddonsDetails from "../Addons-Library/AddonsDetails";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllAddons } from "../../services/user.services";
import "./FilterAddons.css";
import SearchBarForFilterMenu from "../../views/SearchBarForFilterMenu/SearchForFilterMenu";
import { Button } from "@mui/material";
const FilterAddons: React.FC<FilterAddonsProps> = () => {
  const [addons, setAddons] = useState([]);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  useEffect(() => {
    const fetchAddons = async () => {
      const allAddons = await getAllAddons();
      setAddons(allAddons);
    };
    fetchAddons();

    const mockSubscription = setInterval(() => {
      fetchAddons();
    }, 1000);

    return () => clearInterval(mockSubscription);
  }, []);

  const { filter } = useParams<{ filter: string }>();
  const [filteredAddons, setFilteredAddons] = useState<Addon[]>([]);

  const filterAddons = () => {
    let filtered: Addon[] = [];

    if (filter === "top-downloads") {
      filtered = addons
        .slice()
        .sort((a, b) => b.downloadsCount - a.downloadsCount);
    } else if (filter === "top-related") {
      filtered = addons.slice().sort((a, b) => b.rating - a.rating);
    } else if (filter === "new-addons") {
      filtered = addons
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        );
    }

    if (currentFilter === "paid") {
      filtered = filtered.filter((addon) => addon.isFree === "paid");
    } else if (currentFilter === "free") {
      filtered = filtered.filter((addon) => addon.isFree === "free");
    }

    setFilteredAddons(filtered);
  };

  useEffect(() => {
    filterAddons();
  }, [addons]);

  return (
    <div style={{ marginTop: "100px" }}>
      <SearchBarForFilterMenu />
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
      <div className="addon-card-grid">
        {filteredAddons.map((addon) => (
          <AddonsDetails key={addon.addonId} {...addon} />
        ))}
      </div>
    </div>
  );
};
export default FilterAddons;
