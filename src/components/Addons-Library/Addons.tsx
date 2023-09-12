import React, { useState, useEffect, useContext } from "react";
import AddonsDetails from "./AddonsDetails";
import "./Addons.css";
import { Button } from "@mui/material";
import {
  MESSAGE_FOR_FEATURED_ADDONS,
  NUM_CARDS_IN_HOMEPAGE,
} from "../../common/common";
import {
  MESSAGE_FOR_NEW_ADDONS,
  MESSAGE_FOR_TOP_DOWNLOAD_ADDONS,
  MESSAGE_FOR_TOP_RELATED_ADDONS,
} from "../../common/common";
import { useNavigate } from "react-router-dom";
import { AddonsContext } from "../../context/AddonsContext.ts";
import { AddonTSInterface, getValidAddonProps } from "../TypeScript-Inteface/TypeScript-Interface.tsx";
import { useLocation } from "react-router-dom";
import { filterAddons, sortAddons } from "./Helper-Functions.tsx";

type Props = {
  selectedIDE: string
}
export default function AddonCard({selectedIDE}: Props) {

  const { allAddons } = useContext(AddonsContext);
  const filtered: AddonTSInterface[] = allAddons.filter((addon) => addon.status === 'published');
  const [addons, setAddons] = useState<AddonTSInterface[]>([filtered]);
  const [topDownloads, setTopDownloads] = useState<AddonTSInterface[]>([]);
  const [topRatings, setTopRatings] = useState<AddonTSInterface[]>([]);
  const [topNewAddons, setTopNewAddons] = useState<AddonTSInterface[]>([]);
  const [featuredAddons, setFeaturedAddons] = useState<AddonTSInterface[]>([]);
  const location = useLocation()
  const searchSelectedIDE = new URLSearchParams(location.search).get("searchSelectedIDE")
  const navigate = useNavigate();
  const [numCards, setNumCards] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const cardWidth = 370;
      const availableWidth = window.innerWidth;
      const cardsPerRow = Math.floor(availableWidth / cardWidth);
      setNumCards(cardsPerRow);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  },[])

  useEffect(() => {
    const filteredAddons = filterAddons(allAddons, selectedIDE, searchSelectedIDE);
    if (filteredAddons.length > 0) {
        setAddons(filteredAddons);
    }else {
      setAddons(filtered)
    }
  }, [selectedIDE, searchSelectedIDE, allAddons]);

  useEffect(() => {
    const {
      topDownloads,
      topRatings,
      topNewAddons,
      featuredAddons,
    } = sortAddons(addons, NUM_CARDS_IN_HOMEPAGE);
  
    setTopDownloads(topDownloads);
    setTopRatings(topRatings);
    setTopNewAddons(topNewAddons);
    setFeaturedAddons(featuredAddons);
  }, [addons, NUM_CARDS_IN_HOMEPAGE]);

  const handleViewMore = (filter: string) => {
    navigate(`/addons/${filter}?searchSelectedIDE=${selectedIDE}`, { state: { addons } });
  };

  return (
    <>
      <div className="addon-group">
        {featuredAddons.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3
              style={{ color: "black", textAlign: "left", marginLeft: "30px" }}
            >
              Featured
            </h3>
            <Button
              style={{ marginRight: "30px", marginTop: "20px", color: '#1b74e4' }}
              onClick={() => handleViewMore("featured")}
            >
              View more
            </Button>
          </div>
        ) : (
          <h2 style={{ color: "black", textAlign: "left", marginLeft: "30px" }}>
            Featured
          </h2>
        )}
        {featuredAddons.length > 0 ? (
          <div className="addon-card-grid">
            {featuredAddons.slice(0, numCards).map((addon) => {
                const validAddonProps = getValidAddonProps(addon);
                return <AddonsDetails key={crypto.randomUUID()} {...validAddonProps} />;
            })}
          </div>
        ) : (
          <p style={{ color: "gray" }}>{MESSAGE_FOR_FEATURED_ADDONS}</p>
        )}
      </div>
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
            {topDownloads.slice(0, numCards).map((addon) => {
                const validAddonProps = getValidAddonProps(addon);
                return <AddonsDetails key={crypto.randomUUID()} {...validAddonProps} />;
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
            {topRatings.slice(0, numCards).map((addon) => {
              if (addon.status === "published") {
                const validAddonProps = getValidAddonProps(addon);
                return <AddonsDetails key={crypto.randomUUID()} {...validAddonProps} />;
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
            {topNewAddons.slice(0, numCards).map((addon) => {
                const validAddonProps = getValidAddonProps(addon);
                return <AddonsDetails key={crypto.randomUUID()} {...validAddonProps} />;
            })}
          </div>
        ) : (
          <p style={{ color: "gray" }}>{MESSAGE_FOR_NEW_ADDONS}</p>
        )}
      </div>
    </>
  );
}
