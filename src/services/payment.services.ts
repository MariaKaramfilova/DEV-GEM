import { stripe } from "../config/stripe.ts"

export const createStripeProduct = async (name: string, addonId: string) => {
  try {
    const product = await stripe.products.create({
      name,
      metadata: {
        'addon_id': addonId,
      },
    });
    return product.id

  } catch (error) {
    console.log(error);
  }
}

export const createStripePrice = async (productId: string, unitPrice: number) => {
  try {
    await stripe.prices.create({
      unit_amount: unitPrice * 100,
      currency: 'usd',
      recurring: { interval: 'year' },
      product: productId,
    })
  } catch (error) {
    console.log(error);
  }
}

export const createStripeCustomer = async (
  email: string,
  uid: string,
  name: string,
  country: string,
  city: string,
  line1: string,
  zip: string,
  state?: string) => {
  try {
    const customer = await stripe.customers.create({
      name,
      email,
      address: {
        city,
        country,
        line1,
        postal_code: zip,
        state,
      },
      metadata: {
        'user_uid': uid,
      },
    });

    return customer.id;
  } catch (error) {
    console.log(error);
  }
}

export const getStripeCustomerByEmail = async (email: string) => {
  try {
    const customer = await stripe.customers.search({
      query: `email:${email}`,
    });
    return customer.data[0]?.id;
  } catch (error) {
    console.log(error);
  }
}

export const getStripePriceByProductId = async (productId: string) => {
  try {
    const price = await stripe.prices.search({
      query: `product:${productId}`,
    })

    return price.data[0].id;
  } catch (error) {
    console.log(error);
  }
}

export const createStripeSubscription = async (customerId: string, priceId: string) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {price: priceId},
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
    });

    if (subscription.pending_setup_intent !== null) {
      return ({
        type: 'setup',
        clientSecret: subscription.pending_setup_intent.client_secret,
      });
    } else {
      return ({
        type: 'payment',
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// export const confirmPayment = async (elements, clientSecret, redirectURL) => {
//   const {error} = await stripe.confirmPayment({
//     elements,
//     clientSecret,
//     confirmParams: {
//       return_url: 'https://example.com/order/123/complete',
//     },
//   });
// }
