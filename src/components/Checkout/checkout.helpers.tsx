import AddressForm from "./AddressForm.tsx";
import OrderReview from "./OrderReview.tsx";
import PaymentForm from "./PaymentForm.tsx";

export function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <OrderReview />;
    default:
      throw new Error('Unknown step');
  }
}