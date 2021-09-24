const shippings = [
  {
    _id: "shipping_3",
    name: "personal",
    price: {
      net: 0,
      gross: 0,
      currency: "PLN",
      tax: { rate: 0.23, value: 0, currency: "PLN" },
    },
  },
  {
    _id: "shipping_2",
    name: "courier",
    containers: [
      {
        price: {
          net: 13.74,
          gross: 16.9,
          currency: "PLN",
          tax: { rate: 0.23, value: 3.16, currency: "PLN" },
        },
        size: { width: 250, height: 100, length: 100, weight: 1000 },
      },
      {
        price: {
          net: 16.18,
          gross: 19.9,
          currency: "PLN",
          tax: { rate: 0.23, value: 3.72, currency: "PLN" },
        },
        size: { width: 500, height: 250, length: 250, weight: 10000 },
      },
      {
        price: {
          net: 24.31,
          gross: 29.9,
          currency: "PLN",
          tax: { rate: 0.23, value: 5.59, currency: "PLN" },
        },
        size: { width: 1200, height: 600, length: 600, weight: 31500 },
      },
    ],
  },
  {
    _id: "shipping_1",
    name: "parcelLocker",
    containers: [
      {
        price: {
          net: 9.75,
          gross: 11.99,
          currency: "PLN",
          tax: { rate: 0.23, value: 2.24, currency: "PLN" },
        },
        size: { width: 380, height: 80, length: 640, weight: 25000 },
      },
      {
        price: {
          net: 10.56,
          gross: 12.99,
          currency: "PLN",
          tax: { rate: 0.23, value: 2.43, currency: "PLN" },
        },
        size: { width: 380, height: 190, length: 640, weight: 25000 },
      },
      {
        price: {
          net: 12.19,
          gross: 14.99,
          currency: "PLN",
          tax: { rate: 0.23, value: 2.8, currency: "PLN" },
        },
        size: { width: 380, height: 410, length: 640, weight: 25000 },
      },
    ],
  },
];

export default shippings;
