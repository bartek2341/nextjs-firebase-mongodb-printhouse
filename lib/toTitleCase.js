const toTitleCase = (str) =>
  str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(" ");

export default toTitleCase;
