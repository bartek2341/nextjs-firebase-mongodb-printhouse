import nc from "next-connect";
import { mongodb, basicRateLimit } from "@/middlewares/index";
import { findProductByName } from "@/mongodb/index";

const handler = nc();

handler.use(basicRateLimit).use(mongodb);

handler.get(async (req, res) => {
  const { db, query } = req;
  const product = await findProductByName(db, query.product);
  res.status(200).json(product);
});

export default handler;
