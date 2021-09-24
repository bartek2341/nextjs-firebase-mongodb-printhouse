import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { respondTo } from "@/lib/index";
import useTranslation from "next-translate/useTranslation";

const Step = ({ pageNumber, stepNumber, text }) => {
  let { t } = useTranslation();
  const isActive = pageNumber === stepNumber;
  const isCompleted = pageNumber > stepNumber;

  return (
    <Wrapper isActive={isActive} isCompleted={isCompleted}>
      <Number isActive={isActive} isCompleted={isCompleted}>
        {pageNumber > stepNumber ? (
          <FontAwesomeIcon
            icon={faCheck}
            alt={t("realization:done")}
            title={t("realization:done")}
          />
        ) : (
          stepNumber
        )}
      </Number>
      <p>{text}</p>
    </Wrapper>
  );
};

export default Step;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  ${({ isCompleted, isActive }) =>
    isActive || isCompleted ? `opacity: 1` : `opacity: 0.5`};
  p {
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
  ${respondTo.xs`
      padding: 0 ${({ theme }) => theme.spacing.xs};
      margin-bottom: 0;
      &:not(:last-of-type):after {
       content: "";
       position: relative;
       right: -${({ theme }) => theme.spacing.xs}; 
       border-radius: ${({ theme }) => theme.spacing.sm};
       height: ${({ theme }) => theme.spacing.md};
       width: 25px;
       height: 3px;
       background-color: ${({ theme }) => theme.colors.green};
      ${respondTo.sm`
        width: 65px;
    `}
       ${respondTo.md`
        width: 110px;
    `}
    }
  `}
`;

const Number = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  ${({ theme, isActive, isCompleted }) =>
    isActive || isCompleted
      ? `
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  `
      : `background-color: ${theme.colors.gray.light};`}
  ${respondTo.md`
     font-size: ${({ theme }) => theme.fontSizes.md};
     width: 38px;
     height: 38px;
    `}
`;
