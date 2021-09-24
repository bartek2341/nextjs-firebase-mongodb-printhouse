import { Field } from "react-final-form";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { requiredFile } from "@/lib/index";
import FileAdapter from "./FileAdapter";
import { fileTypes, fileSize } from "@/data/index";

const UploadList = ({ product, index }) => {
  const { name, selectedParams } = product;
  let { t } = useTranslation();

  return (
    <Product>
      <h5>{t(`products:${name}.name`)}</h5>
      <Params>
        {selectedParams.map((param) => (
          <span key={param.name}>
            {t(`product:${param.name}`)}:{" "}
            {param.name === "quantity"
              ? `${param.option.value} ${t(`product:quantityUnit`)}`
              : t(`product:${param.option.name}`)}
          </span>
        ))}
      </Params>
      <div>
        {t("realization:fileExtensions")}:{" "}
        {fileTypes.extensions.map((ext) => ext).join(" ")}
      </div>
      <div>
        {t("realization:maxFileSize")}: {fileSize.megabytes.value}
        {fileSize.megabytes.name}
      </div>
      <Field
        name={`products[${index}].uploadFiles`}
        validate={(value) => requiredFile(value, t)}
        component={(props) => (
          <>
            <FileAdapter input={props.input} />
            {props.meta.error && props.meta.touched && (
              <Error>{props.meta.error}</Error>
            )}
          </>
        )}
      />
    </Product>
  );
};

export default UploadList;

const Product = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray.xlight};
  h5 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  .filepond--wrapper {
    margin-top: ${({ theme }) => theme.spacing.xs};
    label {
      font-size: ${({ theme }) => theme.fontSizes.sm} !important;
    }
  }
  .filepond--panel {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const Params = styled.div`
  span:not(:last-child):after {
    content: "/ ";
  }
`;

const Error = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.red};
`;
