import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDkzI_uwmyLNvajrALpn2DGZ4uv9nGS9zw",
  authDomain: "dreamers-concert.firebaseapp.com",
  databaseURL: "https://dreamers-concert.firebaseio.com",
  projectId: "dreamers-concert",
  storageBucket: "dreamers-concert.appspot.com",
  messagingSenderId: "892388661723",
  appId: "1:892388661723:web:66c59159f301427b34affe",
  measurementId: "G-MNYQ5JD1EY",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.useDeviceLanguage();

export { auth, db, firebase };

// // Nâng cấp vé mơ điêu
// let upgrade =
//   "wZL9VGPZT5o3TxLLuPxl,x5lKOcsLZMox04GfDvbA,x8ELZkvYWrrckTVIls8K,TnQMN3MKBXo8QiegPnIf,toN1q1o1kYqE3of1bYyo,3JoLjfZf6rLUNj9c7Q2E,3uNgtf1XJrLZi3TKwtZO,4y8wMbUHzNE2upy2hpTG,ssHoaaTvDmn64mP8bA8P,ST6kI8maewpEyqPDDumi,bbth9rbfJXLKe8sf05VJ,bBxywFa6Xd4XA252TAp2,iuyAY7f5krw49wUeSs4F,IwFD1tybtWsNa0KaR5Wm,rXIMlFhdbhh6SnSHU2VA,3vkBgxKdmorWXN0kh2Tg,4pZkyRzwHlcJPWsA4jqP";
// let typeRef = db.collection("ticketType").doc("rMlDTF1E3K0ucGl4cgMz");
// upgrade.split(",").forEach((id) => {
//   db.collection("tickets").doc(id).set({ type: typeRef }, { merge: true });
//   // db.collection("tickets").doc(id).delete();
//   // db.collection("tickets")
//   //   .doc(id)
//   //   .get()
//   //   .then((doc) => {
//   //     console.log(doc.data());
//   //   });
// });

// // Nâng cấp vé xa hoa
// let upgrade =
//   "qtbBi7dvDIDItrl0Xys2,QZmaFzHLGlnyKBxsMX9r,r7OhmoZc9sDADam6GoqJ,rFfvxVwjT2NidZdFXeyc,2HVSUMkjTOetNeqkqY8d,2lIZQlwVeKCuP7ASru23,mlxhN6FYkLpekpZFJoJd,MPchKXCbAc2qhtZDOGPP";
// let typeRef = db.collection("ticketType").doc("mf9pokVR3QKLi4Ib1EPV");
// upgrade.split(",").forEach((id) => {
//   db.collection("tickets").doc(id).set({ type: typeRef }, { merge: true });
//   // db.collection("tickets").doc(id).delete();
//   // db.collection("tickets")
//   //   .doc(id)
//   //   .get()
//   //   .then((doc) => {
//   //     console.log(doc.data());
//   //   });
// });

// Bỏ status Checkin
db.collection("tickets")
  .where("checked", "==", true)
  .get()
  .then((snapshot) => {
    snapshot.forEach((ticket) => {
      ticket.ref.set({ checked: false }, { merge: true });
    });
  });

// Thêm vé offline

// const typeRef = db.collection("ticketType").doc("mf9pokVR3QKLi4Ib1EPV");
// let quantity = 100;
// let qrcode = [];
// if (prompt("seed tickets ? ") === "y") {
//   for (let i = 0; i < quantity; i++) {
//     db.collection("tickets")
//       .add({
//         checked: false,
//         timeCheck: firebase.firestore.Timestamp.now(),
//         type: typeRef,
//         uid: false,
//       })
//       .then((ref) => {
//         console.log(ref.id);
//         qrcode.push(ref.id);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
//   window.qrcode = qrcode;
// }

// thêm lại vé lỗi

// db.collection("orders")
//   .where("paid", "==", true)
//   .get()
//   .then((snapshot) => {
//     snapshot.forEach((order) => {
//       const orderRef = db.collection("orders").doc(order.id);
//       const userRef = order.data().uid;
//       // Cái ni chạy trước
//       // db.collection("tickets")
//       //   .where("uid", "==", userRef.id)
//       //   .get()
//       //   .then((snap) => {
//       //     snap.forEach((doc) => doc.ref.delete());
//       //   });
//       // // Cái ni chạy sau
//       // for (const item of order.data().detail) {
//       //   const ticketTypeRef = db.collection("ticketType").doc(item.id);
//       //   for (let i = 0; i < item.qty; i++) {
//       //     console.log(item.name, userRef.id);
//       //     db.collection("tickets").add({
//       //       uid: userRef.id,
//       //       timeCheck: false,
//       //       checked: false,
//       //       type: ticketTypeRef,
//       //       order: order.id,
//       //     });
//       //   }
//       // }
//     });
//   });

// let qrcode = [];
// // const typeRef = db.collection("ticketType").doc("mf9pokVR3QKLi4Ib1EPV");
// db.collection("tickets")
//   // .where("type", "==", typeRef)
//   .where("uid", "==", "i4k5aQSydgaXpJjFJ0YxYSgLYR73")
//   .get()
//   .then((snap) => {
//     snap.forEach((doc) => {
//       qrcode.push({ ...doc.data(), id: doc.id });
//     });
//   });
// window.qrcode = qrcode;

// // Thống kê số lượng mua vé theo độ tuổi
// let qrcode = [];
// db.collection("tickets")
//   .where("uid", "!=", false)
//   // .doc('dmsJ7y1oQSmQRbJa8cPs')
//   .get()
//   .then((snap) => {
//     let map = new Map();
//     snap.forEach((doc) => {
//       const data = doc.data();
//       const userRef = data.uid;
//       // const typeRef = data.type;
//       // let uid;
//       db.collection("users")
//         .doc(data.uid)
//         .get()
//         .then((user) => {
//           const age = user.data().age;
//           if (map.has(age)) {
//             map.set(age, map.get(age) + 1);
//           } else {
//             map.set(age, 1);
//           }
//         });
//       // db.collection("tickets").add({
//       //   uid: uid,
//       //   checked: false,
//       //   timeCheck: firebase.firestore.Timestamp.now(),
//       //   type: typeRef,
//       // });
//       // doc.ref.set(
//       //   {
//       //     uid: false,
//       //     checked: false,
//       //     timeCheck: firebase.firestore.Timestamp.now(),
//       //   },
//       //   { merge: true }
//       // );
//       // qrcode.push(doc.data());
//     });
//     console.log(qrcode);
//     window.map = map;
//   });
// window.qrcode = qrcode;

// db.collection("orders")
//   .doc("DRZ79nhvMLUufhSH8E8y")
//   .set({ paid: true }, { merge: true });

// (async () => {
//   let orders = [];
//   const snapshot = await db
//     .collection("orders")
//     // .where("paid", "==", false)
//     // .limit(1)
//     .get();
//   let docs = snapshot.docs;
//   console.log(docs.length);
//   for (let doc of docs) {
//     // const doc = docs[item];
//     const data = doc.data();
//     // const userRef = data.uid;
//     // let userData = await userRef.get();
//     // let detail = [];
//     // for (let key in data.detail) {
//     //   let t = data.detail[key];
//     //   detail.push(t.name + ":" + t.qty);
//     // }
//     orders.push({
//       name: data.userName,
//       email: data.email,
//       phone: data.userPhone,
//       // detail: detail.join(";"),
//       amount: data.amount,
//     });
//   }
//   console.log(JSON.stringify(orders));
// })();
