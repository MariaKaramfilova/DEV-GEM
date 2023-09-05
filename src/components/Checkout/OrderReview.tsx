import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import { getAddonById } from '../../services/addon.services.ts';
import { Alert, Snackbar } from '@mui/material';

export default function OrderReview() {
  const [addon, setAddon] = useState('');
  const [error, setError] = useState(null);
  const params = useParams();
  const addonId = params.addon;

  console.log(addon);

  useEffect(() => {
    (async () => {
      try {
        if (addonId) {
          const response = await getAddonById(addonId);
          setAddon(response);
        }
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [addonId]);

  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">The following error has ocurred: {error}</Alert>
      </Snackbar>
    )
  }

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem key={addonId} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={addon.name} />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${addon.price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          {/* <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {/* {payments.map((payment) => (
              <Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </Fragment>
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}