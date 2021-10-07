import { Button, Buttons, FinalField } from "@/components/index";
import { Form } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import { companyValidation, isEqualObj } from "@/lib/index";
import styled from "styled-components";
import { accountTypes } from "@/data/index";

const CompanyForm = ({ user, onSubmit, setFormType }) => {
  let { t } = useTranslation();

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={user.type === accountTypes.company ? user.data : {}}
      validate={(values) => companyValidation(values, t)}
      render={({ handleSubmit, values, submitting }) => (
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <FinalField
              name={"company"}
              type="text"
              label={t("userData:company")}
            />
            <FinalField
              name={"taxId"}
              type="text"
              label={t("userData:taxId")}
            />
            <FinalField
              name={"address.street"}
              type="text"
              label={t("userData:street")}
            />
            <FinalField
              name={"address.postalCode"}
              type="text"
              label={t("userData:postalCode")}
            />
            <FinalField
              name={"address.city"}
              type="text"
              label={t("userData:city")}
            />
            <FinalField
              name={"address.country"}
              type="text"
              label={t("userData:country")}
            />
            <Buttons>
              <Button responsive red onClick={() => setFormType(null)}>
                {t("common:undo")}
              </Button>
              {!isEqualObj(values, user.data) && (
                <Button disabled={submitting} responsive type="submit">
                  {t("common:save")}
                </Button>
              )}
            </Buttons>
          </form>
        </FormWrapper>
      )}
    />
  );
};

export default CompanyForm;

const FormWrapper = styled.div`
  form > div:not(:last-child) {
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    span {
      color: ${({ theme }) => theme.colors.red};
    }
    label {
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
  }
`;
