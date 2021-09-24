import { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import {
  PageWrapper,
  FormWrapper,
} from "@/components/pages/userAuthPages/index";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";
import { Button, FinalField } from "@/components/index";
import { useAuth } from "@/firebase/auth";
import { loginValidation, handleAuthErrors } from "@/lib/index";
import Head from "next/head";

const LoginPage = () => {
  const { login, user } = useAuth();
  let { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      await login(email, password);
    } catch (err) {
      const errorMsg = handleAuthErrors(err, t);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <Head>
        <title>{t("common:login")}</title>
      </Head>
      <PageWrapper>
        <FormWrapper>
          <h2>{t("common:login")}</h2>
          <Form
            onSubmit={onSubmit}
            validate={(values) => loginValidation(values, t)}
            render={({ handleSubmit, submitting }) => (
              <form noValidate onSubmit={handleSubmit}>
                <FinalField
                  name="email"
                  type="email"
                  label={t("common:email")}
                />
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor="password">
                        {t("common:password")}
                        <Button
                          variant="secondaryLink"
                          href={`/${t("login:resetPasswordPath")}`}
                        >
                          {t("login:forgotPassword")}
                        </Button>
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder={t("common:password")}
                        {...input}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Button type="submit" disabled={submitting}>
                  {t("common:login")}
                </Button>
              </form>
            )}
          />
          <Text>
            {t("login:dontHaveAccount")}?{" "}
            <Button variant="secondaryLink" href={`/${t("common:signupPath")}`}>
              {t("common:signup")}
            </Button>
            .
          </Text>
        </FormWrapper>
      </PageWrapper>
    </>
  );
};

export default LoginPage;

const Text = styled.p`
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  padding-top: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;
