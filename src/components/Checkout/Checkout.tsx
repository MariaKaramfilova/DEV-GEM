import React, { Fragment, useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { OrderSteps } from '../../common/common.ts';
import { completeSubscriptionCreateSteps, getStepContent } from './checkout.helpers.tsx';
import { validateAddressForm } from './addressForm.validations.ts';
import { Alert } from '@mui/material';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext.ts';

const steps = [OrderSteps.shipping, OrderSteps.payment, OrderSteps.review];

export default function Checkout() {
  const { loggedInUser } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [error, setError] = useState<string | null>('');
  const [showError, setShowError] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const addonId = params.addon;

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection

    (async () => {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const { type, clientSecret } = await completeSubscriptionCreateSteps(loggedInUser.email, addonId);

      const confirmIntent = type === "setup" ? stripe.confirmSetup : stripe.confirmPayment;

      // Confirm the Intent using the details collected by the Payment Element
      const { error } = await confirmIntent({
        elements,
        clientSecret,
        confirmParams: {
          return_url: 'https://example.com/order/123/complete',
        },
      });
    })();

    if (error) {
      // This point is only reached if there's an immediate error when confirming the Intent.
      // Show the error to your customer (for example, "payment details incomplete").
      handleError(error);
    }

  }, []);

  console.log(error);
  console.log(showError);


  const handleNext = () => {
    if (!error) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep, validateAddressForm, setError)}
              {showError && error && (
                <Alert severity="error">
                  {error}
                </Alert>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  onClickCapture={() => setShowError(!!error)}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </Fragment>
          )}
        </Paper>
      </Container>
    </Fragment>
  );
}