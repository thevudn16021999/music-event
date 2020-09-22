import React from "react";
import { Icon, Step } from "semantic-ui-react";
import { Media } from "./MediaQuery";

function Steps({ step }) {
  const processes = [
    { icon: "sign in", title: "Đăng nhập" },
    { icon: "credit card", title: "Thông tin thanh toán" },
    { icon: "info", title: "Xác nhận" },
  ];
  return (
    <Step.Group unstackable widths={processes.length}>
      {processes.map((process, index) => (
        <Step
          key={index}
          active={step === index}
          disabled={step < index}
          completed={step > index}
        >
          <Icon name={process.icon} />
          <Media at="lg">
            <Step.Content>
              <Step.Title>{process.title}</Step.Title>
            </Step.Content>
          </Media>
        </Step>
      ))}
    </Step.Group>
  );
}

export default Steps;
