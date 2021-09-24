import connectMongodb, { mongoConfig } from "@/mongodb/connect";
import { MongoClient } from "mongodb";
import { findAllProducts, findProductByPath } from "@/mongodb/index";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { useProduct } from "@/hooks/index";
import {
  ParamField,
  QuantityField,
  PriceTable,
  Spinner,
} from "@/components/pages/productPage/index";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Button, Wrapper } from "@/components/index";
import {
  respondTo,
  toJson,
  getParamValues,
  formatCurrency,
  generateId,
  getProductPrices,
  getInitProductParams,
} from "@/lib/index";
import {
  pricesFetch,
  addProductSuccess,
  addProductError,
  maxBasketProducts,
  btnDisableTime,
} from "@/data/index";
import Image from "next/image";
import { Form } from "react-final-form";
import { connect } from "react-redux";

const ProductPage = ({
  addProductSuccess,
  addProductError,
  basket,
  initProduct,
  initParams,
  initParamValues,
  initPrices,
}) => {
  let { t, lang } = useTranslation();
  const product = useProduct(initProduct, initProduct.name);
  const [prices, setPrices] = useState(initPrices);
  const [selectedParams, setSelectedParams] = useState(initParams);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const { name, quantity, params, img, inStock, _id } = product;
  const selectedQuantity = selectedParams.find(
    (param) => param.name === "quantity"
  );
  const selectedPrice = prices.find(
    (priceObj) => priceObj.quantity === selectedQuantity.option.value
  ).price;
  const { gross, net, currency } = selectedPrice;
  const { realizationDays } = selectedQuantity.option;
  const productName = t(`products:${name}.name`);
  const DescriptionText = (props) => <p {...props} />;

  const disableBtn = () => {
    setIsBtnDisabled(true),
      setTimeout(() => setIsBtnDisabled(false), btnDisableTime);
  };

  const onSubmit = async (values) => {
    setFetchError(null);
    setIsFetching(true);
    const res = await pricesFetch(values, name);
    if (res.ok) {
      setPrices(await res.json());
    } else {
      toast.error(t("product:fetchError"));
      setFetchError(t("product:fetchError"));
    }
    setIsFetching(false);
  };

  const addProduct = () => {
    if (basket.products.length >= maxBasketProducts) {
      return addProductError(t("product:basketFull")), disableBtn();
    }
    const productItem = {
      configId: `${_id}_${generateId()}`,
      ...product,
      price: selectedPrice,
      selectedParams,
      uploadFiles: [],
    };
    addProductSuccess(productItem, t("product:productAdded"));
    disableBtn();
  };

  return (
    <>
      <Head>
        <title>{productName}</title>
      </Head>
      <Product>
        <Info>
          <h1>{productName}</h1>
          <Description>
            <ImgWrapper>
              <Image
                src={`/images/${img}`}
                alt={productName}
                layout="fill"
                objectFit="cover"
              />
            </ImgWrapper>
            <Trans
              i18nKey={`products:${name}.description`}
              components={[<DescriptionText />, <strong />]}
            />
          </Description>
          <Details>
            <FieldSet>
              <Title>{t("product:chooseParams")}</Title>
              <Form
                onSubmit={onSubmit}
                initialValues={initParamValues}
                render={({ handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <QuantityField
                        quantity={quantity}
                        setSelectedParams={setSelectedParams}
                        selectedParams={selectedParams}
                      />
                      {params.map((param) => (
                        <ParamField
                          key={param.name}
                          param={param}
                          handleSubmit={handleSubmit}
                          setSelectedParams={setSelectedParams}
                          selectedParams={selectedParams}
                        />
                      ))}
                    </form>
                  );
                }}
              />
            </FieldSet>
            <FieldSet>
              <Title>{t("product:priceTable")}</Title>
              <PriceTable prices={prices} selectedPrice={selectedPrice} />
            </FieldSet>
          </Details>
        </Info>
        <Summary>
          <Title>{t("product:summary")}</Title>
          <section>
            <h2>{productName}</h2>
            {isFetching ? (
              <Spinner />
            ) : fetchError ? (
              <Errors>{fetchError}</Errors>
            ) : (
              <>
                <ul>
                  {selectedParams.map((param) => (
                    <li key={param.name}>
                      {t(`product:${param.name}`)}:
                      <span>
                        {param.name === "quantity"
                          ? `${param.option.value} ${t(`product:quantityUnit`)}`
                          : t(`product:${param.option.name}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Price>
                  <div>
                    {t("product:priceNet")}:
                    <span>{formatCurrency(net, currency, lang)}</span>
                  </div>
                  <div>
                    {t("product:priceGross")}:
                    <span>{formatCurrency(gross, currency, lang)}</span>
                  </div>
                </Price>
                <RealizationTime>
                  <small>
                    {t("product:realizationTime")}: {realizationDays.from}-
                    {realizationDays.to} {t("product:workingDays")}.
                  </small>
                </RealizationTime>
                <Button
                  onClick={addProduct}
                  disabled={!inStock || isBtnDisabled}
                >
                  {t("product:addToBasket")}
                </Button>
                {!inStock && <Errors>{t("product:outOfStock")}</Errors>}
              </>
            )}
          </section>
        </Summary>
      </Product>
    </>
  );
};

const mapStateToProps = (state) => ({
  basket: state.basket,
});

export default connect(mapStateToProps, { addProductSuccess, addProductError })(
  ProductPage
);

export async function getStaticPaths({ locales }) {
  const db = await connectMongodb();
  const products = await findAllProducts(db);
  const paths = [];

  for (const locale of locales) {
    products.forEach((product) => {
      paths.push({
        params: { product: product.path[locale] },
        locale,
      });
    });
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  global.mongo = global.mongo || {};
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, mongoConfig);
    await global.mongo.client.connect();
  }
  const db = global.mongo.client.db(process.env.MONGODB_NAME);

  const product = await findProductByPath(db, params.product, locale);
  const initParams = getInitProductParams(product);
  const paramValues = getParamValues(initParams);
  const prices = await getProductPrices(paramValues, product._id, db);

  return {
    props: {
      initProduct: toJson(product),
      initParams: toJson(initParams),
      initParamValues: toJson(paramValues),
      initPrices: toJson(prices),
    },
  };
}

const Product = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  ${respondTo.sm`
   flex-direction: row;
   align-items: flex-start;
  `}
`;

const Info = styled.section`
  h1 {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    ${respondTo.sm`
     margin-bottom: ${({ theme }) => theme.spacing.lg};
    `}
  }
  ${respondTo.sm`
   margin-right: ${({ theme }) => theme.spacing.lg};
  `}
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  ${respondTo.sm`
   margin-bottom: ${({ theme }) => theme.spacing.xl};
   flex-direction: row;
   justify-content: center;
   align-items: flex-start;
  `}
  p {
    margin-top: ${({ theme }) => theme.spacing.md};
    ${respondTo.sm`
      max-width: 50%;
      margin-top: 0;
      margin-left: ${({ theme }) => theme.spacing.lg};
  `}
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  height: 200px;
  width: 300px;
  max-width: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  ${respondTo.sm`
   flex-direction: row;
   align-items: flex-start;
   margin-bottom: 0;
  `}
  & > div:first-child {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    ${respondTo.sm`
      margin-right: ${({ theme }) => theme.spacing.lg};
      margin-bottom: 0;
  `}
  }
`;

const Title = styled.h3`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  position: relative;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.gray.xlight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid ${({ theme }) => theme.colors.gray.light};
  }
`;

const FieldSet = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-radius: ${({ theme }) => theme.spacing.sm};
  select {
    background-color: ${({ theme }) => theme.colors.gray.xlight};
  }
  ${respondTo.sm`
     width: 100%;
  `}
  form > div {
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    label {
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

const Summary = styled.aside`
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.md};
  ${respondTo.sm`
   min-width: 190px;
  `}
  ${respondTo.md`
   min-width: 215px;
  `}
  ${respondTo.lg`
   min-width: 235px;
  `}
  ${respondTo.xl`
   min-width: 250px;
  `}
  h2 {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  ul {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
    li {
      display: flex;
      justify-content: space-between;
      span {
        text-align: right;
      }
    }
  }
  button {
    width: 100%;
  }
`;

const Price = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  div {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    text-align: right;
  }
`;

const RealizationTime = styled.p`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Errors = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.red};
`;
