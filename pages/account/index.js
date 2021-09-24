import { LoadingIndicator } from "@/components/index";
import { AccountLayout, DataPage } from "@/components/pages/accountPage/index";
import { useAuth } from "@/firebase/auth";
import useTranslation from "next-translate/useTranslation";
import UnauthenticatedPage from "@/components/pages/UnauthenticatedPage";
import Head from "next/head";

const AccountPage = () => {
  let { t } = useTranslation();
  const { user, isLoadingUser, setUser, refetchUser } = useAuth();
  if (isLoadingUser) return <LoadingIndicator center />;
  else if (!user) return <UnauthenticatedPage />;

  return (
    <>
      <Head>
        <title>{t("account:accountData")}</title>
      </Head>
      <AccountLayout>
        <DataPage user={user} setUser={setUser} refetchUser={refetchUser} />
      </AccountLayout>
    </>
  );
};

export default AccountPage;
