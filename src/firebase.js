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
// db.enablePersistence()
//   .then(() => {
//     console.log("Enable Offline Features");
//   })
//   .catch(function (err) {
//     if (err.code === "failed-precondition") {
//       console.error(
//         "Mutiple Tabs use. Please Using one Tab only in Offline Mode"
//       );
//     } else if (err.code === "unimplemented") {
//       console.error("Browser not support Offline Yet");
//     }
//   });

export { auth, db, firebase };
