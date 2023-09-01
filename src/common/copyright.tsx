import React from 'react';
import { Typography, Link } from '@mui/material';

interface Props {
  [key: string]: any;
}

function Copyright(props: Props): JSX.Element {
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
