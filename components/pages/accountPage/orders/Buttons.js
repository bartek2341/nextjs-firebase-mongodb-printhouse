import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashAlt,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

export const ViewButton = ({ onClick }) => {
  let { t } = useTranslation();
  return (
    <Btn variant="blue" onClick={onClick}>
      <FontAwesomeIcon
        icon={faEye}
        alt={t("account:view")}
        title={t("account:view")}
      />
    </Btn>
  );
};

export const DeleteButton = ({ onClick }) => {
  let { t } = useTranslation();
  return (
    <Btn variant="red" onClick={onClick}>
      <FontAwesomeIcon
        icon={faTrashAlt}
        alt={t("common:delete")}
        title={t("common:delete")}
      />
    </Btn>
  );
};

export const PaymentButton = ({ onClick }) => {
  let { t } = useTranslation();
  return (
    <Btn variant="green" onClick={onClick}>
      <FontAwesomeIcon
        icon={faMoneyCheckAlt}
        alt={t("account:pay")}
        title={t("account:pay")}
      />
    </Btn>
  );
};

const Btn = styled.button`
  cursor: pointer;
  border: none;
  border-radius: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: transparent;
  &:hover svg {
    color: ${({ theme: { colors }, variant }) => {
      if (variant === "green") return colors.green;
      else if (variant === "red") return colors.red;
      else if (variant === "blue") return colors.blue.normal;
    }};
  }
`;
