import { formatCurrency } from "@/lib/index";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { Button } from "@/components/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const BasketList = ({ products, setDeleteProductId }) => {
  let { t, lang } = useTranslation();

  return products.map((product) => {
    const { path, img, name, price, selectedParams, configId } = product;
    const { net, gross, currency } = price;

    return (
      <Product key={configId}>
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
        <h5>{t(`products:${name}.name`)}</h5>
        <ul>
          {selectedParams.map((param) => (
            <li key={param.name}>
              {t(`product:${param.name}`)}:{" "}
              {param.name === "quantity"
                ? `${param.option.value} ${t(`product:quantityUnit`)}`
                : t(`product:${param.option.name}`)}
            </li>
          ))}
          <li>
            {t("basket:price")}: {formatCurrency(net, currency, lang)}{" "}
            {t("common:net")} / {formatCurrency(gross, currency, lang)}{" "}
            {t("common:gross")}
          </li>
        </ul>
        <Button variant="delete" onClick={() => setDeleteProductId(configId)}>
          <FontAwesomeIcon
            icon={faTimes}
            alt={t("common:delete")}
            title={t("common:delete")}
          />
        </Button>
      </Product>
    );
  });
};

export default BasketList;

const Product = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray.xlight};
  h5 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  a {
    position: relative;
    display: block;
    height: 110px;
    width: 170px;
    max-width: 100%;
  }
`;
