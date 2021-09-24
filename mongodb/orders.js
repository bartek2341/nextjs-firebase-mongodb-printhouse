import { orderStatus } from "@/data/index";

export async function createOrder(order, orderId, db) {
  return db
    .collection("orders")
    .insertOne({
      _id: orderId,
      ...order,
      status: orderStatus.pending_payment,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]._id);
}

export async function findAllOrders(db) {
  return db.collection("orders").find().toArray();
}

export const deleteOrderById = (orderId, db) => {
  return db
    .collection("orders")
    .findOneAndDelete({ _id: orderId })
    .then(({ value }) => value._id);
};

export async function updateOrderById(orderId, db, data) {
  return db
    .collection("orders")
    .findOneAndUpdate(
      { _id: orderId },
      { $set: data },
      { returnOriginal: false }
    )
    .then(({ value }) => value);
}

export async function findAllUserOrders(user, db) {
  return db
    .collection("orders")
    .find({ "user.user_id": user.user_id })
    .toArray();
}
