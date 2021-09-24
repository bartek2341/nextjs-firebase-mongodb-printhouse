import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { respondTo, formatCurrency, isPerson } from "@/lib/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { DownloadFile } from "@/components/index";

const Order = ({ order, currentUser }) => {
  let { t, lang } = useTranslation();

  const { products, shipping, cartCost, recipient } = order;
  const { details } = shipping;
  const { address } = recipient.data;

  return (
    <Wrapper>
      <div>
        <h3>{t("order:order")}</h3>
        {products.map((product) => {
          const { path, img, name, selectedParams, configId, price } = product;
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
              <div>
                <h5>{t(`products:${name}.name`)}</h5>
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
                <div>
                  {t("order:attachments")}:{" "}
                  {!product.uploadFiles.length
                    ? t("common:empty")
                    : product.uploadFiles.map((file, index) => (
                        <DownloadFile
                          key={index}
                          file={file}
                          currentUser={currentUser}
                          order={order}
                        />
                      ))}
                </div>
                <div>
                  {t("order:price")}: {formatCurrency(net, currency, lang)}{" "}
                  {t("common:net")} / {formatCurrency(gross, currency, lang)}{" "}
                  {t("common:gross")}
                </div>
              </div>
            </Product>
          );
        })}
      </div>
      <Shipping>
        <h3>{t("order:shipping")}</h3>
        <div>
          <div>
            <h5>{t("order:recipient")}</h5>
            <ul>
              {isPerson(recipient) ? (
                <>
                  <li>{recipient.data.name}</li>
                  <li>{recipient.data.vorname}</li>
                </>
              ) : (
                <>
                  <li>{recipient.data.company}</li>
                  <li>{recipient.data.taxId}</li>
                </>
              )}
              <li>{address.street}</li>
              <li>{address.postalCode}</li>
              <li>{address.city}</li>
              <li>{address.country}</li>
            </ul>
          </div>
          <div>
            <h5>{t("order:shippingMethod")}</h5>
            <div>
              {t(`shippingMethods:${shipping.name}.name`)} (
              {formatCurrency(
                shipping.price.net,
                shipping.price.currency,
                lang
              )}{" "}
              {t("common:net")} /{" "}
              {formatCurrency(
                shipping.price.gross,
                shipping.price.currency,
                lang
              )}{" "}
              {t("common:gross")})
            </div>
            {details && typeof details.value === "object" ? (
              <ul>
                {Object.entries(details.value).map(([key, val]) => (
                  <li key={key}>{val}</li>
                ))}
              </ul>
            ) : (
              details && <div>{details.value}</div>
            )}
          </div>
        </div>
      </Shipping>
      <Payment>
        <h3>{t("order:availablePaymentMethods")}</h3>
        <div>
          <div>
            {t("order:creditCard")}:{" "}
            <FontAwesomeIcon
              icon={faCreditCard}
              title={t("order:creditCard")}
              alt={t("order:creditCard")}
            />
          </div>
        </div>
      </Payment>
      <Price>
        <h3>{t("order:orderPrice")}</h3>
        <div>
          {formatCurrency(
            cartCost.net + shipping.price.net,
            cartCost.currency,
            lang
          )}{" "}
          {t("common:net")} /{" "}
          {formatCurrency(
            cartCost.gross + shipping.price.gross,
            cartCost.currency,
            lang
          )}{" "}
          {t("common:gross")}
        </div>
      </Price>
    </Wrapper>
  );
};

export default Order;

const Wrapper = styled.div`
  & > div {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    ${respondTo.sm`
        margin-bottom: ${({ theme }) => theme.spacing.lg};
      `}
    h3 {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      padding-bottom: ${({ theme }) => theme.spacing.xs};
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
      ${respondTo.sm`
        padding-left: ${({ theme }) => theme.spacing.lg};
        margin-bottom: ${({ theme }) => theme.spacing.lg};
      `}
    }
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray.xlight};
  h5 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  ${respondTo.sm`
    flex-direction: row;
    margin-left: ${({ theme }) => theme.spacing.lg};
    & > div {
      margin-left: ${({ theme }) => theme.spacing.md};
    }
  `}
  a {
    position: relative;
    display: block;
    height: 110px;
    width: 170px;
    max-width: 100%;
    ${respondTo.sm`
      height: 80px;
      width: 130px;
  `}
  }
`;

const Params = styled.div`
  span:not(:last-child):after {
    content: "/ ";
  }
`;

const Shipping = styled.div`
  h5 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  & > div {
    display: flex;
    flex-direction: column;
    ${respondTo.sm`
      flex-direction: row;
      margin-left: ${({ theme }) => theme.spacing.lg};
    `}
    & > div:nth-child(2) {
      margin-top: ${({ theme }) => theme.spacing.sm};
      ${respondTo.sm`
        margin-top: 0;
        margin-left: ${({ theme }) => theme.spacing.xl};
      `}
    }
  }
`;

const Payment = styled.div`
  & > div {
    ${respondTo.sm`
       margin-left: ${({ theme }) => theme.spacing.xl};
    `}
  }
`;

const Price = styled.div`
  & > div {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    ${respondTo.sm`
      margin-left: ${({ theme }) => theme.spacing.xl};
  `}
  }
`;
