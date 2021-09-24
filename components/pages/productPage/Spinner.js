import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

const Spinner = () => {
  let { t } = useTranslation();

  return (
    <Wrapper>
      <FontAwesomeIcon
        icon={faSyncAlt}
        title={t("common:loading")}
        alt={t("common:loading")}
      />
    </Wrapper>
  );
};

export default Spinner;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: loading 0.8s linear infinite;
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
  }
`;
