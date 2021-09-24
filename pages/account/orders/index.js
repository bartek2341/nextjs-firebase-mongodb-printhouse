import { useAuth } from "@/firebase/auth";
import {
  LoadingIndicator,
  SuspenseErrorBoundary,
  NextHead,
} from "@/components/index";
import UnauthenticatedPage from "@/components/pages/UnauthenticatedPage";
import { AccountLayout, Orders } from "@/components/pages/accountPage/index";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const OrdersPage = () => {
  let { t } = useTranslation();
  const { user, isLoadingUser } = useAuth();
  if (isLoadingUser) return <LoadingIndicator center />;
  else if (!user) return <UnauthenticatedPage />;

  return (
    <>
      <Head>
        <title>{t("account:orders")}</title>
      </Head>
      <AccountLayout>
        <SuspenseErrorBoundary>
          <Orders user={user} />
        </SuspenseErrorBoundary>
      </AccountLayout>
    </>
  );
};

export default OrdersPage;
