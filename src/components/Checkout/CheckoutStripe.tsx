import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { completeSubscriptionCreateSteps } from './checkout.helpers.tsx';
import { AuthContext } from '../../context/AuthContext.ts';

type Props = {}

function CheckoutStripe({ }: Props) {
  const [error, setError] = useState<string | null>('');
  const [showError, setShowError] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const addonId = params.addon;
  const { loggedInUser } = useContext(AuthContext);


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

  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  )
}

export default CheckoutStripe