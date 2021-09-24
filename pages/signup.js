import { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import {
  PageWrapper,
  FormWrapper,
} from "@/components/pages/userAuthPages/index";
import styled from "styled-components";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { Button, FinalField } from "@/components/index";
import { useAuth } from "@/firebase/auth";
import { signupValidation, handleAuthErrors } from "@/lib/index";
import Head from "next/head";

const SignupPage = () => {
  const { signup, user } = useAuth();
  let { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      await signup(email, password);
    } catch (err) {
      const errorMsg = handleAuthErrors(err, t);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <Head>
        <title>{t("common:signup")}</title>
      </Head>
      <PageWrapper>
        <FormWrapper>
          <h2>{t("common:signup")}</h2>
          <Form
            onSubmit={onSubmit}
            validate={(value) => signupValidation(value, t)}
            render={({ handleSubmit, submitting }) => (
              <form noValidate onSubmit={handleSubmit}>
                <FinalField
                  name="email"
                  type="email"
                  label={t("common:email")}
                />
                <FinalField
                  name="password"
                  type="password"
                  label={t("common:password")}
                />
                <FinalField
                  name="confirmPassword"
                  type="password"
                  label={t("signup:confirmPassword")}
                />
                <Button type="submit" disabled={submitting}>
                  {t("common:signup")}
                </Button>
              </form>
            )}
          />
          <Text>
            {t("signup:haveAccount")}?{" "}
            <Button variant="secondaryLink" href={`/${t("common:loginPath")}`}>
              {t("common:login")}
            </Button>
            .
          </Text>
          <Regulations>{t("signup:regulations")}.</Regulations>
        </FormWrapper>
      </PageWrapper>
    </>
  );
};

export default SignupPage;

const Text = styled.p`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

const Regulations = styled.p`
  text-align: center;
`;
