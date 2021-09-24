import { formatCurrency } from "@/lib/formatValues";
import styled from "styled-components";

const PriceField = ({ priceObj, active, lang }) => {
  const { net, gross, currency } = priceObj.price;
  return (
    <Tr active={active}>
      <td>{priceObj.quantity}</td>
      <td>{formatCurrency(net, currency, lang)}</td>
      <td>{formatCurrency(gross, currency, lang)}</td>
    </Tr>
  );
};

export default PriceField;

const Tr = styled.tr`
  color: ${({ theme, active }) => active && theme.colors.white};
  background-color: ${({ theme, active }) =>
    active && theme.colors.blue.normal} !important;
  transition: 0.3s;
`;
