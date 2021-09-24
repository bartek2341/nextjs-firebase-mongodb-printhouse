import { Field } from "react-final-form";

const FinalField = ({
  name,
  label,
  type,
  validate,
  disabled,
  initialValue,
}) => {
  return (
    <Field
      name={name}
      validate={validate}
      type={type}
      initialValue={initialValue}
    >
      {({ input, meta }) => (
        <div>
          <label htmlFor={name}>{label}</label>
          <input disabled={disabled} {...input} placeholder={label} id={name} />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};

export default FinalField;
