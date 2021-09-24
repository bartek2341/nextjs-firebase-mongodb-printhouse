import { Button, Buttons } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import { isPerson } from "lib/index";
import { accountTypes } from "@/data/index";

const UserDataList = ({ user, setFormType }) => {
  let { t } = useTranslation();
  const { data } = user;
  const { address } = data;
  return (
    <>
      <ul>
        {isPerson(user) ? (
          <>
            <li>
              {t("userData:name")}: {data.name}
            </li>
            <li>
              {t("userData:vorname")}: {data.vorname}
            </li>
          </>
        ) : (
          <>
            <li>
              {t("userData:company")}: {data.company}
            </li>
            <li>
              {t("userData:taxId")}: {data.taxId}
            </li>
          </>
        )}
        <li>
          {t("userData:street")}: {address.street}
        </li>
        <li>
          {t("userData:postalCode")}: {address.postalCode}
        </li>
        <li>
          {t("userData:city")}: {address.city}
        </li>
        <li>
          {t("userData:country")}: {address.country}
        </li>
      </ul>
      <Buttons>
        <Button responsive onClick={() => setFormType(user.type)}>
          {t("common:edit")}
        </Button>
        {isPerson(user) ? (
          <Button
            responsive
            gray
            onClick={() => setFormType(accountTypes.company)}
          >
            {t("account:changeAccountType")}
          </Button>
        ) : (
          <Button responsive onClick={() => setFormType(accountTypes.person)}>
            {t("account:changeAccountType")}
          </Button>
        )}
      </Buttons>
    </>
  );
};
export default UserDataList;
