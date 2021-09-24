import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import useTranslation from "next-translate/useTranslation";
import { maxFiles, fileSize, fileTypes } from "@/data/index";

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

function FileAdapter({ input: { value, onChange } }) {
  let { t } = useTranslation();

  const onUpdateFiles = (values) => {
    const files = values.filter((file) => file.status === 2);
    onChange(files);
  };

  return (
    <FilePond
      labelIdle={t("realization:dropFile")}
      files={value}
      onupdatefiles={onUpdateFiles}
      onreorderfiles={onUpdateFiles}
      maxFiles={maxFiles}
      maxFileSize={fileSize.bytes.value}
      labelMaxFileSizeExceeded={t("realization:fileTooLarge")}
      labelMaxFileSize=""
      acceptedFileTypes={fileTypes.mimes}
      labelFileTypeNotAllowed={t("realization:invalidFileType")}
      fileValidateTypeLabelExpectedTypes=""
    />
  );
}

export default FileAdapter;
