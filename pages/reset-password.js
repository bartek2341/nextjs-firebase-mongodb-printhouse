import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import {
  PageWrapper,
  FormWrapper,
} from "@/components/pages/userAuthPages/index";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { Button, FinalField } from "@/components/index";
import { useAuth } from "@/firebase/auth";
import { resetPasswordValidation, handleAuthErrors } from "@/lib/index";
import Head from "next/head";

const ResetPage = () => {
  const { resetPassword } = useAuth();
  let { t } = useTranslation();
  const router = useRouter();

  const onSubmit = async (values) => {
    const { email } = values;
    try {
      await resetPassword(email);
      toast.success(t("resetPassword:resetPasswordSuccess"));
      router.push(t("common:loginPath"));
    } catch (err) {
      const errorMsg = handleAuthErrors(err, t);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <Head>
        <title>{t("resetPassword:resetPassword")}</title>
      </Head>
      <PageWrapper>
        <FormWrapper>
          <h2>{t("resetPassword:resetPassword")}</h2>
          <Form
            onSubmit={onSubmit}
            validate={(values) => resetPasswordValidation(values, t)}
            render={({ handleSubmit, submitting }) => (
              <form noValidate onSubmit={handleSubmit}>
                <FinalField
                  name="email"
                  type="email"
                  label={t("common:email")}
                />
                <Button type="submit" disabled={submitting}>
                  {t("common:send")}
                </Button>
              </form>
            )}
          />
        </FormWrapper>
      </PageWrapper>
    </>
  );
};

export default ResetPage;
