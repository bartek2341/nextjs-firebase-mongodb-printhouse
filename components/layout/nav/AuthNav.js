import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import NavItem from "./NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserPlus,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useAuth } from "@/firebase/auth";

const AuthNav = ({ closeNav }) => {
  const { user, logout } = useAuth();
  let { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t("common:logoutSuccess"));
    } catch (err) {
      toast.error(t("common:logoutError"));
    }
  };

  if (user && user.isAdmin) {
    return (
      <>
        <NavItem>
          <Link href={`/${t("common:ordersPath")}`}>
            <a onClick={closeNav}>{t("common:admin")}</a>
          </Link>
        </NavItem>
        <NavItem>
          <button
            onClick={() => {
              handleLogout();
              closeNav();
            }}
          >
            {t("common:logout")}
          </button>
        </NavItem>
      </>
    );
  } else if (user) {
    return (
      <>
        <NavItem>
          <Link href={`/${t("common:accountPath")}`} passHref>
            <AccountLink onClick={closeNav}>
              {t("common:myAccount")}
              {!user.data && (
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  title={t("common:accountIncompleted")}
                  alt={t("common:accountIncompleted")}
                />
              )}
            </AccountLink>
          </Link>
        </NavItem>
        <NavItem>
          <button
            onClick={() => {
              handleLogout();
              closeNav();
            }}
          >
            {t("common:logout")}
          </button>
        </NavItem>
      </>
    );
  } else {
    return (
      <>
        <NavItem>
          <Link href={`/${t("common:loginPath")}`}>
            <a onClick={closeNav}>
              {t("common:login")}
              <FontAwesomeIcon
                icon={faUser}
                title={t("common:login")}
                alt={t("common:login")}
              />
            </a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href={`/${t("common:signupPath")}`}>
            <a onClick={closeNav}>
              {t("common:signup")}
              <FontAwesomeIcon
                icon={faUserPlus}
                title={t("common:signup")}
                alt={t("common:signup")}
              />
            </a>
          </Link>
        </NavItem>
      </>
    );
  }
};

export default AuthNav;

const AccountLink = styled.a`
  svg {
    color: ${({ theme }) => theme.colors.yellow};
  }
`;
