import useTranslation from "next-translate/useTranslation";
import { useMobile } from "@/hooks/index";
import { useState, useEffect, useRef } from "react";
import { navItems } from "@/data/index";
import Link from "next/link";
import NavItem from "./NavItem";
import { respondTo, formatCurrency } from "lib/index";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import styled from "styled-components";
import Image from "next/image";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "./DropdownList";
import AuthNav from "./AuthNav";
import ButtonBox from "./ButtonBox";
import { ChangeLanguage } from "@/components/index";

const Nav = ({ basket }) => {
  let { t, lang } = useTranslation();
  const isMobile = useMobile();
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  let targetElement = useRef(null);
  const { gross, currency } = basket.cartCost;

  const closeNav = () => {
    setIsNavExpanded(false);
    setIsNavOpened(false);
  };

  const toogleNav = () => {
    setIsNavExpanded(false);
    setIsNavOpened(!isNavOpened);
  };

  useEffect(() => {
    if (isNavOpened && isMobile) {
      disableBodyScroll(targetElement);
    } else {
      enableBodyScroll(targetElement);
    }
    return () => clearAllBodyScrollLocks();
  }, [isNavOpened, isMobile]);

  const navItemList = navItems.map((item) => (
    <NavItem key={item.content}>
      <Link href={`/${t(`common:${item.to}`)}`}>
        <a onClick={closeNav}>
          {item.content === "basket" ? (
            <>
              {formatCurrency(gross, currency, lang)}
              <FontAwesomeIcon
                icon={faShoppingCart}
                title={t("common:basket")}
                alt={t("common:basket")}
              />
            </>
          ) : (
            t(`common:${item.content}`)
          )}
        </a>
      </Link>
    </NavItem>
  ));

  return (
    <Navigation>
      <Wrapper>
        <Link href="/">
          <a onClick={closeNav}>
            <Image
              src="/logo.jpg"
              alt={t("common:projectName")}
              width={150}
              height={70}
              layout="fixed"
            />
          </a>
        </Link>
        <NavList ref={targetElement} isNavOpened={isNavOpened}>
          <DropdownList
            isNavExpanded={isNavExpanded}
            setIsNavExpanded={setIsNavExpanded}
            closeNav={closeNav}
            isMobile={isMobile}
          />
          {navItemList}
          <li>
            <ul>
              <AuthNav closeNav={closeNav} />
              <ChangeLanguage />
            </ul>
          </li>
        </NavList>
        <ButtonBox toogleNav={toogleNav} isNavOpened={isNavOpened} />
      </Wrapper>
    </Navigation>
  );
};

const mapStateToProps = (state) => ({
  basket: state.basket,
});

export default connect(mapStateToProps, null)(Nav);

const Navigation = styled.nav`
  z-index: 100;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  box-sizing: border-box;
  ${respondTo.sm`
    justify-content: flex-start;
  `}
  ${respondTo.lg`
    padding: 0 110px;
`}
`;

const NavList = styled.ul`
  position: fixed;
  width: 100%;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${({ isNavOpened }) => (isNavOpened ? "flex" : "none")};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  ${respondTo.sm`
   position: static;
   display: flex;
   flex-direction: row;
   & > li:last-child {
    margin-left: auto;
     ul {
      display: flex;
      }
    }
  `}
  ${respondTo.lg`
    margin-left: ${({ theme }) => theme.spacing.xl};
  `}
  li {
    button,
    a {
      display: flex;
      align-items: center;
      height: 42px;
      color: ${({ theme }) => theme.colors.gray.dark};
      padding: 0 ${({ theme }) => theme.spacing.sm};
      border-radius: ${({ theme }) => theme.spacing.xs};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      margin: ${({ theme }) => theme.spacing.xs} 0;
      transition: background-color 0.3s;
      svg {
        margin-left: ${({ theme }) => theme.spacing.xs};
      }
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray.xlight};
      }
      ${respondTo.sm`
       margin: 0;
      `}
    }
    a {
      text-decoration: none;
    }
    button {
      font-family: ${({ theme }) => theme.fontFamily};
      font-size: ${({ theme }) => theme.fontSizes.md};
      background-color: ${({ theme }) => theme.colors.white};
      width: 100%;
      border: none;
      cursor: pointer;
    }
  }
`;
