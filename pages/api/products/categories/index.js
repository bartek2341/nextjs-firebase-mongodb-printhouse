import nc from "next-connect";
import { mongodb, basicRateLimit } from "@/middlewares/index";
import { findAllProductCategories } from "@/mongodb/index";

const handler = nc();

handler.use(basicRateLimit).use(mongodb);

handler.get(async (req, res) => {
  const categories = await findAllProductCategories(req.db);
  res.status(200).json(categories);
});

export default handler;
