import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Menu } from "@/components/index";

const CategoryMenu = ({ categories }) => {
  let { t, lang } = useTranslation();
  const router = useRouter();
  const { category } = router.query;

  const categoryList = (
    <ul>
      {categories.map((ctgr) => (
        <li key={ctgr.name}>
          <Link href={`/${t(`common:products`)}/${ctgr.path[lang]}`}>
            <a className={category === ctgr.path[lang] ? "active" : ""}>
              {t(`productCategories:${ctgr.name}.name`)}
              <FontAwesomeIcon
                icon={faAngleRight}
                title={t("common:select")}
                alt={t("common:select")}
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Menu>
      <h4>{t("home:categories")}</h4>
      {categoryList}
    </Menu>
  );
};

export default CategoryMenu;
