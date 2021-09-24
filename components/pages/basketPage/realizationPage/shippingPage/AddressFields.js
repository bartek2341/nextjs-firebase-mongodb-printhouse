import { FinalField } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import { requiredValue } from "@/lib/index";

const AddressFields = ({ user }) => {
  let { t } = useTranslation();
  const { street, postalCode, city, country } = user.data.address;

  return (
    <>
      <FinalField
        name="shipping.details.value.street"
        label={t("userData:street")}
        placeholder={t("userData:street")}
        type="text"
        validate={(val) => requiredValue(val, t)}
        initialValue={street}
      />
      <FinalField
        name="shipping.details.value.postalCode"
        label={t("userData:postalCode")}
        placeholder={t("userData:postalCode")}
        type="text"
        validate={(val) => requiredValue(val, t)}
        initialValue={postalCode}
      />
      <FinalField
        name="shipping.details.value.city"
        label={t("userData:city")}
        placeholder={t("userData:city")}
        type="text"
        validate={(val) => requiredValue(val, t)}
        initialValue={city}
      />
      <FinalField
        name="shipping.details.value.country"
        label={t("userData:country")}
        type="text"
        validate={(val) => requiredValue(val, t)}
        initialValue={country}
      />
    </>
  );
};
export default AddressFields;
