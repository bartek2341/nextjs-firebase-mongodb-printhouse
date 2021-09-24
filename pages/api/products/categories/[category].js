import nc from "next-connect";
import { mongodb, basicRateLimit } from "@/middlewares/index";
import { findProductCategoryByName } from "@/mongodb/index";

const handler = nc();

handler.use(basicRateLimit).use(mongodb);

handler.get(async (req, res) => {
  const { db, query } = req;
  const name = query.category;
  const category = await findProductCategoryByName(db, name);
  res.status(200).json(category);
});

export default handler;
