import { Field } from "react-final-form";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { formatCurrency, required, respondTo } from "@/lib/index";
import { COURIER_SHIPPING, PARCELLOCKER_SHIPPING } from "@/data/index";
import InpostMap from "./InpostMap";

const ShipmentMethod = ({ method, setValue, formMethod }) => {
  let { t, lang } = useTranslation();
  const { name, price } = method;

  return (
    <Method>
      <Field
        value={name}
        type="radio"
        name={"shipping.value"}
        validate={(val) => required(val, t)}
      >
        {({ input, meta }) => (
          <>
            <div>
              <input
                id={name}
                {...input}
                onChange={(inputValue) => {
                  setValue("shipping", method);
                  name === COURIER_SHIPPING &&
                    setValue("shipping.details", {
                      name: "shippingAddress",
                    });
                  input.onChange(inputValue);
                }}
              />
              <label htmlFor={name}>{t(`shippingMethods:${name}.name`)}</label>{" "}
              <span>{formatCurrency(price.gross, price.currency, lang)}</span>
            </div>
            {meta.touched && meta.error && <Error>{meta.error}</Error>}
          </>
        )}
      </Field>
      <p>{t(`shippingMethods:${name}.description`)}</p>
      {name === PARCELLOCKER_SHIPPING &&
        formMethod &&
        formMethod.name === PARCELLOCKER_SHIPPING && (
          <InpostMap details={formMethod.details} setValue={setValue} />
        )}
    </Method>
  );
};

export default ShipmentMethod;

const Method = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  ${respondTo.sm`
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  `}
  p {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
  label {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    cursor: pointer;
  }
`;

const Error = styled.span`
  color: ${({ theme }) => theme.colors.red};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
