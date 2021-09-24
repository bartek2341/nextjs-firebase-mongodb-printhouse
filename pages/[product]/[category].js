import getT from "next-translate/getT";
import { toJson } from "@/lib/index";
import connectMongodb, { mongoConfig } from "@/mongodb/connect";
import {
  findAllProductCategories,
  findProductsByCategory,
  findProductCategoryByPath,
} from "@/mongodb/index";
import { MongoClient } from "mongodb";
import useTranslation from "next-translate/useTranslation";
import {
  useCategoryProducts,
  useProductCategories,
  useProductCategory,
} from "@/hooks/index";
import {
  HomeWrapper,
  CategoryMenu,
  Category,
  About,
  HowTo,
} from "@/components/pages/homePage/index";
import Head from "next/head";

const CategoryPage = ({
  initProductCategory,
  initProductCategories,
  initCategoryProducts,
}) => {
  let { t } = useTranslation();

  const categories = useProductCategories(initProductCategories);
  const category = useProductCategory(
    initProductCategory,
    initProductCategory.name
  );
  const products = useCategoryProducts(
    initCategoryProducts,
    initProductCategory.name
  );

  return (
    <>
      <Head>
        <title>{t(`productCategories:${category.name}.name`)}</title>
      </Head>
      <section>
        <HomeWrapper>
          <CategoryMenu categories={categories} />
          <Category
            products={products}
            categoryName={t(`productCategories:${category.name}.name`)}
          />
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

export default CategoryPage;

export async function getStaticPaths({ locales }) {
  const db = await connectMongodb();
  const categories = await findAllProductCategories(db);
  const paths = [];

  for (const locale of locales) {
    const t = await getT(locale, "common");
    categories.forEach((category) => {
      paths.push({
        params: { product: t("products"), category: category.path[locale] },
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

  const categories = await findAllProductCategories(db);
  const category = await findProductCategoryByPath(db, params.category, locale);
  const categoryProducts = await findProductsByCategory(db, category.name);

  return {
    props: {
      initProductCategories: toJson(categories),
      initProductCategory: toJson(category),
      initCategoryProducts: toJson(categoryProducts),
    },
  };
}
