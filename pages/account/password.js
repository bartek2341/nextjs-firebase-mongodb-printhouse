import useTranslation from "next-translate/useTranslation";
import { AccountLayout, PageTitle } from "@/components/pages/accountPage/index";
import { useAuth } from "@/firebase/auth";
import { LoadingIndicator, Button, FinalField } from "@/components/index";
import UnauthenticatedPage from "@/components/pages/UnauthenticatedPage";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { changePasswordValidation, handleAuthErrors } from "@/lib/index";
import styled from "styled-components";
import Head from "next/head";

const ChangePasswordPage = () => {
  let { t } = useTranslation();
  const { user, isLoadingUser, reauthenticate, updatePassword } = useAuth();
  if (isLoadingUser) return <LoadingIndicator center />;
  else if (!user) return <UnauthenticatedPage />;

  const onSubmit = async (values, form) => {
    const { currentPassword, newPassword } = values;
    try {
      await reauthenticate(currentPassword);
      await updatePassword(newPassword);
      toast.success(t("account:changePasswordSuccess"));
      setTimeout(() => form.reset(), 0);
    } catch (err) {
      const errorMsg = handleAuthErrors(err, t);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <Head>
        <title>{t("account:changePassword")}</title>
      </Head>
      <AccountLayout>
        <PageTitle>
          <h3>{t("account:changePassword")}</h3>
        </PageTitle>
        <Form
          onSubmit={onSubmit}
          validate={(values) => changePasswordValidation(values, t)}
          render={({ handleSubmit, submitting }) => (
            <FormWrapper>
              <form noValidate onSubmit={handleSubmit}>
                <FinalField
                  name="currentPassword"
                  label={t("account:currentPassword")}
                  type="password"
                />
                <FinalField
                  name="newPassword"
                  label={t("account:newPassword")}
                  type="password"
                />
                <FinalField
                  name="confirmNewPassword"
                  label={t("account:confirmNewPassword")}
                  type="password"
                />
                <Button type="submit" responsive disabled={submitting}>
                  {t("common:change")}
                </Button>
              </form>
            </FormWrapper>
          )}
        />
      </AccountLayout>
    </>
  );
};

export default ChangePasswordPage;

const FormWrapper = styled.div`
  form > div:not(:last-child) {
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    span {
      color: ${({ theme }) => theme.colors.red};
    }
    label {
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
  }
`;
