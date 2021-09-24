import { setQuantityObj } from "@/lib/index";
import useTranslation from "next-translate/useTranslation";

const QuantityField = ({ quantity, setSelectedParams, selectedParams }) => {
  let { t } = useTranslation();
  return (
    <div>
      <label htmlFor={quantity.name}>{t(`product:${quantity.name}`)}</label>
      <select
        id={quantity.name}
        onChange={(e) => {
          setSelectedParams(
            selectedParams.map((param) =>
              param.name === quantity.name
                ? setQuantityObj(quantity, e.target.value)
                : param
            )
          );
        }}
      >
        {quantity.quantityTable.map((obj) => {
          return (
            <option key={obj.value} value={obj.value}>
              {obj.value} {t(`product:quantityUnit`)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default QuantityField;
