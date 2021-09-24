import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { respondTo } from "@/lib/index";
import { accountTypes } from "@/data/index";

const ChooseAccountType = ({ setFormType, formType }) => {
  let { t } = useTranslation();
  return (
    <>
      <Title>{t("account:chooseAccountType")}:</Title>
      <Wrapper>
        <AccountType
          onClick={() => setFormType(accountTypes.person)}
          isSelected={accountTypes.person === formType}
        >
          <FontAwesomeIcon
            icon={faUser}
            title={t("account:personalAccount")}
            alt={t("account:personalAccount")}
          />
          {t("account:personalAccount")}
        </AccountType>
        <AccountType
          onClick={() => setFormType(accountTypes.company)}
          isSelected={accountTypes.company === formType}
        >
          <FontAwesomeIcon
            icon={faBuilding}
            title={t("account:companyAccount")}
            alt={t("account:companyAccount")}
          />
          {t("account:companyAccount")}
        </AccountType>
      </Wrapper>
    </>
  );
};

export default ChooseAccountType;

const Title = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  div:nth-child(2) {
    margin-left: 5%;
    ${respondTo.sm`
     margin-left: ${({ theme }) => theme.spacing.md};
  `}
  }
  svg {
    font-size: ${({ theme }) => theme.fontSizes.titleXl};
  }
`;

const AccountType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid
    ${({ theme: { colors }, isSelected }) =>
      isSelected ? colors.blue.normal : colors.gray.light};
  border-radius: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: border 0.15s ease;
  padding: 7%;
  &:hover {
    border-color: ${({ theme }) => theme.colors.blue.normal};
  }
  ${respondTo.sm`
   padding: ${({ theme }) => theme.spacing.lg};
  `}
`;
