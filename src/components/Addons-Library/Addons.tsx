import React, { useState, useEffect } from "react";
import AddonsDetails from "./AddonsDetails";
import { getAllAddons } from "../../services/user.services";
import "./Addons.css";
import { Button } from "@mui/material";
import { NUM_CARDS_IN_HOMEPAGE } from "../../common/common";
import {
  MESSAGE_FOR_NEW_ADDONS,
  MESSAGE_FOR_TOP_DOWNLOAD_ADDONS,
  MESSAGE_FOR_TOP_RELATED_ADDONS,
} from "../../common/common";
import { useNavigate } from "react-router-dom";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";

export default function AddonCard() {
  const [addons, setAddons] = useState([]);
  const [topDownloads, setTopDownloads] = useState([]);
  const [topRatings, setTopRatings] = useState([]);
  const [topNewAddons, setTopNewAddons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddons = async () => {
      const allAddons = await getAllAddons();
      setAddons(allAddons);
    };
    fetchAddons();

    const addonsRef = ref(database, "addons");

    const addonsListener = onValue(addonsRef, (snapshot) => {
      const updatedAddons = [];

      snapshot.forEach((currentAddon) => {
        const addon = currentAddon.val();
        updatedAddons.push(addon);
      });

      setAddons(updatedAddons);
    });

    return () => {
      addonsListener();
    };
  }, []);

  useEffect(() => {
    if (addons.length > 0) {
      const sortedAddonsByDownload = addons
        .slice()
        .sort((a, b) => b.downloadsCount - a.downloadsCount);
      setTopDownloads(sortedAddonsByDownload.slice(0, NUM_CARDS_IN_HOMEPAGE));

      const sortedAddonsByRating = addons
        .slice()
        .sort((a, b) => b.rating - a.rating);
      setTopRatings(sortedAddonsByRating.slice(0, NUM_CARDS_IN_HOMEPAGE));

      const sortedByDate = addons
        .slice()
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
      setTopNewAddons(sortedByDate.slice(0, NUM_CARDS_IN_HOMEPAGE));
    }
  }, [addons]);

  const handleViewMore = (filter: string) => {
    navigate(`/addons/${filter}`, { state: { addons } });
  };

  return (
    <>
      <div className="addon-group">
        {topDownloads.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{ color: "black", textAlign: "left", marginLeft: "30px" }}
            >
              Top Downloads
            </h2>
            <Button
              style={{ marginRight: "30px", marginTop: "20px" }}
              onClick={() => handleViewMore("top-downloads")}
            >
              View more
            </Button>
          </div>
        ) : (
          <h2 style={{ color: "black", textAlign: "left", marginLeft: "30px" }}>
            Top Downloads
          </h2>
        )}
        {topDownloads.length > 0 ? (
          <div className="addon-card-grid">
            {topDownloads.map((addon) => {
              if (addon.status === "accepted") {
                return <AddonsDetails key={addon.addonId} {...addon} />;
              }
              return null;
            })}
          </div>
        ) : (
          <p style={{ color: "gray" }}>{MESSAGE_FOR_TOP_DOWNLOAD_ADDONS}</p>
        )}
      </div>

      <div className="addon-group">
        {topRatings.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                color: "black",
                marginTop: "70px",
                textAlign: "left",
                marginLeft: "30px",
              }}
            >
              Top Related
            </h2>
            <Button
              style={{ marginRight: "30px", marginTop: "60px" }}
              onClick={() => handleViewMore("top-related")}
            >
              View more
            </Button>
          </div>
        ) : (
          <>
            <h2
              style={{
                color: "black",
                marginTop: "70px",
                textAlign: "left",
                marginLeft: "30px",
              }}
            >
              Top Related
            </h2>
          </>
        )}
        {topRatings.length > 0 ? (
          <div className="addon-card-grid">
            {topRatings.map((addon) => {
              if (addon.status === "accepted") {
                return <AddonsDetails key={addon.addonId} {...addon} />;
              }
              return null;
            })}
          </div>
        ) : (
          <p style={{ color: "gray" }}>{MESSAGE_FOR_TOP_RELATED_ADDONS}</p>
        )}
      </div>

      <div className="addon-group">
        {topNewAddons.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                color: "black",
                marginTop: "70px",
                textAlign: "left",
                marginLeft: "30px",
              }}
            >
              New Addonis
            </h2>
            <Button
              style={{ marginRight: "30px", marginTop: "60px" }}
              onClick={() => handleViewMore("new-addons")}
            >
              View more
            </Button>
          </div>
        ) : (
          <>
            <h2
              style={{
                color: "black",
                marginTop: "70px",
                textAlign: "left",
                marginLeft: "30px",
              }}
            >
              New Addonis
            </h2>
          </>
        )}
        {topNewAddons.length > 0 ? (
          <div className="addon-card-grid">
            {topNewAddons.map((addon) => {
              if (addon.status === "accepted") {
                return <AddonsDetails key={addon.addonId} {...addon} />;
              }
              return null;
            })}
          </div>
        ) : (
          <p style={{ color: "gray" }}>{MESSAGE_FOR_NEW_ADDONS}</p>
        )}
      </div>
    </>
  );
}
