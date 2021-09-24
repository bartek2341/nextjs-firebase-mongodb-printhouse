import FileAdapter from "./FileAdapter";
import { Field } from "react-final-form";
import styled from "styled-components";
import { fileTypes, fileSize } from "@/data/index";
import useTranslation from "next-translate/useTranslation";
import { requiredFile } from "@/lib/index";

const UploadTable = ({ products }) => {
  let { t } = useTranslation();
  return (
    <Table>
      <thead>
        <tr>
          <th>{t("realization:product")}</th>
          <th>{t("realization:fileExtensions")}</th>
          <th>
            {t("realization:uploadFile")}{" "}
            <span>
              ({t("realization:maxFileSize")}: {fileSize.megabytes.value}
              {fileSize.megabytes.name})
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
          const { configId, name, selectedParams } = product;
          return (
            <tr key={configId}>
              <td>
                {t(`products:${name}.name`)}
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
              </td>
              <td>{fileTypes.extensions.map((ext) => ext).join(" ")}</td>
              <td>
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
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UploadTable;

const Table = styled.table`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
  th, td {
    padding: ${({ theme }) => theme.spacing.sm};
  }
  td {
    vertical-align: top;
    text-align: center;
    width: 33.33%;
  }
  tbody tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.gray.xlight};
  }
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  }
  .filepond--wrapper {
    label {
      font-size: ${({ theme }) => theme.fontSizes.md} !important;
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
