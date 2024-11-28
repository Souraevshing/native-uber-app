import { Stripe } from "stripe";

const stripe = new Stripe(process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY!);

/**
 * @description MAKE PAYMENT using Stripe
 * @param req Request
 * @returns payment details containing customer id, payment intent having payment_method, short lived API for payment to authenticate
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, amount } = body;
    if (!name || !email || !amount) {
      return new Response(
        JSON.stringify({ error: "All fields are mandatory", status: 400 })
      );
    }

    let customer;

    // check if customer exists by email
    const isCustomerExist = await stripe.customers.list({ email });

    // if customer does not exist, then create new customer by name and email
    if (isCustomerExist.data.length > 0) {
      customer = isCustomerExist.data[0];
    } else {
      const newCustomer = await stripe.customers.create({
        name,
        email,
      });

      customer = newCustomer;
    }

    // create short lived API to authenticate payment
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-10-28" }
    );

    // create payment intent to initiate payment having all the required details
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency: "inr",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    return new Response(
      JSON.stringify({
        paymentIntent: paymentIntent,
        ephemeralKey: ephemeralKey,
        customer: customer.id,
      })
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err, status: 500 }));
  }
}
