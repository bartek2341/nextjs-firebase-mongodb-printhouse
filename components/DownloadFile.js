import { canDownloadFile, getUrl } from "@/lib/index";
import { toast } from "react-toastify";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const DownloadFile = ({ file, currentUser, order }) => {
  let { t } = useTranslation();

  const download = async (userId, orderId, file) => {
    try {
      const url = await getUrl(`userFiles/${userId}/${orderId}/${file}`);
      window.open(url, "_blank");
    } catch (err) {
      toast.error(t("order:downloadFileError"));
    }
  };

  return typeof file === "object" ? (
    <span>{file.filename}</span>
  ) : (
    <>
      <span>{file}</span>
      {canDownloadFile(order, currentUser) && (
        <Btn onClick={() => download(order.user.user_id, order._id, file)}>
          <FontAwesomeIcon
            icon={faDownload}
            alt={t("order:download")}
            title={t("order:download")}
          />
        </Btn>
      )}
    </>
  );
};

export default DownloadFile;

const Btn = styled.button`
  cursor: pointer;
  border: none;
  border-radius: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: transparent;
`;
