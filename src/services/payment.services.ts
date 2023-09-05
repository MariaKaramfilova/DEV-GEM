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
