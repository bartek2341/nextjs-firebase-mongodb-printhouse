import styled from "styled-components";
import { respondTo } from "@/lib/index";
import { Product } from "@/components/index";
import useTranslation from "next-translate/useTranslation";

const Category = ({ products, categoryName }) => {
  let { t, lang } = useTranslation();

  const productList = products.map((product) => {
    const { path, name, img } = product;
    return (
      <Product
        key={name}
        name={t(`products:${name}.name`)}
        path={path[lang]}
        img={`/images/${img}`}
      />
    );
  });

  return (
    <CategoryWrapper>
      <h3>{categoryName ? categoryName : t("home:allProducts")}</h3>
      <Products>{productList}</Products>
    </CategoryWrapper>
  );
};

export default Category;

export const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const CategoryWrapper = styled.div`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.spacing.lg};
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  ${respondTo.sm`
    margin-left: ${({ theme }) => theme.spacing.lg};
  `}
  ${respondTo.md`
    margin-left: ${({ theme }) => theme.spacing.xl};
  `}
`;
