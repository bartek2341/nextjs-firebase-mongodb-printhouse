import { fileSize, fileTypes } from "@/data/index";

export const requiredFile = (value, t) =>
  value.length ? undefined : t("validation:fieldRequired");

export const fileValidation = async (file, fileType) => {
  const buffer = Buffer.from(file.data, "base64");

  //size
  const size = buffer.length;
  if (size > fileSize.bytes.value) return false;

  //type
  const allowedExtensions = fileTypes.extensions.map((ext) => ext.substring(1));
  try {
    const { ext } = await fileType.fromBuffer(buffer);
    return allowedExtensions.includes(ext);
  } catch (err) {
    return false;
  }
};
