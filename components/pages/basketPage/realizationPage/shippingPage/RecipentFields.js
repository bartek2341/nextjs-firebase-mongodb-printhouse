import { FinalField } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import { isPerson, requiredValue } from "@/lib/index";

const RecipentFields = ({ user }) => {
  let { t } = useTranslation();
  return (
    <>
      {isPerson(user) ? (
        <>
          <FinalField
            name="recipient.data.name"
            label={t("userData:name")}
            placeholder={t("userData:vorname")}
            type="text"
            validate={(val) => requiredValue(val, t)}
          />
          <FinalField
            name="recipient.data.vorname"
            label={t("userData:vorname")}
            placeholder={t("userData:vorname")}
            type="text"
            validate={(val) => requiredValue(val, t)}
          />
        </>
      ) : (
        <>
          <FinalField
            name="recipient.data.company"
            label={t("userData:company")}
            placeholder={t("userData:company")}
            type="text"
            validate={(val) => requiredValue(val, t)}
          />
          <FinalField
            name="recipient.data.taxId"
            label={t("userData:taxId")}
            placeholder={t("userData:taxId")}
            type="text"
            validate={(val) => requiredValue(val, t)}
          />
        </>
      )}
      <FinalField
        name="recipient.data.address.street"
        label={t("userData:street")}
        placeholder={t("userData:street")}
        type="text"
        validate={(val) => requiredValue(val, t)}
      />
      <FinalField
        name="recipient.data.address.postalCode"
        label={t("userData:postalCode")}
        placeholder={t("userData:postalCode")}
        type="text"
        validate={(val) => requiredValue(val, t)}
      />
      <FinalField
        name="recipient.data.address.city"
        label={t("userData:city")}
        placeholder={t("userData:city")}
        type="text"
        validate={(val) => requiredValue(val, t)}
      />
      <FinalField
        name="recipient.data.address.country"
        label={t("userData:country")}
        type="text"
        validate={(val) => requiredValue(val, t)}
      />
    </>
  );
};

export default RecipentFields;
