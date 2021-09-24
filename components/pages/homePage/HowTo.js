import styled from "styled-components";
import { Wrapper } from "@/components/index";
import SectionTitle from "./SectionTitle";
import useTranslation from "next-translate/useTranslation";
import { respondTo } from "@/lib/index";

const steps = [
  {
    number: 1,
    text: "selectProducts",
  },
  {
    number: 2,
    text: "uploadFiles",
  },
  {
    number: 3,
    text: "pay",
  },
  {
    number: 4,
    text: "ready",
  },
];

const HowTo = () => {
  let { t } = useTranslation();

  return (
    <Wrapper>
      <SectionTitle>{t("home:howTo")}</SectionTitle>
      <Steps>
        {steps.map(({ number, text }) => (
          <Step key={number} number={number} text={t(`home:${text}`)} />
        ))}
      </Steps>
    </Wrapper>
  );
};

export default HowTo;

const Step = ({ number, text }) => {
  return (
    <StepWrapper>
      <Content>
        <Number>{number}.</Number>
        <Text>{text}</Text>
      </Content>
    </StepWrapper>
  );
};

const Steps = styled.div`
  & > div:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.blue.normal};
    color: ${({ theme }) => theme.colors.white};
    &:after {
      border-color: transparent transparent transparent
        ${({ theme }) => theme.colors.blue.normal};
    }
  }
  & > div:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.gray.xlight};
    &:after {
      border-color: transparent transparent transparent
        ${({ theme }) => theme.colors.gray.xlight};
    }
  }
  ${respondTo.sm`
    display: flex;
    padding-right: 70px;
    & > div:first-child:before {
      position: absolute;
      content: "";
      left: 0;
      z-index: 1;
      border-style: solid;
      border-width: 25px 0 25px 25px;
      border-color: transparent transparent transparent ${({ theme }) =>
        theme.colors.white};
      ${respondTo.sm`
      border-width: 35px 0 35px 35px;
      `}
    }
  `}
`;

const StepWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 65%;
  height: 38px;
  ${respondTo.sm`
    height: 70px;
    justify-content: center;
  `}
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    left: 100%;
    border-style: solid;
    border-width: 19px 0 19px 19px;
    ${respondTo.sm`
      border-width: 35px 0 35px 35px;
    `}
  }
`;

const Content = styled.div`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  ${respondTo.sm`
    flex-direction: column;
    align-items: center; 
    text-align: center;
    margin-left: 35px;
  `}
`;

const Number = styled.div`
  ${respondTo.sm`
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
`;

const Text = styled.p`
  margin-left: ${({ theme }) => theme.spacing.xs};
  ${respondTo.sm`
    margin-left: 0;
  `}
`;
