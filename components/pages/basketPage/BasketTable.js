import { formatCurrency } from "@/lib/formatValues";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { Button } from "@/components/index";

const BasketTable = ({ products, setDeleteProductId }) => {
  let { t, lang } = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <th>{t("basket:product")}</th>
          <th></th>
          <th>{t("basket:params")}</th>
          <th>{t("basket:price")}</th>
          <th>{t("common:delete")}</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const { path, img, name, price, selectedParams, configId } = product;
          const { net, gross, currency } = price;
          return (
            <tr key={configId}>
              <td>
                <Link href={`/${path[lang]}`}>
                  <a target="_blank">
                    <Image
                      src={`/images/${img}`}
                      alt={t(`products:${name}.name`)}
                      layout="fill"
                      objectFit="cover"
                    />
                  </a>
                </Link>
              </td>
              <td>{t(`products:${name}.name`)}</td>
              <Params>
                {selectedParams.map((param) => (
                  <span key={param.name}>
                    {t(`product:${param.name}`)}:{" "}
                    {param.name === "quantity"
                      ? `${param.option.value} ${t(`product:quantityUnit`)}`
                      : t(`product:${param.option.name}`)}
                  </span>
                ))}
              </Params>
              <td>
                {formatCurrency(net, currency, lang)} {t("common:net")} /{" "}
                {formatCurrency(gross, currency, lang)} {t("common:gross")}
              </td>
              <td>
                <Button
                  variant="delete"
                  onClick={() => setDeleteProductId(configId)}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    alt={t("common:delete")}
                    title={t("common:delete")}
                  />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default BasketTable;

const Table = styled.table`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  th,
  td {
    vertical-align: middle;
    padding: ${({ theme }) => theme.spacing.sm};
  }
  tbody tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.gray.xlight};
  }
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  }
  a {
    position: relative;
    display: block;
    height: 80px;
    width: 130px;
    max-width: 100%;
  }
`;

const Params = styled.td`
  span:not(:last-child):after {
    content: "/ ";
  }
`;
