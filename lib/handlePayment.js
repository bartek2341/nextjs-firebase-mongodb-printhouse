import { loadStripe } from "@stripe/stripe-js";
import { payOrderFetch } from "@/data/index";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);

const handlePayment = async (orderId, t, lang) => {
  try {
    const stripeResp = await payOrderFetch(orderId, lang);
    const { id: sessionId } = await stripeResp.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  } catch (err) {
    toast.error(t("account:paymentError"));
  }
};

export default handlePayment;
