import useTranslation from "next-translate/useTranslation";
import { AccountLayout, PageTitle } from "@/components/pages/accountPage/index";
import { useAuth } from "@/firebase/auth";
import UnauthenticatedPage from "@/components/pages/UnauthenticatedPage";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Form, Field } from "react-final-form";
import { LoadingIndicator, Button, Condition } from "@/components/index";
import { deleteAccountValidation, handleAuthErrors } from "@/lib/index";
import { deleteUserOrdersFetch } from "@/data/index";
import Head from "next/head";

const DeleteAccountPage = () => {
  let { t } = useTranslation();
  const { user, isLoadingUser, reauthenticate, deleteUser, deleteUserData } =
    useAuth();
  if (isLoadingUser) return <LoadingIndicator center />;
  else if (!user) return <UnauthenticatedPage />;

  const onSubmit = async (values) => {
    const { password } = values;
    try {
      await reauthenticate(password);
      const res = await deleteUserOrdersFetch();
      if (res.ok) {
        await deleteUserData();
        await deleteUser();
        toast.success(t("account:deleteAccountSuccess"));
      } else {
        toast.error(t("account:deleteOrdersError"));
      }
    } catch (err) {
      const errorMsg = handleAuthErrors(err, t);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <Head>
        <title>{t("account:deleteAccount")}</title>
      </Head>
      <AccountLayout>
        <PageTitle>
          <h3>{t("account:deleteAccount")}</h3>
        </PageTitle>
        <Text>{t("account:deleteAccountText")}</Text>
        <Form
          onSubmit={onSubmit}
          validate={(values) => deleteAccountValidation(values, t)}
          render={({ handleSubmit, submitting }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Field name={"confirm"} type="checkbox">
                {({ input }) => (
                  <div>
                    <input {...input} id={"confirm"} />
                    <label htmlFor={"confirm"}>
                      {t("account:confirmDeleteAccount")}.
                    </label>
                  </div>
                )}
              </Field>
              <Condition when={"confirm"} is={true}>
                <Field name={"password"}>
                  {({ input, meta }) => (
                    <Wrapper>
                      <label htmlFor={"password"}>
                        {t("account:confirmPassword")}
                      </label>
                      <input type="password" {...input} id={"password"} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </Wrapper>
                  )}
                </Field>
                <Button type="submit" responsive disabled={submitting}>
                  {t("account:deleteAccount")}
                </Button>
              </Condition>
            </form>
          )}
        />
      </AccountLayout>
    </>
  );
};

export default DeleteAccountPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  label {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  span {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const Text = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
