import styled from "styled-components";
import { respondTo } from "lib/index";
import useTranslation from "next-translate/useTranslation";

const ButtonBox = ({ toogleNav, isNavOpened }) => {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <Btn onClick={toogleNav} title={t("common:menu")}>
        <Hamburger>
          <LineTop isNavOpened={isNavOpened} />
          <LineMiddle isNavOpened={isNavOpened} />
          <LineBottom isNavOpened={isNavOpened} />
        </Hamburger>
      </Btn>
    </Wrapper>
  );
};

export default ButtonBox;

export const Wrapper = styled.div`
  display: block;
  ${respondTo.sm`
    display: none;
  `}
`;

export const Btn = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: none;
  border-radius: ${({ theme }) => theme.spacing.xs};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  background-color: transparent;
`;

export const Hamburger = styled.div`
  width: 100%;
  height: 15px;
  position: relative;
`;

export const Line = styled.div`
  position: absolute;
  border-radius: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  height: 3px;
  left: 0;
  background-color: ${({ theme }) => theme.colors.gray.dark};
`;

export const LineTop = styled(Line)`
   {
    top: 0;
    ${({ isNavOpened }) =>
      isNavOpened &&
      `transform: rotate(-45deg) translateY(4px) translateX(-4px);;
  `}
`;

export const LineMiddle = styled(Line)`
  top: 6px;
  ${({ isNavOpened }) =>
    isNavOpened &&
    `
    opacity: 0;
`}
`;

export const LineBottom = styled(Line)`
  top: 12px;
  ${({ isNavOpened }) =>
    isNavOpened &&
    `
    transform: rotate(45deg) translateY(-4px) translateX(-4px);
`}
`;
