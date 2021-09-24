import { Field } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import { setParamObj } from "@/lib/index";

const ParamField = ({
  param,
  handleSubmit,
  selectedParams,
  setSelectedParams,
}) => {
  let { t } = useTranslation();
  return (
    <Field name={param.name}>
      {({ input }) => (
        <div>
          <label htmlFor={param.name}>{t(`product:${param.name}`)}</label>
          <select
            id={param.name}
            {...input}
            onChange={(e) => {
              input.onChange(e);
              handleSubmit();
              setSelectedParams(
                selectedParams.map((prm) =>
                  prm.name === param.name
                    ? setParamObj(param, e.target.value)
                    : prm
                )
              );
            }}
          >
            {param.values.map((obj) => (
              <option key={obj.value} value={obj.value}>
                {t(`product:${obj.name}`)}
              </option>
            ))}
          </select>
        </div>
      )}
    </Field>
  );
};

export default ParamField;
