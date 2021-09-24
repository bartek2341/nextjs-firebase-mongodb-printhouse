import useTranslation from "next-translate/useTranslation";
import PriceField from "./PriceField";
import { isEqualObj } from "@/lib/index";
import styled from "styled-components";

const PriceTable = ({ prices, selectedPrice }) => {
  let { t, lang } = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <th>{t("product:quantity")}</th>
          <th>{t("product:priceNet")}</th>
          <th>{t("product:priceGross")}</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((priceObj) => (
          <PriceField
            key={priceObj.quantity}
            priceObj={priceObj}
            active={isEqualObj(priceObj.price, selectedPrice)}
            lang={lang}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default PriceTable;

const Table = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border-radius: ${({ theme }) => theme.spacing.xs};
  border-style: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray.light};
  tbody tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.gray.xlight};
  }
  td,
  th {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;
