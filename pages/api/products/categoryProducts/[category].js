import nc from "next-connect";
import { mongodb, basicRateLimit } from "@/middlewares/index";
import { findProductsByCategory } from "@/mongodb/index";

const handler = nc();

handler.use(basicRateLimit).use(mongodb);

handler.get(async (req, res) => {
  const { db, query } = req;
  const { category } = query;
  const products = await findProductsByCategory(db, category);
  res.status(200).json(products);
});

export default handler;
