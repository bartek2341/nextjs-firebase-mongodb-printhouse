import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import { respondTo } from "@/lib/index";
import { Condition } from "@/components/index";
import { COURIER_SHIPPING } from "@/data/index";
import ShippingMethod from "./ShippingMethod";
import RecipentFields from "./RecipentFields";
import AddressFields from "./AddressFields";

const ShippingPage = ({ props, user, shippingMethods }) => {
  let { t } = useTranslation();
  const { setValue } = props.form.mutators;
  const { shipping } = props.values;

  const shippingMethodList = shippingMethods.map((method) => (
    <ShippingMethod
      key={method.name}
      method={method}
      setValue={setValue}
      formMethod={shipping}
    />
  ));

  return (
    <Wrapper>
      <div>
        <h3>{t("realization:shipping")}</h3>
        <Shipping>
          <p>{t("realization:selectShippingMethod")}:</p>
          <div>{shippingMethodList}</div>
        </Shipping>
      </div>
      <div>
        <h3>{t("realization:recipient")}</h3>
        <Recipent>
          <FieldSet>
            <h4>{t("realization:invoice")}</h4>
            <RecipentFields user={user} />
          </FieldSet>
          <Condition when={"shipping.value"} is={COURIER_SHIPPING}>
            <FieldSet>
              <h4>{t("realization:shippingAddress")}</h4>
              <AddressFields user={user} />
            </FieldSet>
          </Condition>
        </Recipent>
      </div>
    </Wrapper>
  );
};

export default ShippingPage;

const Wrapper = styled.div`
  & > div {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    ${respondTo.sm`
        margin-bottom: ${({ theme }) => theme.spacing.lg};
      `}
  }
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
    ${respondTo.sm`
     padding-left: ${({ theme }) => theme.spacing.lg};
     margin-bottom: ${({ theme }) => theme.spacing.lg};
    `}
  }
`;

const Shipping = styled.div`
  display: flex;
  flex-direction: column;
  ${respondTo.sm`
   flex-direction: row;
   justify-content: center;
   align-items: flex-start;
  `}
  & > p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    ${respondTo.sm`
     margin-bottom: 0;
     margin-right: ${({ theme }) => theme.spacing.lg};
  `}
  }
`;

const Recipent = styled.div`
  display: flex;
  flex-direction: column;
  ${respondTo.sm`
    flex-direction: row;
    align-items: flex-start;
`}
  & > div:nth-child(2) {
    margin-top: ${({ theme }) => theme.spacing.md};
    ${respondTo.sm`
      margin-top: 0;
      margin-left: ${({ theme }) => theme.spacing.xl};
  `}
  }
`;

const FieldSet = styled.div`
  border-radius: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray.light};
  background-color: ${({ theme }) => theme.colors.gray.xlight};
  width: 100%;
  ${respondTo.sm`
    max-width: 35%;
  `}
  h4 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  & > div {
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
