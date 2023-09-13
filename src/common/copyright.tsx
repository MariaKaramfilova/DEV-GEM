import React from 'react';
import { Typography } from '@mui/material';

interface PropsTSForCopyRightFile {
  props: string
}

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
