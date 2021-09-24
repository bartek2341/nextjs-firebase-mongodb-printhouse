import { orderStatus } from "@/data/index";
import { Form, Field } from "react-final-form";
import { Button, Buttons } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import { isEqualObj } from "@/lib/index";

const ChangeStatusForm = ({ status, onSubmit, id }) => {
  let { t } = useTranslation();

  const initialValues = {
    status,
  };

  return (
    <Form
      onSubmit={(values, form) => onSubmit(values, id, form)}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, values, form }) => {
        return (
          <form noValidate onSubmit={handleSubmit}>
            <Field name="status" component="select">
              <option value={status} disabled>
                {t(`order:${status}`)}
              </option>
              {Object.values(orderStatus).map(
                (val) =>
                  val !== status && (
                    <option key={val} value={val}>
                      {t(`order:${val}`)}
                    </option>
                  )
              )}
            </Field>
            {!isEqualObj(values, initialValues) && (
              <Buttons>
                <Button
                  responsive
                  variant="tertiary"
                  type="submit"
                  disabled={submitting}
                >
                  {t("common:change")}
                </Button>
                <Button
                  responsive
                  variant="tertiary"
                  onClick={() => form.reset()}
                >
                  {t("common:undo")}
                </Button>
              </Buttons>
            )}
          </form>
        );
      }}
    />
  );
};

export default ChangeStatusForm;
