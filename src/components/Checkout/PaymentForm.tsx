import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './checkout.helpers.tsx';
import { paymentOptions } from '../../common/common.ts';
import CheckoutStripe from './CheckoutStripe.tsx';
import { UserData } from './Checkout.tsx';
import { getAddonById } from '../../services/addon.services.ts';
import { useParams } from 'react-router';

interface Props {
  userData: UserData;
  isSubmitted: boolean;
}

export default function PaymentForm({ userData, isSubmitted }: Props) {
  const [addon, setAddon] = useState('');
  const [error, setError] = useState(null);
  const params = useParams();
  const addonId = params.addon;

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
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Elements stripe={stripePromise} options={paymentOptions}>
            <CheckoutStripe userData={userData} isSubmitted={isSubmitted} />
          </Elements>
        </Grid>
      </Grid>
    </Fragment>
  );
}