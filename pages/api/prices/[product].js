import nc from "next-connect";
import { mongodb, basicRateLimit } from "@/middlewares/index";
import { findProductByName } from "@/mongodb/index";
import { getProductPrices } from "@/lib/index";

const handler = nc();

handler.use(basicRateLimit).use(mongodb);

handler.post(async (req, res) => {
  const { db, query, body } = req;

  const name = query.product;
  const product = await findProductByName(db, name);
  const prices = await getProductPrices(body, product._id, db);
  if (prices) {
    res.status(200).json(prices);
  } else {
    res.status(400).end();
  }
});

export default handler;
