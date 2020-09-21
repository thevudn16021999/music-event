import React from "react";
import { Button, Container, Form, Modal } from "semantic-ui-react";
import { useUser } from "../store";

const genderOptions = [
  { key: "m", text: "Nam", value: "male" },
  { key: "f", text: "Nữ", value: "female" },
  { key: "o", text: "Khác", value: "other" },
];

function Checkout({ open, closeModal, openModal, ticket }) {
  const [user, setUser] = useUser();

  const handleSubmit = (e) => {};
  const handleChange = (e, { name, value }) =>
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  return (
    <Modal open={open} onClose={closeModal}>
      <Modal.Header>Thông tin thanh toán</Modal.Header>
      <Modal.Content>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                name="name"
                value={user.name}
                label="Họ và tên"
                placeholder="Nguyễn Văn A"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                name="gender"
                value={user.gender}
                label="Giới tính"
                options={genderOptions}
                placeholder="Nam / Nữ / Giới tính khác"
                onChange={handleChange}
                required
              />
              <Form.Input
                fluid
                name="age"
                value={user.age}
                label="Độ tuổi"
                type="number"
                placeholder="18"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                name="phone"
                value={user.phone}
                label="Số điện thoại"
                type="tel"
                placeholder="0905999999"
                onChange={handleChange}
                required
              />
              <Form.Input
                fluid
                name="email"
                value={user.email}
                label="E-mail"
                type="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="qty"
                value={user.qty}
                type="number"
                label="Số vé"
                min="1"
                max="5"
                width="4"
                onChange={handleChange}
                required
              />
              <Form.Input
                name="tickets.price"
                value={ticket.price}
                type="number"
                label="Giá vé"
                width="6"
                readOnly
              />
              <Form.Input
                name="tickets.name"
                value={ticket.name}
                label="Loại vé"
                width="6"
                readOnly
              />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black">Nope</Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default Checkout;
