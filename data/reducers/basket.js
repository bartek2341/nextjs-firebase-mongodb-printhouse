import {
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  CLEAR_BASKET,
} from "@/data/constants";
import { currency, taxRate } from "@/data/common";
import { formatPrice } from "@/lib/index";

const initialState = {
  products: [],
  cartCost: {
    net: 0,
    gross: 0,
    currency,
    tax: {
      rate: taxRate,
      value: 0,
      currency,
    },
  },
};

function basket(state = initialState, action) {
  const { cartCost, products } = state;
  switch (action.type) {
    case CLEAR_BASKET:
      return initialState;
    case ADD_PRODUCT_SUCCESS:
      const { price } = action.payload;
      const totalNet = cartCost.net + price.net;
      const totalGross = cartCost.gross + price.gross;
      const totalTax = cartCost.tax.value + price.tax.value;
      return {
        products: [...state.products, action.payload],
        cartCost: {
          net: formatPrice(totalNet),
          gross: formatPrice(totalGross),
          currency: cartCost.currency,
          tax: {
            rate: cartCost.tax.rate,
            value: formatPrice(totalTax),
            currency: cartCost.tax.currency,
          },
        },
      };
    case DELETE_PRODUCT:
      const deletedProduct = products.find(
        (product) => product.configId === action.payload
      );
      const substractedNet = cartCost.net - deletedProduct.price.net;
      const substractedGross = cartCost.gross - deletedProduct.price.gross;
      const substractedTax =
        cartCost.tax.value - deletedProduct.price.tax.value;
      const newProductList = state.products.filter(
        (product) => product.configId !== action.payload
      );
      return {
        products: newProductList,
        cartCost: {
          net: formatPrice(substractedNet),
          gross: formatPrice(substractedGross),
          currency: cartCost.currency,
          tax: {
            rate: cartCost.tax.rate,
            value: formatPrice(substractedTax),
            currency: cartCost.tax.currency,
          },
        },
      };
    default:
      return state;
  }
}

export default basket;
