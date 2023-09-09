import React from 'react';
import { Typography } from '@mui/material';
import { PropsTSForCopyRightFile } from '../components/TypeScript-Inteface/TypeScript-Interface';

function Copyright(props: PropsTSForCopyRightFile): JSX.Element {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        DEV GEM &nbsp;
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
