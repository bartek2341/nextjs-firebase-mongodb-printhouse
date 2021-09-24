import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import styled from "styled-components";
import { UploadPage, ShippingPage, Step } from "@/components/pages/basketPage";
import { useAuth } from "@/firebase/auth";
import Error from "next/error";
import useTranslation from "next-translate/useTranslation";
import { LoadingIndicator, Wrapper, Wizard, Order } from "@/components/index";
import UnauthenticatedPage from "@/components/pages/UnauthenticatedPage";
import AccountIncompletedPage from "@/components/pages/AccountIncompletedPage";
import { shippingFetch, createOrderFetch } from "@/data/index";
import { respondTo, encodeOrderFilesB64 } from "@/lib/index";
import Head from "next/head";
import { toast } from "react-toastify";

const RealizationPage = ({ basket }) => {
  let { t } = useTranslation();
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const [pageNumber, changePageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [shippingMethods, setShippingMethods] = useState([]);

  useEffect(() => {
    if (!basket.products.length) router.push(`/${t("common:basketPath")}`);
    const promise = shippingFetch(basket.products);
    promise
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => setShippingMethods(data));
        } else {
          setIsFetchError(true);
        }
      })
      .catch(() => {
        setIsFetchError(true);
      });
    setIsFetching(false);
  }, []);

  if (isLoadingUser || isFetching) return <LoadingIndicator center />;
  else if (!user) return <UnauthenticatedPage />;
  else if (!user.data) return <AccountIncompletedPage />;
  else if (isFetchError)
    return <Error title={t("realization:shippingFetchError")} />;

  const onSubmit = async (values) => {
    const order = { ...values };
    setIsFetching(true);
    try {
      await encodeOrderFilesB64(order.products);
      const res = await createOrderFetch(order);
      if (res.ok) {
        const orderId = await res.text();
        router.push({
          pathname: `/${t("realization:createOrderSuccessPath")}`,
          query: { orderId },
        });
      } else {
        router.push(`/${t("realization:createOrderErrorPath")}`);
      }
    } catch (err) {
      toast.error(t("realization:fileConversionError"));
      router.push(`/${t("realization:createOrderErrorPath")}`);
    }
  };

  return (
    <>
      <Head>
        <title>{t("realization:orderRealization")}</title>
      </Head>
      <RealizationWrapper>
        <h2>{t("realization:orderRealization")}</h2>
        <ProgressBar>
          <Step
            pageNumber={pageNumber}
            stepNumber={1}
            text={t("realization:uploadFiles")}
          />
          <Step
            pageNumber={pageNumber}
            stepNumber={2}
            text={t("realization:shipping")}
          />
          <Step
            pageNumber={pageNumber}
            stepNumber={3}
            text={t("realization:summary")}
          />
        </ProgressBar>
        <Wizard
          router={router}
          t={t}
          onSubmit={onSubmit}
          changePageNumber={changePageNumber}
          pageNumber={pageNumber}
          initialValues={{
            ...basket,
            recipient: {
              type: user.type,
              data: user.data,
            },
            shipping: {
              method: null,
            },
          }}
        >
          <Wizard.Page>
            {() => <UploadPage products={basket.products} />}
          </Wizard.Page>
          <Wizard.Page>
            {(props) => (
              <ShippingPage
                props={props}
                user={user}
                shippingMethods={shippingMethods}
              />
            )}
          </Wizard.Page>
          <Wizard.Page>{(props) => <Order order={props.values} />}</Wizard.Page>
        </Wizard>
      </RealizationWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  basket: state.basket,
});

export default connect(mapStateToProps, null)(RealizationPage);

export const RealizationWrapper = styled(Wrapper)`
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    ${respondTo.xs`
     text-align: center;
     margin-bottom: ${({ theme }) => theme.spacing.lg};
  `}
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  ${respondTo.xs`
   flex-direction: row;
   justify-content: center;
   margin-bottom: ${({ theme }) => theme.spacing.lg};
  `}
`;
