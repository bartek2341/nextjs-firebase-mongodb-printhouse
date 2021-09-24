import styled from "styled-components";
import SectionTitle from "./SectionTitle";
import { Wrapper } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { respondTo } from "@/lib/index";

const About = () => {
  let { t } = useTranslation();
  const Text = (props) => <p {...props} />;

  return (
    <AboutWrapper>
      <SectionTitle>{t("home:aboutUs")}</SectionTitle>
      <Trans i18nKey="home:aboutUsText" components={[<Text />, <strong />]} />
    </AboutWrapper>
  );
};

export default About;

const AboutWrapper = styled(Wrapper)`
  p {
    ${respondTo.sm`
      margin-left: ${({ theme }) => theme.spacing.xl};
      font-size: ${({ theme }) => theme.fontSizes.lg};
    `}
  }
`;
