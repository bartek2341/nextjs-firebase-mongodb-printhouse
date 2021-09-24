import { Wrapper, FinalField, Button } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { respondTo, contactValidation } from "@/lib/index";
import { toast } from "react-toastify";
import { company } from "@/data/index";
import Head from "next/head";

const ContactPage = () => {
  let { t } = useTranslation();

  const onSubmit = (values, form) => {
    toast.success(t("contact:messageSent"));
    setTimeout(() => form.reset(), 0);
  };

  const { name, email, phone, address } = company;
  const { street, city, country } = address;

  return (
    <>
      <Head>
        <title>{t("common:contact")}</title>
      </Head>
      <ContactWrapper>
        <h1>{t("common:contact")}</h1>
        <Container>
          <div>
            <h2>{t("contact:address")}</h2>
            <Address>
              <span>{name}</span>
              <span>{street}</span>
              <span>{city}</span>
              <span>{country}</span>
              <span>
                <span>
                  {t("contact:phone")}:{" "}
                  <Button variant="secondaryLink" href={`tel:${phone}`}>
                    {phone}
                  </Button>
                </span>
              </span>
              <span>
                {t("contact:email")}:{" "}
                <Button variant="secondaryLink" href={`mailto:${email}`}>
                  {email}
                </Button>
              </span>
            </Address>
          </div>
          <div>
            <h2>{t("contact:sendMessage")}</h2>
            <Form
              onSubmit={onSubmit}
              validate={(values) => contactValidation(values, t)}
              render={({ handleSubmit, submitting }) => (
                <SendMessage noValidate onSubmit={handleSubmit}>
                  <FinalField
                    name="subject"
                    label={t("contact:subject")}
                    placeholder={t("contact:subject")}
                    type="text"
                  />
                  <Field name="message">
                    {({ input, meta }) => (
                      <div>
                        <label>{t("contact:message")}</label>
                        <textarea
                          {...input}
                          placeholder={t("contact:message")}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Button type="submit" disabled={submitting}>
                    {t("contact:send")}
                  </Button>
                </SendMessage>
              )}
            />
          </div>
        </Container>
      </ContactWrapper>
    </>
  );
};

export default ContactPage;

const ContactWrapper = styled(Wrapper)`
  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${respondTo.sm`
   flex-direction: row;
  `}
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  & > div {
    flex-basis: 50%;
  }
  & > div:nth-child(2) {
    margin-top: ${({ theme }) => theme.spacing.md};
    ${respondTo.sm`
      margin-top: 0;
      margin-left: ${({ theme }) => theme.spacing.md};
  `}
  }
`;

const Address = styled.address`
  display: flex;
  flex-direction: column;
`;

const SendMessage = styled.form`
  background-color: ${({ theme }) => theme.colors.gray.xlight};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray.light};
  & > div {
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
  textarea {
    min-height: 150px;
  }
`;
