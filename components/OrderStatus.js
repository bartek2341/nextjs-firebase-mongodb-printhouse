import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

const OrderStatus = ({ variant }) => {
  let { t } = useTranslation();

  return <Status variant={variant}>{t(`order:${variant}`)}</Status>;
};

export default OrderStatus;

const Status = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 1px ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme: { colors }, variant }) => {
    switch (variant) {
      case "pending_assent":
        return colors.yellow;
      case "pending_payment":
        return colors.orange;
      case "rejected":
        return colors.red;
      case "processing":
        return colors.green;
      case "sent":
        return colors.blue.normal;
      case "delivered":
        return colors.black;
      default:
        return colors.black;
    }
  }};
`;
