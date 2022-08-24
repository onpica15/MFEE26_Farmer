const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
    // console.log(req.body.getFreshItems);
    const freshItems = req.body.freshItemsArrayToSend.map((v, i) => {
        return `<div>${v.product_name}
        ${v.product_price}元 *
        ${v.product_count}個</div>`;
    });
    const customizedItems = req.body.customizedItemsArrayToSend.map((v, i) => {
        return `<div>${v.lunch_name}
        ${v.total_price}元 *
        ${v.product_count}個</div>`;
    });
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // 使用了內建傳輸傳送郵件 檢視支援列表：https://nodemailer.com/smtp/well-known/
        //   port: 465, // SMTP 埠
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'mfee26farmer@gmail.com',
            pass: 'tgqmecsedfnjqkwz', //授權碼，並非QQ密碼
        },
    });
    let mailOptions = {
        from: '"有機の小鱻肉" <mfee26farmer@gmail.com>', // 傳送地址
        to: 'ben216033@gmail.com', // 接收列表（可多個）
        subject: '購物明細確認', // 主題
        // 傳送text或者html格式（任選一個）
        html: `<body>
        <img style="width:300px" src="https://www.upload.ee/image/14320633/C_LOGO-1.jpg" border="0" alt="C_LOGO-1.jpg" />
        <h1>有機の小鱻肉</h1>
        <div>您的訂單編號為Farmer${req.body.orderId}</div>
        <div>您使用的折價券金額為${req.body.discount}元</div>
        <div>您的訂單金額為${req.body.finalPrice}元</div>
        <p>您購買的生鮮商品如下<br></p>
        <ul style="list-style: none">
        <li>${freshItems}</li>
        </ul>
        <br>
        <p>您購買的客製化便當如下<br></p>
        <ul style="list-style: none">
        <li>${customizedItems}</li>
        </ul>
        <br>
        <p>預計可到店取貨時間${req.body.deliveryTime} ${req.body.formattedTime}</p>
        <br>
        <h3>感謝您的購買 歡迎您再次光臨</h3>
        </body>`, // plain text body
        //html:  fs.createReadStream(path.resolve(__dirname,'index.html'))
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        ans = JSON.stringify(info);
        res.send(ans);
    });
});
module.exports = router;
