import useTranslation from "next-translate/useTranslation";
import { Field } from "react-final-form";
import styled from "styled-components";
import { required } from "@/lib/index";
import { useEffect } from "react";
import Head from "next/head";

const InpostMap = ({ details, setValue }) => {
  let { t } = useTranslation();

  useEffect(() => {
    window.easyPackAsyncInit = function () {
      easyPack.init({
        defaultLocale: "pl",
        mapType: "osm",
        searchType: "osm",
        points: {
          types: ["parcel_locker"],
        },
        map: {
          initialTypes: ["parcel_locker"],
        },
      });
      easyPack.mapWidget("easypack-map", function (point) {
        setValue("shipping.details", {
          name: "parcelLockerId",
          value: point.name,
        });
      });
    };
  }, []);

  return (
    <>
      <Head>
        <script src="https://geowidget.easypack24.net/js/sdk-for-javascript.js"></script>
        <link
          rel="stylesheet"
          href="https://geowidget.easypack24.net/css/easypack.css"
        />
      </Head>
      <Field name={"shipping.details"} validate={(val) => required(val, t)}>
        {({ meta }) => (
          <Wrapper>
            <label htmlFor="parcelLockerId">{t("realization:selected")}:</label>
            <input
              id="parcelLockerId"
              type="text"
              readOnly
              value={(details && details.value) || ""}
            />
            {meta.touched && meta.error && <Error>{meta.error}</Error>}
          </Wrapper>
        )}
      </Field>
      <div id="easypack-map"></div>
    </>
  );
};

export default InpostMap;

const Error = styled.div`
  color: ${({ theme }) => theme.colors.red};
`;

const Wrapper = styled.div`
  label {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;
