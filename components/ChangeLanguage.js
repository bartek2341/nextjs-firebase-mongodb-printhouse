import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import i18nConfig from "i18n.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { respondTo } from "@/lib/index";

const { locales } = i18nConfig;

const ChangeLanguage = () => {
  const { t, lang } = useTranslation();

  return (
    <Wrapper>
      <ul>
        {locales.map((lng) => {
          if (lang === lng) return null;
          return (
            <li key={lng}>
              <Link href="/" locale={lng} key={lng}>
                <a>{t(`common:${lng}`)} </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <FontAwesomeIcon
        icon={faGlobe}
        title={t("common:language")}
        alt={t("common:language")}
      />
    </Wrapper>
  );
};

export default ChangeLanguage;

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    li {
      margin: 0 ${({ theme }) => theme.spacing.xs};
    }
  }
  ${respondTo.sm`
    margin-left: ${({ theme }) => theme.spacing.lg};
  `}
`;
