import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './checkout.helpers.tsx';
import { paymentOptions } from '../../common/common.ts';
import CheckoutStripe from './CheckoutStripe.tsx';
import { UserData } from './Checkout.tsx';

interface Props {
  userData: UserData;
  isSubmitted: boolean;
}

export default function PaymentForm({ userData, isSubmitted }: Props) {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* @ts-ignore */}
          <Elements stripe={stripePromise} options={paymentOptions}>
            <CheckoutStripe userData={userData} isSubmitted={isSubmitted} />
          </Elements>
        </Grid>
      </Grid>
    </Fragment>
  );
}