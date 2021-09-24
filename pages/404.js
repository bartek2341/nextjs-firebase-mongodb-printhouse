import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { Wrapper } from "@/components/index";

export default function FourOhFour() {
  let { t } = useTranslation();

  return (
    <PageWrapper>
      <h2>{t("common:pageDoesntExist")}.</h2>
    </PageWrapper>
  );
}

const PageWrapper = styled(Wrapper)`
  text-align: center;
`;
