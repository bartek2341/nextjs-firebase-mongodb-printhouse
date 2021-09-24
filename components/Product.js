import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Product = ({ name, img, path }) => {
  return (
    <Wrapper>
      <Link href={`/${path}`} passHref>
        <ProductLink>
          <ProductWrapper>
            <Image src={img} alt={name} layout="fill" objectFit="cover" />
            <h5>{name}</h5>
          </ProductWrapper>
        </ProductLink>
      </Link>
    </Wrapper>
  );
};

export default Product;

const Wrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.gray.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  height: 140px;
  &:hover img {
    transform: scale(1.07);
  }
`;

const ProductLink = styled.a`
  display: block;
  height: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

const ProductWrapper = styled.div`
  position: relative;
  height: 100%;
  img {
    transition: transform 0.4s ease;
  }
  h5 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.lighten};
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;
