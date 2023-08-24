import * as React from 'react';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { Preview } from '../../components/Dropzone/Dropzone.tsx';
import { IconButton, ListDivider } from '@mui/joy';
import Modal from '@mui/material/Modal';
import { ListItemSecondaryAction } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DividedList({ caption, name, type }: Preview, setFiles) {
  const [open, setOpen] = React.useState(false);

  const handleRemoveItem = (index) => {
    setFiles((prevItems) => prevItems.filter((file) => file.name !== name));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div key={'default'}>
        <ListItem>
          <ListItemDecorator>
            <img
              style={{ height: '2em', width: 'auto', margin: '0.2em' }}
              src={caption}
              onClick={handleOpen}
            />
          </ListItemDecorator>
          <p style={{ fontSize: 'small' }}>{name}</p>
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => handleRemoveItem(name)}>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListDivider inset='default' />
      </div>
      <Modal open={open} onClose={handleClose} >
        <img src={caption} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Modal>
    </>
  );
}
