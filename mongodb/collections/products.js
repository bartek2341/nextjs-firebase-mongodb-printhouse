const products = [
  {
    _id: "prod_1",
    name: "businessCards",
    path: { en: "businessCards", pl: "wizytowki" },
    category: "businessCards",
    img: "businessCards.jpg",
    inStock: true,
    quantity: {
      name: "quantity",
      quantityTable: [
        { value: "100", realizationDays: { from: 1, to: 2 } },
        { value: "250", realizationDays: { from: 2, to: 3 } },
        { value: "500", realizationDays: { from: 3, to: 4 } },
        { value: "1000", realizationDays: { from: 4, to: 5 } },
      ],
    },
    params: [
      {
        name: "size",
        values: [
          { name: "90_50", value: "0" },
          { name: "85_55", value: "1" },
        ],
      },
      {
        name: "paper",
        values: [
          { name: "chalkMat", value: "0" },
          { name: "chalkFlash", value: "1" },
        ],
      },
      {
        name: "overprint",
        values: [
          { name: "oneSided", value: "0" },
          { name: "twoSided", value: "1" },
        ],
      },
    ],
    sizes: [
      {
        name: "90_50",
        values: { width: 90, height: 50, length: 20, weight: 10 },
      },
      {
        name: "85_55",
        values: { width: 85, height: 55, length: 20, weight: 10 },
      },
    ],
  },
  {
    _id: "prod_2",
    name: "foldedBusinessCards",
    path: { en: "foldedBusinessCards", pl: "wizytowki-skladane" },
    category: "businessCards",
    img: "foldedBusinessCards.jpg",
    inStock: true,
    quantity: {
      name: "quantity",
      quantityTable: [
        { value: "100", realizationDays: { from: 1, to: 2 } },
        { value: "250", realizationDays: { from: 2, to: 3 } },
        { value: "500", realizationDays: { from: 3, to: 4 } },
        { value: "1000", realizationDays: { from: 4, to: 5 } },
      ],
    },
    params: [
      {
        name: "size",
        values: [
          { name: "90_50", value: "0" },
          { name: "85_55", value: "1" },
        ],
      },
      {
        name: "paper",
        values: [
          { name: "chalkMat", value: "0" },
          { name: "chalkFlash", value: "1" },
        ],
      },
      {
        name: "overprint",
        values: [
          { name: "oneSided", value: "0" },
          { name: "twoSided", value: "1" },
        ],
      },
    ],
    sizes: [
      {
        name: "90_50",
        values: { width: 90, height: 50, length: 20, weight: 10 },
      },
      {
        name: "85_55",
        values: { width: 85, height: 55, length: 20, weight: 10 },
      },
    ],
  },
  {
    _id: "prod_3",
    name: "leaflets",
    path: { en: "leaflets", pl: "ulotki" },
    category: "leaflets",
    img: "leaflets.jpg",
    inStock: true,
    quantity: {
      name: "quantity",
      quantityTable: [
        { value: "100", realizationDays: { from: 1, to: 2 } },
        { value: "250", realizationDays: { from: 2, to: 3 } },
        { value: "500", realizationDays: { from: 3, to: 4 } },
        { value: "1000", realizationDays: { from: 4, to: 5 } },
      ],
    },
    params: [
      {
        name: "size",
        values: [
          { name: "297_210", value: "0" },
          { name: "420_297", value: "1" },
        ],
      },
      {
        name: "paper",
        values: [
          { name: "chalkMat", value: "0" },
          { name: "chalkFlash", value: "1" },
        ],
      },
      {
        name: "overprint",
        values: [
          { name: "oneSided", value: "0" },
          { name: "twoSided", value: "1" },
        ],
      },
    ],
    sizes: [
      {
        name: "297_210",
        values: { width: 297, height: 210, length: 20, weight: 20 },
      },
      {
        name: "420_297",
        values: { width: 420, height: 297, length: 20, weight: 25 },
      },
    ],
  },
  {
    _id: "prod_5",
    name: "paperBags",
    path: { en: "paperBags", pl: "torby-papierowe" },
    category: "bags",
    img: "paperBags.jpg",
    inStock: false,
    quantity: {
      name: "quantity",
      quantityTable: [
        { value: "100", realizationDays: { from: 1, to: 2 } },
        { value: "250", realizationDays: { from: 2, to: 3 } },
        { value: "500", realizationDays: { from: 3, to: 4 } },
        { value: "1000", realizationDays: { from: 4, to: 5 } },
      ],
    },
    params: [
      {
        name: "size",
        values: [
          { name: "297_210", value: "0" },
          { name: "420_297", value: "1" },
        ],
      },
      {
        name: "overprint",
        values: [
          { name: "oneSided", value: "0" },
          { name: "twoSided", value: "1" },
        ],
      },
    ],
    sizes: [
      {
        name: "297_210",
        values: { width: 297, height: 210, length: 20, weight: 20 },
      },
      {
        name: "420_297",
        values: { width: 420, height: 297, length: 20, weight: 25 },
      },
    ],
  },
  {
    _id: "prod_4",
    name: "foldedLeaflets",
    path: { en: "foldedLeaflets", pl: "ulotki-skladane" },
    category: "leaflets",
    img: "foldedLeaflets.jpg",
    inStock: true,
    quantity: {
      name: "quantity",
      quantityTable: [
        { value: "100", realizationDays: { from: 1, to: 2 } },
        { value: "250", realizationDays: { from: 2, to: 3 } },
        { value: "500", realizationDays: { from: 3, to: 4 } },
        { value: "1000", realizationDays: { from: 4, to: 5 } },
      ],
    },
    params: [
      {
        name: "size",
        values: [
          { name: "297_210", value: "0" },
          { name: "420_297", value: "1" },
        ],
      },
      {
        name: "paper",
        values: [
          { name: "chalkMat", value: "0" },
          { name: "chalkFlash", value: "1" },
        ],
      },
      {
        name: "overprint",
        values: [
          { name: "oneSided", value: "0" },
          { name: "twoSided", value: "1" },
        ],
      },
    ],
    sizes: [
      {
        name: "297_210",
        values: { width: 297, height: 210, length: 20, weight: 20 },
      },
      {
        name: "420_297",
        values: { width: 420, height: 297, length: 20, weight: 25 },
      },
    ],
  },
  {
    _id: "prod_7",
    name: "briefcases",
    path: { en: "briefcases", pl: "teczki" },
    category: "briefcases",
    img: "briefcases.jpg",
    inStock: true,
    quantity: {
      name: "quantity",
      quantityTable: [
        { value: "100", realizationDays: { from: 1, to: 2 } },
        { value: "250", realizationDays: { from: 2, to: 3 } },
        { value: "500", realizationDays: { from: 3, to: 4 } },
        { value: "1000", realizationDays: { from: 4, to: 5 } },
      ],
    },
    params: [
      {
        name: "size",
        values: [
          { name: "297_210", value: "0" },
          { name: "420_297", value: "1" },
        ],
      },
      {
        name: "paper",
        values: [
          { name: "chalkMat", value: "0" },
          { name: "chalkFlash", value: "1" },
        ],
      },
      {
        name: "overprint",
        values: [
          { name: "oneSided", value: "0" },
          { name: "twoSided", value: "1" },
        ],
      },
    ],
    sizes: [
      {
        name: "297_210",
        values: { width: 297, height: 210, length: 20, weight: 200 },
      },
      {
        name: "420_297",
        values: { width: 420, height: 297, length: 20, weight: 250 },
      },
    ],
  },
  {
    _id: "prod_6",
    name: "cottonBags",
    path: { en: "cottonBags", pl: "torby-bawelniane" },
    category: "bags",
    img: "cottonBags.jpg",
    inStock: true,
    quantity: {
      name: "quantity",
      quantityTable: [
        { value: "100", realizationDays: { from: 1, to: 2 } },
        { value: "250", realizationDays: { from: 2, to: 3 } },
        { value: "500", realizationDays: { from: 3, to: 4 } },
        { value: "1000", realizationDays: { from: 4, to: 5 } },
      ],
    },
    params: [
      {
        name: "size",
        values: [
          { name: "297_210", value: "0" },
          { name: "420_297", value: "1" },
        ],
      },
      {
        name: "overprint",
        values: [
          { name: "oneSided", value: "0" },
          { name: "twoSided", value: "1" },
        ],
      },
    ],
    sizes: [
      {
        name: "297_210",
        values: { width: 297, height: 210, length: 20, weight: 20 },
      },
      {
        name: "420_297",
        values: { width: 420, height: 297, length: 20, weight: 25 },
      },
    ],
  },
];

export default products;
