import React from 'react';
import { Typography, Link } from '@mui/material';
import { PropsTSForCopyRightFile } from '../components/TypeScript-Inteface/TypeScript-Interface';

function Copyright(props: PropsTSForCopyRightFile): JSX.Element {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Unknown Addonis
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
