import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { AccountLayout, PageTitle } from "@/components/pages/accountPage/index";
import { useAuth } from "@/firebase/auth";
import UnauthenticatedPage from "@/components/pages/UnauthenticatedPage";
import styled from "styled-components";
import { toast } from "react-toastify";
import { LoadingIndicator, Button } from "@/components/index";
import { fetchAdminClaims } from "@/data/index";
import Head from "next/head";

const AdminPage = () => {
  let { t } = useTranslation();
  const { user, isLoadingUser, logout } = useAuth();
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isLoadingUser) return <LoadingIndicator center />;
  else if (!user) return <UnauthenticatedPage />;

  const fetch = async () => {
    const res = await fetchAdminClaims();
    if (res.ok) {
      await logout();
      toast.success(t("account:claimsUpdateSuccess"));
    } else {
      toast.error(t("account:claimsUpdateError"));
    }
  };

  return (
    <>
      <Head>
        <title>{t("common:admin")}</title>
      </Head>
      <AccountLayout>
        <PageTitle>
          <h3>{t("common:admin")}</h3>
        </PageTitle>
        <p>{t("account:adminClaimsText")}.</p>
        <Wrapper>
          <input
            type="checkbox"
            id="confirm"
            value={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
          />
          <label htmlFor={"confirm"}>
            {user.isAdmin
              ? t("account:deleteAdminClaims")
              : t("account:addAdminClaims")}
          </label>
        </Wrapper>
        <Button responsive disabled={!isConfirmed} onClick={fetch}>
          {t("common:send")}
        </Button>
      </AccountLayout>
    </>
  );
};

export default AdminPage;

const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
