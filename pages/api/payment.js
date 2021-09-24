import nc from "next-connect";
import { mongodb } from "@/middlewares/index";
import { buffer } from "micro";
import { Stripe } from "stripe";
import { updateOrderById } from "@/mongodb/index";
import { orderStatus } from "@/data/index";

const handler = nc();
const stripe = Stripe(process.env.STRIPE_SECRET);

handler.use(mongodb);

handler.all(async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.WEBHOOK_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "payment_intent.succeeded") {
      const { orderId } = event.data.object.metadata;
      const order = await updateOrderById(orderId, req.db, {
        status: orderStatus.processing,
      });
      res.status(200).json(order);
    }
  } else {
    res.set("Allow", "POST").status(405).end();
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
