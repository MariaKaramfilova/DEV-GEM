import React, { useState } from 'react';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { Preview } from '../../components/Dropzone/Dropzone.tsx';
import { Box, IconButton, ListDivider, ModalClose, ModalDialog, Stack } from '@mui/joy';
import Modal from '@mui/material/Modal';
import { ListItemSecondaryAction, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DividedList({ image, setFiles, setPreview }) {
  const [open, setOpen] = useState(false);

  const handleRemoveItem = () => {
    console.log('test');

    setPreview((prev) => prev.filter((file) => file.name !== image.name));
    setFiles((prevItems) => prevItems.filter((file) => file.name !== image.name));
  };

  return (
    <>
        <Stack sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0}}>
          <img
            style={{ height: '2em', width: 'auto', margin: '0.5em', borderRadius: '5px', boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)' }}
            src={image.caption}
            onClick={() => setOpen(true)}
          />
          <p style={{fontSize: 'small'}}>{image.name}</p>
          <CloseIcon onClick={() => handleRemoveItem(image.name)} style={{ fontSize: 'large', margin: '1em' }}/>
        </Stack>
        {/* <ListItem>
          <ListItemSecondaryAction style={{ right: "auto", left: "11%", flex: "1" }}>
            <ListItemDecorator>
              <img
                style={{ height: '2em', width: 'auto', margin: '0.2em', borderRadius: '5px', boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)' }}
                src={image.caption}
                onClick={handleOpen}
              />
            </ListItemDecorator>
          </ListItemSecondaryAction>

          <ListItemText style={{ flex: "3", fontSize: '2px', marginRight: '5em', textAlign: 'left', marginLeft: '3em' }} primary={image.name} />

          <ListItemSecondaryAction sx={{ flex: "4", fontSize: '2px', marginLeft: '10em', textAlign: 'left' }} onClick={() => handleRemoveItem(image.name)}>
            <IconButton  >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>

        </ListItem>
        <ListDivider /> */}
      <Modal open={open} onClose={() => setOpen(false)} >
        <ModalDialog
          layout="center"
          sx={{
            padding: 0,
            boxShadow: 24,
            borderRadius: 0,
            border: 0
          }}>
          <ModalClose
            onClick={() => setOpen(false)}
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.surface',
            }}
          />
          <Box component='img' src={image.caption} sx={{
            maxWidth: '100%', maxHeight: '100%', padding: 0, margin: 0
          }}></Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
