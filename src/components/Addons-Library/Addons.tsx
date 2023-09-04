import React, { useState, useEffect } from "react";
import AddonsDetails from "./AddonsDetails";
import "./Addons.css";
import { Button } from "@mui/material";
import { NUM_CARDS_IN_HOMEPAGE } from "../../common/common";
import {
  MESSAGE_FOR_NEW_ADDONS,
  MESSAGE_FOR_TOP_DOWNLOAD_ADDONS,
  MESSAGE_FOR_TOP_RELATED_ADDONS,
} from "../../common/common";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { useLocation } from "react-router-dom";

type Props = {
  selectedIDE: string
}
export default function AddonCard({selectedIDE}) {

  const [addons, setAddons] = useState([]);
  const [topDownloads, setTopDownloads] = useState([]);
  const [topRatings, setTopRatings] = useState([]);
  const [topNewAddons, setTopNewAddons] = useState([]);
  const location = useLocation()
  const params = useParams();
  const searchSelectedIDE = new URLSearchParams(location.search).get("searchSelectedIDE")
  const navigate = useNavigate();

  useEffect(() => {
    const addonsRef = ref(database, "addons");

    const addonsListener = onValue(addonsRef, (snapshot) => {
      const updatedAddons = [];

      snapshot.forEach((currentAddon) => {
        const addon = currentAddon.val();
        updatedAddons.push(addon);
      });
      if (selectedIDE !== 'All platforms' && selectedIDE) {
        const filteredAddons = updatedAddons.filter((addon) => addon.targetIDE === selectedIDE)
        setAddons(filteredAddons)
        console.log('with selected');
      }else if(searchSelectedIDE !== 'All platforms' && searchSelectedIDE) {
        const filteredAddons = updatedAddons.filter((addon) => addon.targetIDE === searchSelectedIDE)
        setAddons(filteredAddons)
        console.log('with searchSelected');
      }else if (selectedIDE === 'All platforms') {
        setAddons(updatedAddons);
      }else{
        console.log('empty');
        
         setAddons([]);
      }
    });
    return () => {
      addonsListener();
    };
  }, [selectedIDE]);


  useEffect(() => {
    if (addons.length > 0) {
      const sortedAddonsByDownload = addons
        .slice()
        .sort((a, b) => b.downloads - a.downloads);
      setTopDownloads(sortedAddonsByDownload.slice(0, NUM_CARDS_IN_HOMEPAGE));

      const sortedAddonsByRating = addons
        .slice()
        .sort((a, b) => a.rating - b.rating);
      setTopRatings(sortedAddonsByRating.slice(0, NUM_CARDS_IN_HOMEPAGE));

      const sortedByDate = addons
        .slice()
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
      setTopNewAddons(sortedByDate.slice(0, NUM_CARDS_IN_HOMEPAGE));
    }
  }, [addons]);

  const handleViewMore = (filter: string) => {
    navigate(`/addons/${filter}?searchSelectedIDE=${selectedIDE}`, { state: { addons } });
  };

  return (
    <>
      <div className="addon-group">
        {topDownloads.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3
              style={{ color: "black", textAlign: "left", marginLeft: "30px" }}
            >
              Top Downloads from {selectedIDE}
            </h3>
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
              if (addon.status === "published") {
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
            <h3
              style={{
                color: "black",
                marginTop: "70px",
                textAlign: "left",
                marginLeft: "30px",
              }}
            >
              Top Related from {selectedIDE}
            </h3>
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
              if (addon.status === "published") {
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
            <h3
              style={{
                color: "black",
                marginTop: "70px",
                textAlign: "left",
                marginLeft: "30px",
              }}
            >
              New Addonis from {selectedIDE}
            </h3>
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
              if (addon.status === "published") {
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
