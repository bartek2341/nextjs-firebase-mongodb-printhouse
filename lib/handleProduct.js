import { isEqualObj, generateId } from "@/lib/index";
import { findProductById, findProductPricesById } from "@/mongodb/index";

export const getInitProductParams = (product) => {
  const paramsTable = [];

  product.params.forEach((param) => {
    const paramObj = {
      ...param,
      option: param.values[0],
    };
    delete paramObj.values;
    paramsTable.push(paramObj);
  });

  const quantityObj = {
    ...product.quantity,
    option: product.quantity.quantityTable[0],
  };
  delete quantityObj.quantityTable;
  paramsTable.push(quantityObj);

  return paramsTable;
};

export const getParamValues = (params) => {
  const obj = {};
  params.forEach(
    (param) =>
      param.name !== "quantity" &&
      Object.assign(obj, {
        [param.name]: param.option.value,
      })
  );
  return obj;
};

export const getPriceKey = (params) => {
  let priceKey = "";
  Object.values(params).forEach((value) => (priceKey += value));
  return priceKey;
};

export const getProductPrices = async (paramValues, productId, db) => {
  const priceKey = getPriceKey(paramValues);
  const pricesColl = await findProductPricesById(db, productId, db);
  return pricesColl.prices[priceKey];
};

export const setQuantityObj = (quantity, value) => {
  const obj = {
    ...quantity,
    option: quantity.quantityTable.find((quant) => quant.value === value),
  };
  delete obj.quantityTable;
  return obj;
};

export const setParamObj = (param, value) => {
  const obj = {
    ...param,
    option: param.values[value],
  };
  delete obj.values;
  return obj;
};

export const findProductsInDb = async (products, db) => {
  const productsArr = [];
  for (const product of products) {
    const productColl = await findProductById(db, product._id);
    if (productColl) {
      if (!productColl.inStock) return;
      const dbParams = product.selectedParams.filter((param, index) => {
        if (param.name === "quantity") {
          const obj = setQuantityObj(productColl.quantity, param.option.value);
          return isEqualObj(obj, param);
        } else {
          const obj = setParamObj(
            productColl.params[index],
            param.option.value
          );
          return isEqualObj(obj, param);
        }
      });
      if (dbParams.length !== product.selectedParams.length) return;
      productColl.selectedParams = dbParams;
      productColl.configId = generateId();
      productsArr.push(productColl);
    }
  }
  return productsArr;
};

export const assignProductPrices = async (products, db) => {
  for (const product of products) {
    const paramValues = getParamValues(product.selectedParams);
    const prices = await getProductPrices(paramValues, product._id, db);
    const selectedQuantity = product.selectedParams.find(
      (p) => p.name === "quantity"
    ).option.value;
    const selectedPrice = prices.find((p) => p.quantity === selectedQuantity);
    const { price } = selectedPrice;
    product.price = price;
  }
};
