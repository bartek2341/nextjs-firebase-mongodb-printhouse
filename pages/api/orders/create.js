import nc from "next-connect";
import {
  mongodb,
  auth,
  authCompleted,
  orderValidation,
  createOrderLimit,
} from "@/middlewares/index";
import { bodyParserSizeLimit } from "@/data/index";
import admin from "@/firebase/admin";
import fileType from "file-type";
import { currency, taxRate, maxFiles } from "@/data/index";
import { createOrder } from "@/mongodb/index";
import {
  assignProductPrices,
  generateOrderId,
  calculateOrderPrice,
  calculateShippingMethods,
  fileValidation,
  uploadFile,
} from "@/lib/index";

const handler = nc();
handler
  .use(createOrderLimit)
  .use(mongodb)
  .use(auth)
  .use(authCompleted)
  .use(orderValidation);

handler.post(async (req, res) => {
  const { user, db, order } = req;
  const { products, dbProducts, recipient, dbShipping, shippingDetails } =
    order;

  await assignProductPrices(dbProducts, db);
  const [selectedShipping] = calculateShippingMethods(dbProducts, [dbShipping]);

  const { orderPriceNet, orderPriceGross, orderTax } = calculateOrderPrice(
    dbProducts,
    selectedShipping
  );

  const orderData = {
    products: dbProducts,
    recipient,
    shipping: {
      ...selectedShipping,
      details: shippingDetails,
    },
    cartCost: {
      net: orderPriceNet,
      gross: orderPriceGross,
      currency,
      tax: {
        rate: taxRate,
        value: orderTax,
        currency,
      },
    },
    user: {
      email: user.email,
      user_id: user.user_id,
    },
  };

  const orderId = generateOrderId();

  //upload files
  const bucket = admin
    .storage()
    .bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

  for (let i = 0; i < dbProducts.length; i++) {
    if (!products[i].uploadFiles || !products[i].uploadFiles.length > maxFiles)
      return res.status(400).end();

    const uploadedFiles = [];

    for (const file of products[i].uploadFiles) {
      const isValidFile = await fileValidation(file, fileType);
      if (!isValidFile) {
        //delete already uploaded files
        await bucket.deleteFiles({
          prefix: `userFiles/${user.user_id}/${orderId}/`,
        });
        return res.status(400).end();
      }
      try {
        const fileName = await uploadFile(file, user.user_id, orderId, bucket);
        uploadedFiles.push(fileName);
      } catch (err) {
        return res.status(400).end();
      }
      dbProducts[i].uploadFiles = uploadedFiles;
    }
  }

  await createOrder(orderData, orderId, db);

  res.status(201).json(orderId);
});

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: bodyParserSizeLimit,
    },
  },
};
