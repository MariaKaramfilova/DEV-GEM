import * as React from 'react';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useNavigate } from 'react-router-dom';
import { EDIT_ADDON_PATH } from '../../common/common.ts';

interface Props {
  addonId: string;
}

export default function RowMenu(props: Props) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`${EDIT_ADDON_PATH}/${props.addonId}`);
  }

  const handleDelete = () => {
    
  }

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <Divider />
        <MenuItem color="danger" onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}