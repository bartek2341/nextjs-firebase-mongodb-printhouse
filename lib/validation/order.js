import { requiredValue } from "@/lib/index";
import {
  PERSONAL_SHIPPING,
  PARCELLOCKER_SHIPPING,
  COURIER_SHIPPING,
  SHIPPING_ADDRESS,
  PARCELLOCKER_ID,
  orderStatus,
} from "@/data/index";

export const isAddressValid = (address) => {
  if (Object.keys(address) > 4) return false;
  const { street, city, postalCode, country } = address;
  return (
    !requiredValue(street) &&
    !requiredValue(city) &&
    !requiredValue(postalCode) &&
    !requiredValue(country)
  );
};

export const shippingValidation = (shipping, details) => {
  if (shipping.name === PERSONAL_SHIPPING) return !details;
  else if (shipping.name === PARCELLOCKER_SHIPPING) {
    return (
      details.name === PARCELLOCKER_ID &&
      !requiredValue(details.value) &&
      Object.keys(details).length === 2
    );
  } else if (shipping.name === COURIER_SHIPPING) {
    return details.name === SHIPPING_ADDRESS && isAddressValid(details.value);
  }
  return false;
};

export const orderStatusValidation = (status) => {
  return Object.values(orderStatus).includes(status);
};
