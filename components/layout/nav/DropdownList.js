import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import NavItem from "./NavItem";
import { useProducts } from "@/hooks/index";
import { respondTo, groupBy } from "@/lib/index";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const DropDownList = ({
  isNavExpanded,
  setIsNavExpanded,
  closeNav,
  isMobile,
}) => {
  let { t } = useTranslation();

  const toogleMobileNavExpand = (flag) => {
    !isMobile && setIsNavExpanded(flag);
  };

  return (
    <NavItem
      onMouseOver={() => toogleMobileNavExpand(true)}
      onMouseLeave={() => toogleMobileNavExpand(false)}
      onFocus={() => toogleMobileNavExpand(true)}
      onBlur={() => toogleMobileNavExpand(false)}
    >
      <DropDownBtn
        isNavExpanded={isNavExpanded}
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        {t("common:offer")}
        <FontAwesomeIcon icon={faAngleDown} alt={t("common:expand")} />
      </DropDownBtn>
      <DropdownContent isNavExpanded={isNavExpanded}>
        <DropdownItems closeNav={closeNav} />
      </DropdownContent>
    </NavItem>
  );
};

export default DropDownList;

const DropdownItems = ({ closeNav }) => {
  let { t, lang } = useTranslation();
  const products = useProducts();

  const productCategories = groupBy(products || [], "category");
  const productLists = Object.entries(productCategories).map(
    ([name, category]) => (
      <ul key={name}>
        {category.map((product) => (
          <li key={product.name}>
            <Link href={`/${product.path[lang]}`}>
              <a onClick={closeNav}>{t(`products:${product.name}.name`)}</a>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
  return productLists;
};

const DropDownBtn = styled.button`
  svg {
    transition: transform 0.3s;
    transform: ${({ isNavExpanded }) =>
      isNavExpanded ? "rotate(180deg)" : "rotate(0)"};
    ${respondTo.sm`
      display: none;
    `}
  }
`;

const DropdownContent = styled.div`
  height: ${({ isNavExpanded }) => (isNavExpanded ? "auto" : "0")};
  opacity: ${({ isNavExpanded }) => (isNavExpanded ? "1" : "0")};
  pointer-events: ${({ isNavExpanded }) => (isNavExpanded ? "all" : "none")};
  user-select: ${({ isNavExpanded }) => (isNavExpanded ? "auto" : "none")};
  li {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-left: ${({ theme }) => theme.spacing.sm};
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
  ${respondTo.sm`
    position: absolute;
    z-index: 100;
    left: 25px;
    display: flex;
    transition: 0.3s;
    padding:  ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.white};
    transform: translateY(-${({ theme }) => theme.spacing.sm});
    box-shadow: ${({ theme }) => theme.shadows.sm};
    border-radius: ${({ theme }) => theme.spacing.sm};
    transform: ${({ theme, isNavExpanded }) =>
      isNavExpanded ? `translateY(-${theme.spacing.sm})` : "translateY(0)"};
    height: auto;
    ul:not(:first-child) {
      margin-left: ${({ theme }) => theme.spacing.xs}; 
    }
    li {
      margin-bottom: ${({ theme }) => theme.spacing.xs}; 
      margin-left: 0;
      margin-right: 0;
    }
  `}
  ${respondTo.lg`
     left: 160px;
  `}
`;
