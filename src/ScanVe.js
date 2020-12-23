import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Container } from "semantic-ui-react";
import Swal from "sweetalert2";
import moment from "moment";
import { db, firebase } from "./firebase";

moment.locale("vi", {
  months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split(
    "_"
  ),
  monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split(
    "_"
  ),
  monthsParseExact: true,
  weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
  weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysParseExact: true,
  meridiemParse: /sa|ch/i,
  isPM: function (input) {
    return /^ch$/i.test(input);
  },
  meridiem: function (hours, minutes, isLower) {
    if (hours < 12) {
      return isLower ? "sa" : "SA";
    } else {
      return isLower ? "ch" : "CH";
    }
  },
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM [năm] YYYY",
    LLL: "D MMMM [năm] YYYY HH:mm",
    LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
    l: "DD/M/YYYY",
    ll: "D MMM YYYY",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd, D MMM YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Hôm nay lúc] LT",
    nextDay: "[Ngày mai lúc] LT",
    nextWeek: "dddd [tuần tới lúc] LT",
    lastDay: "[Hôm qua lúc] LT",
    lastWeek: "dddd [tuần rồi lúc] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "%s tới",
    past: "%s trước",
    s: "vài giây",
    ss: "%d giây",
    m: "một phút",
    mm: "%d phút",
    h: "một giờ",
    hh: "%d giờ",
    d: "một ngày",
    dd: "%d ngày",
    M: "một tháng",
    MM: "%d tháng",
    y: "một năm",
    yy: "%d năm",
  },
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal: function (number) {
    return number;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
});

function getTypeFromID(id) {
  return {
    Ktlfada4M0hUSQXzmdj5: "Mơ Sớm",
    g9rl8PEYPMDDZVhJQ0Ey: "Early Bird",
    mf9pokVR3QKLi4Ib1EPV: "Mơ Xa Hoa",
    rMlDTF1E3K0ucGl4cgMz: "Mơ Điêu",
  }[id];
}

function ScanVe() {
  const [stop, setStop] = useState(false);

  const closeTab = () => {
    setStop(false);
  };

  const processTicket = async (ticketId) => {
    try {
      const ticketRef = await db.collection("tickets").doc(ticketId).get();
      if (ticketRef.exists) {
        if (ticketRef.data().checked === false) {
          // let userRef;
          // try {
          //   userRef = await db
          //     .collection("users")
          //     .doc(ticketRef.data().uid)
          //     .get();
          // } catch {
          //   userRef = null;
          // }
          // const user = userRef.data();
          const result = await Swal.fire({
            title: "Checkin Vé",
            html: `
                <p>Mã: ${ticketRef.id}</p>
                <p>Loại: ${getTypeFromID(ticketRef.data().type.id)}</p>
            `,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Check In",
          });
          if (result.isConfirmed) {
            ticketRef.ref
              .update({
                checked: true,
                timeCheck: firebase.firestore.Timestamp.now(),
              })
              .then(() => {
                Swal.fire(
                  "Checkin Thành Công",
                  "vé đã được checkin",
                  "success"
                );
              })
              .catch((e) => {
                console.error(e);
                Swal.fire(
                  "Vui lòng thử lại",
                  "Đã xảy ra lỗi trong quá trình checkin",
                  "error"
                );
              })
              .finally(() => {
                closeTab();
              });
          } else {
            closeTab();
          }
        } else {
          Swal.fire(
            "Không khả dụng",
            "Mã này đã được checkin " +
              moment(ticketRef.data().timeCheck.toDate()).fromNow() +
              " vào lúc " +
              moment(ticketRef.data().timeCheck.toDate()).format("LT"),
            "warning"
          ).then(closeTab);
        }
      } else {
        Swal.fire(
          "Không Tồn Tại",
          "Không tìm thấy vé trong cơ sở dữ liệu",
          "error"
        ).then(closeTab);
      }
    } catch (e) {
      console.error(e);
      Swal.fire(
        "Không Thể Checkin",
        "Bạn không phải người kiểm vé",
        "error"
      ).then(closeTab);
    }
  };

  const handleScan = (data) => {
    if (data) {
      if (!stop) {
        setStop(true);
        processTicket(data);
      }
    }
  };

  const handleError = (err) => {
    console.log(err);
  };

  return (
    <>
      <QrReader
        delay={500}
        onError={handleError}
        onScan={handleScan}
        resolution={240}
        facingMode="environment"
      />
    </>
  );
}

export default ScanVe;
