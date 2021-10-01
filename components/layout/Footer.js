import styled from "styled-components";
import { Button } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import { respondTo } from "@/lib/index";

const Footer = () => {
  let { t } = useTranslation();

  return (
    <FooterWrapper>
      <Content>
        <Button
          variant="secondaryLink"
          gray
          target="_blank"
          href={process.env.NEXT_PUBLIC_PROJECT_URL}
        >
          {t("common:projectLink")}
        </Button>
        .
      </Content>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  ${respondTo.sm`
    margin-top: ${({ theme }) => theme.spacing.xl};
  `}
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`;
