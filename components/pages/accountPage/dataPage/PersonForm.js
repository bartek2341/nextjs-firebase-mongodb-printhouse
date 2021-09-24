import { Button, Buttons, FinalField } from "@/components/index";
import { Form } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import { personValidation, isEqualObj } from "@/lib/index";
import styled from "styled-components";
import { accountTypes } from "@/data/index";

const PersonForm = ({ user, onSubmit }) => {
  let { t } = useTranslation();

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={user.type === accountTypes.person ? user.data : {}}
      validate={(values) => personValidation(values, t)}
      render={({ handleSubmit, values, submitting }) => (
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <FinalField name={"name"} type="text" label={t("userData:name")} />
            <FinalField
              name={"vorname"}
              type="text"
              label={t("userData:vorname")}
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

export default PersonForm;

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
