export const currencyFormat = (price) =>
  Number(price).toLocaleString("vi-vn", {
    style: "currency",
    currency: "vnd",
  });
