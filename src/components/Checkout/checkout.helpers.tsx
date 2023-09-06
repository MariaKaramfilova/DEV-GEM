import { Dispatch, SetStateAction } from "react";
import AddressForm from "./AddressForm.tsx";
import OrderReview from "./OrderReview.tsx";
import PaymentForm from "./PaymentForm.tsx";
import { API_KEY_STRIPE_PUBLISHABLE } from "../../common/common.ts";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeCustomer, createStripeSubscription, getStripeCustomerByEmail, getStripePriceByProductId } from "../../services/payment.services.ts";
import { UserData } from "./Checkout.tsx";

export function getStepContent(step: number,
  validateCheckout: (firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    zip: string,
    country: string,
    setError: Dispatch<SetStateAction<string | null>>) => void,
  setError: Dispatch<SetStateAction<string | null>>,
  setUserdata: Dispatch<SetStateAction<UserData>>,
  userData: UserData) {
  switch (step) {
    case 0:
      return <AddressForm validateFn={validateCheckout} setError={setError} setUserdata={setUserdata}/>;
    case 1:
      return <PaymentForm {...userData}/>;
    case 2:
      return <OrderReview />;
    default:
      throw new Error('Unknown step');
  }
}

export const stripePromise = loadStripe(API_KEY_STRIPE_PUBLISHABLE);

export const completeSubscriptionCreateSteps = async (
  email: string, 
  productId: string,
  uid: string,
  name: string,
  userData: UserData) => {

  try {
    let currentCustomer = await getStripeCustomerByEmail(email);
    if (!currentCustomer) {
      currentCustomer = await createStripeCustomer(email, uid, name, userData.country, userData.city, userData.address, userData.zip);
    }
    const priceId = await getStripePriceByProductId(productId);

    const result = currentCustomer && priceId && await createStripeSubscription(currentCustomer, priceId);

    return result;

  } catch (error) {
    console.log(error);
  }
}