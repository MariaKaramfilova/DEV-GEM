import React, { useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import "./TableAdminChat.css";
import {
  addAdminMessage,
  editAdminMessage,
  removeAdminMessage,
} from "../../services/user.services";
import { useState } from "react";
import { ADMIN } from "../../common/common";
import { Card } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/base";

interface Message {
  username: string;
  avatar: string;
  time: number;
  content: string;
  id: string;
}
interface User {
  profilePictureURL: string;
  username: string;
  role: string;
}
interface TableAdminChat {
  allMessages: [];
  user: string;
  avatar: string;
  allUsers: []
}
export const TableAdminChat: React.FC<TableAdminChat> = ({
  allMessages,
  user,
  avatar,
  allUsers,
}) => {
  const [incomeMessage, setIncomeMessage] = useState("");
  const filterAdmins = allUsers.filter((user: User) => user.role === ADMIN);
  console.log("hello");

  const handleMessage = async (user: string,avatar: string,incomeMessage: string) => {
    await addAdminMessage(user, avatar, incomeMessage);
    setIncomeMessage("");
  };
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4"style={{marginLeft: '220px'}}>Admin Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className="chat-section">
        <Grid item xs={3}>
          <Divider />
          <List className="sidebar">
          <div style={{fontSize: '25px'}}>Members</div>
          <hr />
            {filterAdmins.map((user: User) => (
              <ListItem>
                <ListItemIcon>
                  <Avatar alt={user.username} src={user.profilePictureURL} />
                </ListItemIcon>
                <ListItemText primary={user.username}>
                  {user.username}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className="message-area">
            {allMessages.map((message:Message, index: number) => (
             <ListItem key={message.id} ref={index === allMessages.length - 1 ? lastMessageRef : null}>
                                <div>
                <Avatar alt={message.username} src={message.avatar} />
                {message.username === user ? (
                  <span
                    style={{
                      color: "gray",
                      fontSize: "15px",
                      marginLeft: "8px",
                      marginRight: "20px",
                    }}
                  >
                    you
                  </span>
                ) : (
                  <span
                    style={{
                      color: "gray",
                      fontSize: "15px",
                      marginRight: "20px",
                    }}
                  >
                    {message.username}
                  </span>
                )}
                </div>
                <span>
                  <div style={{ textAlign: "left", marginTop: "5px", marginLeft: '5px' }}>
                    <span style={{ color: "gray", fontSize: "10px" }}>
                      {new Date(message.time).toLocaleString()}
                    </span>
                  </div>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Card>
                      <ListItemText primary={message.content} />
                    </Card>
                    {message.username === user && (
                        <>
                      <Button
                        style={{
                          fontSize: "2px",
                          border: "none",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => removeAdminMessage(message.id)}
                      >
                        <DeleteIcon style={{ fontSize: "20px" }} />
                      </Button>
                      <Button
                        style={{
                          fontSize: "2px",
                          border: "none",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => editAdminMessage(message.id, 'Test')}
                      >
                        <EditIcon style={{ fontSize: "20px" }} />
                      </Button>
                      </>
                    )}
                  </span>
                </span>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                placeholder="Type your message..."
                fullWidth
                value={incomeMessage}
                onChange={(e) => setIncomeMessage(e.target.value)}
              />
            </Grid>
            <Grid xs={1}>
              {incomeMessage.length > 0 && (
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => handleMessage(user, avatar, incomeMessage)}
                >
                  <SendIcon />
                </Fab>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
