import React, { useEffect, useState } from "react";
import { Statistic } from "semantic-ui-react";

function Countdown({ date }) {
  const [countdown, SetCountdown] = useState([]);
  date = new Date(date);
  //   console.log("date", date);

  const getTime = (time) => {
    const units = [24, 60, 60, 1000];
    let reduce = units.reduce((a, b) => a * b);
    return units.map((value) => {
      let result = Math.floor(time / reduce);
      time %= reduce;
      reduce /= value;
      return result < 10 ? "0" + result : result;
    });
  };

  useEffect(() => {
    const startCount = setTimeout(() => {
      let timeDiff = date - Date.now();
      const [days, hours, mins, secs] = getTime(timeDiff);
      SetCountdown([
        {
          key: "Ngày",
          value: days,
        },
        {
          key: "Giờ",
          value: hours,
        },
        {
          key: "Phút",
          value: mins,
        },
        {
          key: "Giây",
          value: secs,
        },
      ]);
    }, 999);
    return () => {
      clearTimeout(startCount);
    };
  });

  return (
    <Statistic.Group inverted widths="4" className="countdown">
      {countdown.map((stat, index) => (
        <Statistic key={index} label={stat.key} value={stat.value} />
      ))}
    </Statistic.Group>
  );
}

export default Countdown;
