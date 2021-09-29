import { MongoClient } from "mongodb";
import { mongoConfig } from "@/mongodb/connect";
import { findAllProducts, findAllProductCategories } from "@/mongodb/index";
import { toJson } from "@/lib/index";
import useTranslation from "next-translate/useTranslation";
import { useProducts, useProductCategories } from "@/hooks/index";
import Head from "next/head";
import {
  HomeWrapper,
  CategoryMenu,
  Category,
  About,
  HowTo,
} from "@/components/pages/homePage/index";
// import productsColl from "@/mongodb/collections/products";
// import productCategoriesColl from "@/mongodb/collections/productCategories";
// import productPricesColl from "@/mongodb/collections/productPrices";
// import shippingsColl from "@/mongodb/collections/shippings";

const IndexPage = ({ initProducts, initProductCategories }) => {
  let { t } = useTranslation();
  const products = useProducts(initProducts);
  const categories = useProductCategories(initProductCategories);

  return (
    <>
      <Head>
        <title>{t("home:title")}</title>
        <meta
          name="google-site-verification"
          content="T25R_QKlq6sbw6UKPnI8wu8L_UG7M7T9nn6kyn0WO8E"
        />
      </Head>
      <section>
        <HomeWrapper>
          <CategoryMenu categories={categories} />
          <Category products={products} />
        </HomeWrapper>
      </section>
      <section>
        <About />
      </section>
      <section>
        <HowTo />
      </section>
    </>
  );
};

export default IndexPage;

export async function getStaticProps() {
  global.mongo = global.mongo || {};
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, mongoConfig);
    await global.mongo.client.connect();
  }
  const db = global.mongo.client.db(process.env.MONGODB_NAME);

  // try {
  //   await db.collection("products").insert(productsColl);
  //   await db.collection("productCategories").insert(productCategoriesColl);
  //   await db.collection("productPrices").insert(productPricesColl);
  //   await db.collection("shippings").insert(shippingsColl);
  // } catch (err) {
  //   console.log(err, "error creating collections");
  // }

  const products = await findAllProducts(db);
  const categories = await findAllProductCategories(db);

  return {
    props: {
      initProducts: toJson(products),
      initProductCategories: toJson(categories),
    },
  };
}
