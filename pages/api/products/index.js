import nc from "next-connect";
import { mongodb, basicRateLimit } from "@/middlewares/index";
import { findAllProducts } from "@/mongodb/index";

const handler = nc();

handler.use(basicRateLimit).use(mongodb);

handler.get(async (req, res) => {
  const products = await findAllProducts(req.db);
  res.status(200).json(products);
});

export default handler;
