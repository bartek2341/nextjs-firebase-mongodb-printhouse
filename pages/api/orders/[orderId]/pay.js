import nc from "next-connect";
import {
  mongodb,
  auth,
  authCompleted,
  setOrder,
  payOrder,
  basicRateLimit,
} from "@/middlewares/index";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const handler = nc();

handler
  .use(basicRateLimit)
  .use(mongodb)
  .use(auth)
  .use(authCompleted)
  .use(setOrder)
  .use(payOrder);

handler.get(async (req, res) => {
  const { user, order } = req;

  const locale = req.headers["content-language"];

  const orderPirceCents = order.cartCost.gross * 100;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    payment_intent_data: {
      metadata: {
        orderId: order._id,
      },
    },
    line_items: [
      {
        price_data: {
          currency: "pln",
          product_data: {
            name: `Order id: ${order._id}`,
          },
          unit_amount: orderPirceCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    locale,
    customer_email: user.email,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/payment/error`,
  });
  res.status(200).json(session);
});

export default handler;
