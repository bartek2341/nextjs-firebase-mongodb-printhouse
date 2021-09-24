import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { PageTitle } from "@/components/pages/accountPage/index";
import { accountTypes, updateUserFetch } from "@/data/index";
import ChooseAccountType from "./ChooseAccountType";
import UserDataList from "./UserDataList";
import PersonForm from "./PersonForm";
import CompanyForm from "./CompanyForm";
import { toast } from "react-toastify";

const DataPage = ({ user, refetchUser }) => {
  let { t } = useTranslation();
  const [formType, setFormType] = useState(null);

  const onSubmit = async (values) => {
    const res = await updateUserFetch({ type: formType, data: values });
    if (res.ok) {
      await refetchUser();
      setFormType(null);
      toast.success(t("account:updateUserSuccess"));
    } else {
      toast.error(t("account:updateUserError"));
    }
  };

  const form =
    formType === accountTypes.person ? (
      <PersonForm user={user} onSubmit={onSubmit} />
    ) : formType === accountTypes.company ? (
      <CompanyForm user={user} onSubmit={onSubmit} />
    ) : null;

  return (
    <>
      <PageTitle>
        <h3>{user.email}</h3>
        {!user.data && (
          <p>
            <small>- {t("account:accountIncompletedText")}</small>
          </p>
        )}
      </PageTitle>
      {user.data && formType ? (
        form
      ) : user.data ? (
        <UserDataList user={user} setFormType={setFormType} />
      ) : (
        <>
          <ChooseAccountType formType={formType} setFormType={setFormType} />
          {form}
        </>
      )}
    </>
  );
};

export default DataPage;
