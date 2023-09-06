import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import './TableAdminChat.css';
import { addAdminMessage } from '../../services/user.services';
import { useState } from 'react';
import { ADMIN } from '../../common/common';
import { Card } from '@mui/joy';

export const TableAdminChat: React.FC = ({allMessages, user, avatar, allUsers}) => {
    const [incomeMessage, setIncomeMessage] = useState('');
    const filterAdmins = allUsers.filter((user) => user.role === ADMIN)
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Admin Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className="chatSection">
        <Grid item xs={3}>
          <Divider />
          <h3 style={{paddingLeft: '2px'}}>Members</h3>
          <List style={{ backgroundColor: '#dddddd', height: '100%' }}>
            {filterAdmins.map((user) => (
              <ListItem button key={user.uid}>
                <ListItemIcon>
                  <Avatar alt={user.username} src={user.profilePictureURL} />
                </ListItemIcon>
                <ListItemText primary={user.username}>{user.username}</ListItemText>
                <ListItemText align="right"></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
            <div style={{backgroundColor: '#dddddd', height: '67px'}}></div>
          <List className="messageArea">
            {allMessages.map((message) => (
              <ListItem key={message.id} style={{textAlign: 'left'}}>
                 <Avatar alt={message.username} src={message.avatar} />
                 <Card>
                <ListItemText primary={message.content}></ListItemText>
                </Card>
                <ListItemText align="right" secondary={new Date(message.time).toLocaleString()}></ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField 
              id="outlined-basic-email"
              label="Type Something"
              fullWidth
              onChange={(e) => setIncomeMessage(e.target.value)}/>
            </Grid>
            <Grid xs={1}>
              <Fab color="primary" aria-label="add" onClick={() => addAdminMessage(user, avatar, incomeMessage)}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
