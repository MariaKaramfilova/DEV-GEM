import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import "./Addons-Details.css";
import StarRating from "../../views/StarRating/StarRating";

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
    function truncateText(text: string, limit: number) {
      const words = text.split(" ");
      if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
      }
      return text;
    }
  
    return (
      <Card className="card" sx={{ maxWidth: 290, maxHeight: 175, marginLeft: 'auto', marginRight: 'auto' }}>
        <CardHeader
          avatar={
            <img
              src={addon.adonImage}
              alt="Addon Image"
              style={{ width: "80px", height: "60px" }}
            />
          }
          title={<div style={{fontSize:'17px'}} className="custom-title-class">{addon.name}
           <StarRating rating={addon.rating} />
          </div>}
        />
        <div className="addon-info">
          <Typography variant="body2" color="text.secondary">
            <span className="paid-free-info free">{addon.isFree}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className="download">
              {addon.downloadsCount} downloads
            </span>
          </Typography>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {truncateText(addon.content, 8)}
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
