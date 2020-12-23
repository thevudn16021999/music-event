const crypto = require("crypto");

// // Sandbox
// const ACCESS_CODE =
//   "d41d8cd98f00b204e9800998ecf8427e8ef02d3f07484838e2d4663e0a89a5fd";
// const HASH_KEY =
//   "d41d8cd98f00b204e9800998ecf8427ed62cf9295d452adc470798f09df3c847";

const ACCESS_CODE =
  "d41d8cd98f00b204e9800998ecf8427e9c7102961e86e8ea12d667b6b1f2a2c7";
const HASH_KEY =
  "d41d8cd98f00b204e9800998ecf8427e34c37142996cae61d179bf205868fba1";

const APP_KEY =
  "d41d8cd98f00b204e9800998ecf8427ee4ad15b7eb2b616994c9d65d73aa47bc";
const MERCHANT_CODE = "CTTTEST8";

module.exports.checksum = function (data) {
  let hmac = crypto.createHmac("SHA1", HASH_KEY);
  hmac.write(ACCESS_CODE + data);
  hmac.end();
  let hash = hmac.read().toString("base64");
  return hash;
};

module.exports.MERCHANT_CODE = MERCHANT_CODE;
module.exports.ACCESS_CODE = ACCESS_CODE;
module.exports.APP_KEY = APP_KEY;
module.exports.HASH_KEY = HASH_KEY;
