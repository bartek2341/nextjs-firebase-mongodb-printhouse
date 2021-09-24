import { orderStatus, orderSection, orderSort } from "@/data/index";
import { formatPrice } from "@/lib/index";
import { PERSONAL_SHIPPING } from "@/data/index";
const BinPacking3D = require("binpackingjs").BP3D;

export const calculateOrderPrice = (products, shipping) => {
  const productsPriceNet = products.reduce(
    (n, { price }) => formatPrice(n + price.net),
    0
  );

  const productsPriceGross = products.reduce(
    (n, { price }) => formatPrice(n + price.gross),
    0
  );

  const productsTax = products.reduce(
    (n, { price }) => formatPrice(n + price.tax.value),
    0
  );
  const orderPriceNet = formatPrice(productsPriceNet + shipping.price.net);

  const orderPriceGross = formatPrice(
    productsPriceGross + shipping.price.gross
  );

  const orderTax = formatPrice(productsTax + shipping.price.tax.value);

  return {
    orderPriceNet,
    orderPriceGross,
    orderTax,
  };
};

const { Item, Bin, Packer } = BinPacking3D;

export const calculateShippingMethods = (products, shippingMethods) => {
  const items = [];

  products.forEach((product) => {
    const selectedSize = product.selectedParams.find(
      (param) => param.name === "size"
    );
    const size = product.sizes.find(
      (size) => size.name === selectedSize.option.name
    );
    const quantity = product.selectedParams.find(
      (param) => param.name === "quantity"
    ).option.value;

    const minQuantity = product.quantity.quantityTable[0].value;
    const numberOfBoxes = quantity / minQuantity;

    for (let i = 1; i <= numberOfBoxes; i++) {
      const { width, height, length, weight } = size.values;
      items.push(
        new Item(`Item${i}-${product.configId}`, width, height, length, weight)
      );
    }
  });

  const selectedMethods = shippingMethods.map((method) => {
    if (method.name === PERSONAL_SHIPPING) return method;

    const containerFits = method.containers.find((container, index) => {
      const { width, height, length, weight } = container.size;
      let bin = new Bin(`box${index + 1}`, width, height, length, weight);
      let packer = new Packer();
      packer.addBin(bin);
      items.forEach((item) => {
        packer.addItem(item);
      });
      packer.pack();
      return packer.unfitItems <= 0;
    });

    return (
      containerFits && {
        ...method,
        price: containerFits.price,
      }
    );
  });
  return selectedMethods.filter(Boolean);
};

export const canDeleteOrder = (order, user) => {
  if (user.isAdmin) return true;
  else if (order.user.user_id === user.user_id) {
    return order.status === orderStatus.pending_payment;
  }
  return false;
};

export const canUpdateOrder = (user) => {
  return user.isAdmin;
};

export const canPayOrder = (order, user) => {
  if (order.user.user_id === user.user_id || user.isAdmin) {
    return order.status === orderStatus.pending_payment;
  }
  return false;
};

export const scopeOrders = (orders, user) => {
  if (user.isAdmin) return orders;
  return orders.filter((order) => order.user.user_id === user.user_id);
};

export const filterOrdersBySection = (orders, section) => {
  if (section === orderSection.current)
    return orders.filter(
      (order) =>
        order.status !== orderStatus.delivered &&
        order.status !== orderStatus.rejected
    );
  else if (section === orderSection.ended)
    return orders.filter(
      (order) =>
        order.status === orderStatus.delivered ||
        order.status === orderStatus.rejected
    );
  else return orders;
};

export const sortOrders = (orders, sortBy) => {
  return orders.sort(function compare(a, b) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (sortBy === orderSort.oldest) return dateA - dateB;
    return dateB - dateA;
  });
};
