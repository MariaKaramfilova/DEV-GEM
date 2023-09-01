import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import "./Addons-Details.css";
import StarRating from "../../views/StarRating/StarRating";
import { truncateText } from "./Helper-Functions";
import { DETAILED_ADDON_VIEW_ID_PATH, NUM_WORDS_IN_CARDS } from "../../common/common";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import RatingWithValue from "../Reviews/RatingWithValue";

interface AddonsDetailsProps {
  addon: {
    adonImage: string;
    name: string;
    createdOn: string;
    isFree: string;
    downloadsCount: number;
    rating: number;
    content: string;
  };
}

const AddonsDetails: React.FC<AddonsDetailsProps> = ({ ...addon }) => {
  const navigate = useNavigate();

  if (addon.status !== 'published') {
    return null;
  }
  let strippedHtml = addon.description.replace(/<[^>]+>/g, ' ');

  const handleClick = () => {
    navigate(`${DETAILED_ADDON_VIEW_ID_PATH}${addon.addonId}`);
  }

  return (
    <Card onClick={handleClick} className="card" sx={{ width: 370, display: 'flex', flexDirection: 'column', height: '250px', boxSizing: 'border-box', padding: 0, marginLeft: 'auto', marginRight: 'auto',  marginBottom: '40px', borderRadius: '5px', cursor: 'pointer', borderRadius: '10px' }}>
      <CardHeader
        avatar={
          addon.logo && (
            <img
              src={addon.logo}
              alt="Addon Image"
              style={{ width: "70px", borderRadius: '10px' }}
            />
          )
        }
        title={
          <div style={{ fontSize: '19px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',  padding: 5, }} className="custom-title-class">
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '3px' }}>
              {addon.name}
            </div>
            <div style={{ fontSize: '10px' }}>{addon.company}</div>
            {/* <StarRating rating={addon.rating} /> */}
            <RatingWithValue addonId={addon.addonId}></RatingWithValue>
          </div>
        }
    />
    <div className="addon-info">
      <Typography variant="body2" color="text.primary" style={{ marginBottom: '8px' }}>
        <span className="paid-free-info free">free</span>
      </Typography>
      <Typography variant="body2" color="text.primary">
        <span className="download" style={{marginLeft: '14px'}}>
          {addon.downloads} downloads
        </span>
      </Typography>
    </div>
    <CardContent style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <Typography variant="body2" color="text.secondary" style={{ textAlign: 'start' }}>
        {truncateText(strippedHtml, NUM_WORDS_IN_CARDS)}
        
      </Typography>
     
    </CardContent>
    <CardActions disableSpacing></CardActions>
    <Collapse>
      <CardContent></CardContent>
    </Collapse>
  </Card>
  );
};

export default AddonsDetails;
