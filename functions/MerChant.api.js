
const data = require('./VIETTEL.data').SecrectInfo
const helper = require('./Helper')


// *********** API Verify Data Mục 4.1 trang 24 **********
// Dùng sau khi đối tác Gửi Yêu cầu thanh toán sang VT
// VT sẽ gọi API này để đảm bảo rằng yêu cầu thanh toán xuất phát từ chính đối tác
// Viettel không truyền sang số tiền (trans_amount) dưới dạng dữ liệu, tuy
// nhiên check_sum vẫn bao gồm tham số này
// ===> Đối tác cần kiểm tra Check_sum trước khi thực hiện các thao tác xử lý bên đối tác
module.exports.VerifyData = (resquest, respone) => {
    // VT POST params requestuest
    const rqBillcode = request.body.billcode
    const rqMerchant_code = request.body.merchant_code
    const rqOrderid = request.body.order_id
    const rqCheck_sum = request.body.check_sum

    // Some Logic Codes here ===>
    error_code = '00' // 01 02..
    //

    // Đối tác phản hổi lại VT, dữ liệu trả về dạng JSON
    var order_id = ''
    var ACCESS_KEY = data.ACCESS_KEY
    var MERCHANT_CODE = data.MERCHANT_CODE
    var billcode = ''
    var trans_amount = ''
    var check_value = ACCESS_KEY + billcode + MERCHANT_CODE + order_id + trans_amount
    var CHECK_SUM = helper.HashValue(data.HASH_KEY, check_value)

    var resData = {
        billcode: billcode,
        merchant_code: MERCHANT_CODE,
        order_id: order_id,
        check_sum: CHECK_SUM,
        error_code: error_code,
        trans_amount: trans_amount
    }
    res.end(JSON.stringify(resData))
}

// *********** API nhận Kết Quả Giao Dịch Mục 4.2 trang 26 **************
// Dùng để VT POST sang để gửi trả kêt quả giao dịch sau khi giao dịch thành công trên CTT/app VTPay
module.exports.getResult = (req, res) => {
    // VT POST params requests 
    const VTbillcode = req.body.billcode
    const VTcust_msisdn = req.body.cust_msisdn
    const VTerror_code = req.body.error_code
    const VTmerchant_code = req.body.merchant_code
    const VTorder_id = req.body.order_id
    const VTpayment_status = req.body.payment_status
    const VTtrans_amout = req.body.trans_amount
    const vt_transaction_id = req.body.vt_transaction_id
    const VTcheck_sum = req.body.check_sum

    // Some logics code here =>
    var error_code = '00'
    //

    // Đối tác phản hổi lại VT, dữ liệu trả về dạng JSON
    res.setHeader('Content-Type', 'application/json')
    const resCheck_value = data.ACCESS_KEY + error_code + data.MERCHANT_CODE + VTorder_id
    const resCHECK_SUM = helper.HashValue(data.ACCESS_KEY, resCheck_value)
    var resData = {
        error_code: error_code,
        merchant_code: data.MERCHANT_CODE,
        order_id: VTorder_id,
        return_url: 'https://yourSite.com.vn/paymentResult',
        return_bill_code: '',
        return_other_info: '',
        check_sum: resCHECK_SUM
    }
    res.end(JSON.stringify(resData))
}

// ***************** API Truy vấn thông tin trả về từ Đối Tác Mục 4.4 Trang 29 *************************
//  đối tác cung cấp địa chỉ URL để CTT truy vấn nội dung trả về khi hệ thống Viettel
// không nhận được thông tin phản hồi
module.exports.queryTrans = (req, res) => {
    const VTmerchant_code = req.body.merchant_code
    const VTorder_id = req.body.order_id
    const VTcheck_sum = req.body.check_sum

    // Some logic Codes here =>
    error_code = ''
    //

    // Đối tác phản hổi lại VT, dữ liệu trả về dạng JSON
    res.setHeader('Content-Type', 'application/json')
    const resCheck_value = data.ACCESS_KEY + error_code + data.MERCHANT_CODE + VTorder_id
    const resCHECK_SUM = helper.HashValue(data.ACCESS_KEY, resCheck_value)
    var resData = {
        error_code: error_code,
        merchant_code: MERCHANT_CODE,
        order_id: VTorder_id,
        return_url: 'https://yourSite.com.vn/paymentResult',
        return_bill_code: '',
        return_other_info: '',
        check_sum: resCHECK_SUM
    }
    res.end(JSON.stringify(resData))
}

// **************** API Truy Vấn Kết Quả Giao Dịch Mục 1.3 Trang 11 *******************
// sử dụng khi giao dịch bị timeout, tức phía ViettelPay đã có kết quả giao dịch nhưng
// gửi trả kết quả sang đối tác bị lỗi
// Method = POST, ContentType = application/x-www-form-urlencoded
// URL https://sandbox.viettel.vn/PaymentAPI/webresources/postData?
module.exports.TransInquiry = (request, respone) => {
    var request = require('request');

    const body = {
        cmd: 'TRANS_INQUIRY',
        merchant_code: data.MERCHANT_CODE,
        order_id: 'ORDER_1234', // Mã HD đối tác cần Truy Vấn kết quả
        version: '2.0',
        check_sum: ''
    }

    const value = ACCESS_KEY + body.cmd + data.MERCHANT_CODE + body.order_id + body.version
    const CHECK_SUM = hashValue(HASH_KEY, value)
    bod.check_sum = CHECK_SUM
    const reqBody = JSON.stringify(bod)
            .replace('{','')
            .replace('}','')
            .replace(/"/g,'')
            .replace(/,/g,'&')
            .replace(/:/g,'=');

    request({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'https://sandbox.viettel.vn/PaymentAPI/webresources/postData?',
        body: reqBody,
    }, (error, response, body) => {
        // Some Logic Code here //////////////////////////////////////
        if (response.statusCode == 200) {
            console.log('respone Trans_inquiry: ', body);
            res.render('ResultTransInquiry', {data: JSON.parse(body)})
        } else {
            res.send(error)
        }
    }
    //////////////////////////////////////////////////////////////////
    )
}

// ************* API Hoàn hủy Giao dịch Mucj 1.4 Trang 13
// VIETTEL cung cấp API cho phép đối tác gọi sang để thực hiện hủy giao dịch
module.exports.refundPayment = (req, res) => {
    // Dữ liệu đối tác POST sang
    var body = {
        cmd: 'REFUND_PAYMENT',
        merchant_code: data.MERCHANT_CODE,
        order_id: '', // Mã giao dịch phía đối tác
        originalRequestId: '', // Mã Giao dịch thanht toán tương ứng bên VT
        refundType: '0',
        trans_amount: 12000000, // Số tiền hoàn. Cần truyền sang để kiểm chứng giao dịch
        trans_content: '',
        version: '2.0',
        check_sum: ''
    }

    const reqCheck_value = data.ACCESS_KEY + body.cmd + data.MERCHANT_CODE + body.order_id + body.originalRequestId
                        + body.refundType + body.trans_amount + body.version
    body.check_sum = hashValue(data.HASH_KEY, reqCheck_value)
    
    body = JSON.stringify(body)
            .replace('{','')
            .replace('}','')
            .replace(/"/g,'')
            .replace(/,/g,'&')
            .replace(/:/g,'=')
    const request = require('request')
    request({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'https://sandbox.viettel.vn/PaymentAPI/webresources/postData?',
        body: body
    }, (error, response, body) => {
        // Some logic Codes here ////////////////////////////////////////////////
        if (response.statusCode == 200) {
            res.render('payment/PaymentRefundResult', {data: JSON.parse(body)})
        } else {
            res.send(error)
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    )
}
