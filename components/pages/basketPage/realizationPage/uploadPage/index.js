import { memo } from "react";
import UploadList from "./UploadList";
import UploadTable from "./UploadTable";
import { useMobile } from "@/hooks/index";

const UploadPage = ({ products }) => {
  const isMobile = useMobile();
  return isMobile ? (
    products.map((product, index) => (
      <UploadList key={product.configId} index={index} product={product} />
    ))
  ) : (
    <UploadTable products={products} />
  );
};

export default memo(UploadPage);
