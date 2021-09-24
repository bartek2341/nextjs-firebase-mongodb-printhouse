export async function findAllShippingMethods(db) {
  return db.collection("shippings").find().toArray();
}

export async function findShippingById(shippingId, db) {
  return db.collection("shippings").findOne({ _id: shippingId });
}
