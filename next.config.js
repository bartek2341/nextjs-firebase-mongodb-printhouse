const nextTranslate = require("next-translate");

module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  ...nextTranslate(),
  async rewrites() {
    return [
      {
        source: "/logowanie",
        destination: "/login",
      },
      {
        source: "/rejestracja",
        destination: "/signup",
      },
      {
        source: "/zresetuj-haslo",
        destination: "/reset-password",
      },
      {
        source: "/kontakt",
        destination: "/contact",
      },
      {
        source: "/konto",
        destination: "/account",
      },
      {
        source: "/konto/haslo",
        destination: "/account/password",
      },
      {
        source: "/konto/usun",
        destination: "/account/delete",
      },
      {
        source: "/konto/admin",
        destination: "/account/admin",
      },
      {
        source: "/konto/zamowienia",
        destination: "/account/orders",
      },
      {
        source: "/koszyk",
        destination: "/basket",
      },
      {
        source: "/koszyk/realizacja",
        destination: "/basket/realization",
      },
      {
        source: "/koszyk/realizacja/sukces",
        destination: "/basket/realization/success",
      },
      {
        source: "/koszyk/realizacja/blad",
        destination: "/basket/realization/error",
      },
      {
        source: "/platnosc/sukces",
        destination: "/payment/success",
      },
      {
        source: "/platnosc/blad",
        destination: "/payment/error",
      },
    ];
  },
};
