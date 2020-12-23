const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { MERCHANT_CODE, checksum } = require("./api");

const firebase = admin.initializeApp();
const db = firebase.firestore();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/order/create", async (req, res) => {
  const uid = req.body.uid;
  const email = req.body.email;
  const orders = req.body.order;

  if (!(uid && orders && orders.length > 0)) {
    res.status(400).send({ error: "Missing Fields" });
    return;
  }

  try {
    const userRef = db.collection("users").doc(uid);
    const fetchUser = await userRef.get();
    const userData = fetchUser.data();
    const details = [];
    let cost = 0;

    for (const item of orders) {
      if (item.qty == 0) continue;

      if (item.id == "Ktlfada4M0hUSQXzmdj5-combo") {
        item.id = "Ktlfada4M0hUSQXzmdj5";
        const ticketTypeRef = db.collection("ticketType").doc(item.id);

        const fetch = await ticketTypeRef.get();
        details.push({ ...fetch.data(), id: fetch.id, qty: item.qty * 5 });

        cost += 1200000 * item.qty;
      } else {
        const ticketTypeRef = db.collection("ticketType").doc(item.id);

        const fetch = await ticketTypeRef.get();
        const ticketTypeData = fetch.data();
        details.push({ ...fetch.data(), id: fetch.id, qty: item.qty });

        cost += ticketTypeData.price * item.qty;
      }
    }

    // Tạo order
    const order = await db.collection("orders").add({
      uid: userRef,
      detail: details,
      amount: cost,
      paid: false,
      email: email,
      userPhone: userData.phone,
      userName: userData.name,
    });

    // Băm chuỗi thanh toán
    const data = order.id + "PAYMENT" + MERCHANT_CODE + order.id + cost + "2.0";
    const check_sum = checksum(data);

    res.send({
      merchant_code: MERCHANT_CODE,
      trans_amount: cost,
      billcode: order.id,
      order_id: order.id,
      check_sum: check_sum,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server Error" });
  }
});

// app.post("/order/confirm", async (req, res) => {
//   const order_id = req.body.order_id;
//   const detail = req.body.detail;
//   const user_id = req.body.user_id;
//   const orderRef = db.collection("orders").doc(order_id);
//   try {
//     const snapshot = await db
//       .collection("tickets")
//       .where("order", "==", order_id)
//       .get();
//     snapshot.forEach(async (doc) => await doc.ref.delete());
//     for (const item of detail) {
//       const ticketTypeRef = db.collection("ticketType").doc(item.id);
//       for (let i = 0; i < item.qty; i++) {
//         await db.collection("tickets").add({
//           uid: user_id,
//           timeCheck: false,
//           checked: false,
//           type: ticketTypeRef,
//           order: orderRef.id,
//         });
//       }
//     }

//     const order = await orderRef.set({ paid: true }, { merge: true });
//     res.send({ order: order });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({ error: "Server Error" });
//   }
// });

// app.post("/order/delete", async (req, res) => {
//   const order_id = req.body.order_id;
//   try {
//     const snapshot = await db
//       .collection("tickets")
//       .where("order", "==", order_id)
//       .get();
//     snapshot.forEach(async (doc) => await doc.ref.delete());
//     await db.collection("orders").doc(order_id).delete();
//     res.send({ message: "Success" });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({ error: "Server Error" });
//   }
// });

app.post("/payment/verify", async (req, res) => {
  const { billcode, merchant_code, order_id, check_sum } = req.body;
  let error_code = "02";
  console.log(req);
  // const check_sum = checksum(billcode + error_code + merchant_code + order_id);
  res.status(200).send({ error: "Not Implemented! :D" });
});

app.post("/payment/confirm", async (req, res) => {
  console.log(req);
  res.status(200).send({ error: "Not Implemented! :D" });
});

exports.api = functions.https.onRequest(app);
