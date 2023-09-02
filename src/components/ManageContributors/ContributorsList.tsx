import React, { useContext } from 'react'
import { Avatar, IconButton, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Tooltip, Typography } from '@mui/joy'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AuthContext, LoggedInUser } from '../../context/AuthContext.ts';

function ContributorsList(maintainers: string[]) {
  const { allUsers } = useContext(AuthContext);

  return (
    <List>
      {maintainers.length ? maintainers.map((item, index) => {
        const targetUser = allUsers.filter((el: LoggedInUser) => el.uid === item)[0];

        return (
          <div>
            <ListItem
              endAction={
                <Tooltip
                  title="Remove contributor"
                  color="danger"
                  placement="left"
                  size="md">
                  <IconButton aria-label="Remove" size="sm" color="danger" onClick={() => handleRemoveContributor(item, addon.addonId)}>
                    <PersonRemoveIcon />
                  </IconButton>
                </Tooltip>
              }>
              <ListItemDecorator>
                <Avatar size="sm" src={targetUser.profilePictureURL} />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="title-sm">{targetUser.firstName + " " + targetUser.lastName}</Typography>
                <Typography level="body-sm" noWrap>
                  {targetUser.username}
                </Typography>
              </ListItemContent>
            </ListItem>
            <ListDivider />
          </div>
        )
      }) : <Typography>No maintainers yet</Typography>}
    </List>
  )
}

export default ContributorsList