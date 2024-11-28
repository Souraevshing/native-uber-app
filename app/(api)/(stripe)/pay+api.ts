import { Stripe } from "stripe";

const stripe = new Stripe(process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY!);

/**
 * @description CONFIRM PAYMENT
 * @param req Request
 * @returns confirm payment and return
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { payment_method_id, payment_intent_id, customer_id } = body;

    // validate all fields are filled
    if (!payment_method_id || !payment_intent_id || !customer_id) {
      return new Response(
        JSON.stringify({ error: "Payment details missing", status: 400 })
      );
    }

    // create payment_method, attach with payment_method_id and customer_id inside req body
    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      {
        customer: customer_id,
      }
    );

    // confirm payment by payment intent created and passing payment_intent_id as argument
    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment successful",
        result: result,
      })
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err, status: 500 }));
  }
}
