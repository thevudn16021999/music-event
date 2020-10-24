import React, { Component } from 'react'
import { 
  Container,
  Divider,
  Header,
  Accordion,
  Icon } from 'semantic-ui-react'
import "./Faq.css";

export default class AccordionExampleFluid extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
        <section class="ui inverted vertical segment section" id="sectionFAQ">
        <div class="container">
        <Header sub textAlign="center" className="section-header">
        Các câu hỏi thường gặp
        </Header>
        <Container>
        <Divider inverted horizontal>
          <Icon name="calendar outline" />
        </Divider>
      </Container>
        
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          1/ Quy định về phát hành vé
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            Mỗi lần giao dịch chỉ được mua tối đa 02 vé
            </p><p>
            Vé được phân phối độc quyền trên trang Ticketbox.vn
            </p><p>
            Mọi vấn đề liên quan đến vé sự kiện cần hỗ trợ bạn vui lòng liên hệ tổng đài của Ticket box theo số hotline 028.7300.7998
            </p><p>
            Vui lòng không mua vé từ bất kỳ nguồn nào khác để tránh trường hợp vé giả hoặc lừa đảo, BTC sẽ không chịu trách nhiệm giải quyết các trường hợp này
            </p><p>
            Khán giả vui lòng cân nhắc kỹ, vé đã mua sẽ không được đổi hoặc trả lại dưới mọi hình thức
            </p><p>
            Khán giả cần tự bảo quản mã vé điện tử của mình. BTC từ chối giải quyết trường hợp có nhiều hơn 1 người check-in cùng 1 mã vé. Theo quy định, BTC sẽ chấp nhận cho phép người đầu tiên check-in mã vé bị trùng được tham dự sự kiện.
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          2/ Quy định chung
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
            <p>Không quay phim/live stream các tiết mục trong đêm biểu diễn dưới mọi hình thức. Ban tổ chức (BTC) có quyền yêu cầu người vi phạm ra khỏi khu vực sự kiện và không hoàn trả tiền vé.</p>
			<p>Vui lòng xếp hàng trật tự khi tiến hành soát vé. Tuyệt đối không được có hành vi xô đẩy, chen lấn người khác trước, trong và sau khi sự kiện diễn ra.</p>
			<p>BTC có quyền từ chối sự tham gia của bất kì khán giả nào không tuân theo nội quy đã được thông báo mà không hoàn trả lại tiền vé.</p>
			<p>Khi tham gia sự kiện đồng nghĩa với việc người tham gia đã đồng ý cho phép sử dụng hình ảnh của mình để khai thác cho sản phẩm ghi hình, thu âm.</p>
			<p>Quyết định của BTC là quyết định cuối cùng trong mọi trường hợp.</p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          3/ Quy định về check-in
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
            <p>Ngay khi check-in tại sự kiện, người tham dự sẽ được nhận vòng tay và quà tặng tùy theo từng hạng vé</p>
			<p>Điều kiện hợp lệ để vào tham gia sự kiện là cần có đủ vòng tay giấy có đóng dấu của BTC và phải xuất trình vé điện tử/vé mời bất cứ lúc nào được yêu cầu. Bạn sẽ không được phép qua khu vực kiểm soát an ninh của sự kiện nếu thiếu 1 trong 2 điều trên.</p>
			<p>Khán giả cần tự bảo quản mã vé điện tử của mình. BTC từ chối giải quyết trường hợp có nhiều hơn 1 người check-in cùng 1 mã vé. Theo quy định, BTC sẽ chấp nhận cho phép người đầu tiên check-in mã vé bị trùng được tham dự sự kiện..</p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          4/ Quy định về các vật dụng bị cấm tại sự kiện
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
            <p>Các chất cấm (nước uống có cồn/chất kích thích), thuốc lá... đều không được phép sử dụng trong khu vực diễn ra sự kiện.</p>
			<p>Không được phép mang theo vũ khí dưới bất kỳ hình thức nào/đèn laser/đèn pin/các vật nhọn/ô dù/bút viết/gậy selfie/chân máy ảnh.</p>
			<p>Áp-phích/băng cổ vũ/bảng chỉ dẫn mang tính chất chính trị, chứa ngôn từ không phù hợp thuần phong mỹ tục.</p>
			<p>Máy tính bảng/iPad/GoPro/ống kính chuyên nghiệp/thiết bị chụp ảnh chuyên nghiệp/thiết bị ghi hình và thu âm chuyên nghiệp.</p>
			<p>Các động vật hoặc thú nuôi.</p>
			<p>Bật lửa/hộp quẹt/nến/pháo bông và các chất phát nổ.</p>
			<p>Các loại chai, lọ và vật liệu làm bằng nhôm, thiếc, thủy tinh hay nhựa cứng.</p>
			<p>Đồ uống, thức ăn, ghế ngồi từ bên ngoài buổi diễn</p>    
        </Accordion.Content>
      </Accordion>
      </div>
      </section>
    )
  }
}
