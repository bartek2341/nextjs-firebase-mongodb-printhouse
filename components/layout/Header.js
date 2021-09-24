import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { respondTo } from "@/lib/index";
import { Wrapper } from "@/components/index";

const Header = () => {
  let { t } = useTranslation();

  return (
    <header>
      <HeaderWrapper>
        <h1>{t("home:title")}</h1>
        <h2>{t("home:subtitle")}</h2>
      </HeaderWrapper>
    </header>
  );
};

export default Header;

const HeaderWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  h1,
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.titleXl};
    ${respondTo.sm`
      font-size: ${({ theme }) => theme.fontSizes.header};
    `}
  }
`;
