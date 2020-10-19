const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const firebase = admin.initializeApp();
const db = firebase.firestore();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/order/create", async (req, res) => {
  const uid = req.body.uid;
  const orders = req.body.order;

  if (!(uid && orders?.length > 0)) {
    res.status(400).send({ error: "Missing Fields" });
    return;
  }

  try {
    const userRef = db.collection("users").doc(uid);
    const details = [];
    let cost = 0;

    for (const item of orders) {
      const ticketTypeRef = db.collection("ticketType").doc(item.id);
      const tickets = [];

      for (let i = 0; i < item.qty; i++) {
        const ticketRef = db.collection("tickets").doc();
        ticketRef.set({ uid: userRef, type: ticketTypeRef });
        tickets.push(ticketRef);
      }

      const fetch = await ticketTypeRef.get();
      details.push({ ...fetch.data(), tickets: tickets });

      // Tính giá tiền
      ticketTypeRef.set({ price: 50000, name: "Abc" });
      const ticketTypeDoc = await ticketTypeRef.get();
      const ticketTypeData = ticketTypeDoc.data();
      cost += ticketTypeData.price * item.qty;
    }

    // Tạo order
    const order = await db
      .collection("orders")
      .add({ uid: userRef, detail: details, amount: cost, paid: false });
    console.log(order.id);

    // Băm chuỗi thanh toán
    const access_code = "1234";
    const merchant_code = "DLTS14";
    const check_sum = crypto
      .createHmac("sha1", "1234567")
      .update(
        access_code +
          order.id +
          "PAYMENT" +
          merchant_code +
          order.id +
          cost +
          "2.0",
        "utf8"
      )
      .digest();

    res.send({
      trans_amount: cost,
      billcode: order.id,
      order_id: order.id,
      check_sum: check_sum.toString("base64"),
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server Error" });
  }
});

exports.api = functions.https.onRequest(app);
