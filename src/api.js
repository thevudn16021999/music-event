import axios from "axios";

const MERCHANT_CODE = "DLTS14"; // Mã đối tác viettel

const instance = axios.create({
  baseURL: "http://localhost:5001/dreamers-concert/us-central1/api",
});

export const callPayment = (paymentInfo) => {
  const paymentURL = new URL(
    "https://sandbox.viettel.vn/PaymentGateway/payment"
  );
  const {
    billcode,
    order_id,
    trans_amount,
    login_msisdn,
    check_sum,
  } = paymentInfo;
  paymentURL.searchParams.append("version", "2.0");
  paymentURL.searchParams.append("billcode", billcode);
  paymentURL.searchParams.append("order_id", order_id);
  paymentURL.searchParams.append("command", "PAYMENT");
  paymentURL.searchParams.append("trans_amount", trans_amount);
  paymentURL.searchParams.append("login_msisdn", login_msisdn);
  paymentURL.searchParams.append("merchant_code", MERCHANT_CODE);
  paymentURL.searchParams.append("check_sum", check_sum);
  paymentURL.searchParams.append("return_url", "http://localhost:3000/confirm");
  console.log(paymentURL.href);
};

export default instance;
