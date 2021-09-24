import {
  findProductsInDb,
  canDeleteOrder,
  canPayOrder,
  canUpdateOrder,
  userDataValidation,
  shippingValidation,
} from "@/lib/index";
import { findShippingById } from "@/mongodb/index";
import { maxBasketProducts } from "@/data/index";

export const orderValidation = async (req, res, next) => {
  const { db, body } = req;
  const { products, shipping, recipient } = body;
  //products
  const dbProducts = await findProductsInDb(products, db);
  if (
    !dbProducts.length ||
    dbProducts.length !== products.length ||
    dbProducts.length > maxBasketProducts
  )
    return res.status(400).end();

  //recipient
  const isUserDataValid = userDataValidation(recipient);
  if (!isUserDataValid) return res.status(400).end();

  //shipping
  const shippingColl = await findShippingById(shipping._id, db);
  if (!shippingColl) return res.status(400).end();

  const isShippingValid = shippingValidation(shippingColl, shipping.details);
  if (!isShippingValid) return res.status(400).end();

  req.order = {
    products,
    dbProducts,
    dbShipping: shippingColl,
    shippingDetails: shipping.details,
    recipient,
  };

  next();
};

export const setOrder = async (req, res, next) => {
  const { query, db } = req;
  const { orderId } = query;
  const order = await db.collection("orders").findOne({ _id: orderId });
  if (order == null) {
    return res.status(404).end();
  }
  req.order = order;
  next();
};

export const updateOrder = async (req, res, next) => {
  const { user } = req;
  if (!canUpdateOrder(user)) {
    return res.status(403).end();
  }
  next();
};

export const deleteOrder = async (req, res, next) => {
  const { order, user } = req;
  if (!canDeleteOrder(order, user)) {
    return res.status(403).end();
  }
  next();
};

export const payOrder = async (req, res, next) => {
  const { order, user } = req;
  if (!canPayOrder(order, user)) {
    return res.status(403).end();
  }
  next();
};
