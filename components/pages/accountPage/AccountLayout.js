import styled from "styled-components";
import { accountItems } from "@/data/index";
import { respondTo } from "@/lib/index";
import { Menu, Wrapper } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const AccountLayout = ({ children }) => {
  const router = useRouter();
  let { t } = useTranslation();

  const accountItemList = (
    <ul>
      {accountItems.map((item) => (
        <li key={item.content}>
          <Link href={`/${t(`account:${item.to}`)}`} passHref>
            <a
              className={
                router.asPath === `/${t(`account:${item.to}`)}` ? "active" : ""
              }
            >
              {t(`account:${item.content}`)}
              <FontAwesomeIcon
                icon={faAngleRight}
                title={t("common:select")}
                alt={t("common:select")}
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <AccountWrapper>
      <h2>{t("common:myAccount")}</h2>
      <Container>
        <AccountMenu>{accountItemList}</AccountMenu>
        <PageContent>{children}</PageContent>
      </Container>
    </AccountWrapper>
  );
};

export default AccountLayout;

const AccountWrapper = styled(Wrapper)`
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  ${respondTo.sm`
    margin-bottom: ${({ theme }) => theme.spacing.md};
  `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${respondTo.sm`
   align-items: flex-start;
   flex-direction: row;
  `}
`;

const AccountMenu = styled(Menu)`
  ul {
    margin-left: 0;
  }
`;

const PageContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  ${respondTo.sm`
   flex-grow: 1;
   margin-top:  0;
   margin-left: ${({ theme }) => theme.spacing.lg};
  `}
  ${respondTo.md`
   margin-left: ${({ theme }) => theme.spacing.xl};
  `}
`;
