export async function findAllProducts(db) {
  return db.collection("products").find().toArray();
}

export async function findAllProductCategories(db) {
  return db.collection("productCategories").find().toArray();
}

export async function findProductCategoryByPath(db, path, locale) {
  return db
    .collection("productCategories")
    .findOne({ [`path.${locale}`]: path });
}

export async function findProductCategoryByName(db, category) {
  return db.collection("productCategories").findOne({ name: category });
}

export async function findProductsByCategory(db, category) {
  return db.collection("products").find({ category }).toArray();
}

export async function findProductPricesById(db, id) {
  return db.collection("productPrices").findOne({ _id: `${id}_prices` });
}

export async function findProductByPath(db, path, locale) {
  return db.collection("products").findOne({ [`path.${locale}`]: path });
}

export async function findProductByName(db, name) {
  return db.collection("products").findOne({ name });
}

export async function findProductById(db, id) {
  return db.collection("products").findOne({ _id: id });
}
