import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router';
import { completeSubscriptionCreateSteps } from './checkout.helpers.tsx';
import { AuthContext } from '../../context/AuthContext.ts';
import { UserData } from './Checkout.tsx';
import Loading from '../../views/Loading/Loading.tsx';

interface Props {
  userData: UserData;
  isSubmitted: boolean;
}

function CheckoutStripe({ userData, isSubmitted }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const addonId = params.addon;
  const { loggedInUser } = useContext(AuthContext);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const currentUrl = location.pathname + location.search + location.hash;
  const domain = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setErrorMessage(error.message);
  }

  useEffect(() => {
    if (isSubmitted && submitButtonRef.current) {
      submitButtonRef.current.click();
      setLoading(true);
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const { type, clientSecret } = addonId && await completeSubscriptionCreateSteps(
        loggedInUser.email,
        addonId,
        loggedInUser.uid,
        userData,
        addonId);

      const confirmIntent = type === "setup" ? stripe.confirmSetup : stripe.confirmPayment;
      console.log(confirmIntent);

      const { error } = await confirmIntent({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${domain}${currentUrl}/complete`,
        },
      });

      if (error) {
        handleError(error);
      }

    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" ref={submitButtonRef} style={{ display: 'none' }} />
      {loading && <Loading />}
    </form>
  )
}

export default CheckoutStripe