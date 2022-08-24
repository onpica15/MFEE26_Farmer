const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');
const router = express.Router();
const nodemailer = require('nodemailer');
// const moment = require('moment-timezone');

// const getCommentProductSid = async (comment_sid) => {
//     const sql = `SELECT p.*, c.quantity
//   FROM comment c
//   JOIN product p
//   ON c.product_sid=p.sid
//   WHERE comment_sid=?
//   ORDER BY c.created_at`;

//     const [r] = await db.query(sql, [comment_sid]);
//     return r;
// };


//按讚改變
router.post('/islikedchange', async (req,res)=>{


  const output = {
      success: false,
      error: '',
  };
  if(!req.body.customer_id || !req.body.comment_sid){
      output.error="缺少參數"
      res.json(output)
  }

  const sql3 = `SELECT * FROM comment_isliked WHERE customer_id=? && comment_sid=?`;
  const [ num ] = await db.query(sql3, [req.body.customer_id,req.body.comment_sid]);
  let data=[];
  if (num.length <= 0) {
    // console.log(num);
      const sqlInsert = "INSERT INTO `comment_isliked`(`comment_sid`, `customer_id`) VALUES (?,?)"
       data = await db.query(sqlInsert,[req.body.comment_sid,req.body.customer_id]);
  } 
  else
  {
    // console.log(num);
  const sqlChangeIsliked = "DELETE FROM `comment_isliked`  WHERE customer_id=? && comment_sid=?"
   data = await db.query(sqlChangeIsliked,[req.body.customer_id,req.body.comment_sid]);
  // console.log(data[0].isliked);
 }

 const sqlSearch = `SELECT COUNT(1) num FROM comment_isliked WHERE comment_sid=?`
 const [sqlSearchcount] = await db.query(sqlSearch,[req.body.comment_sid]);
 console.log(sqlSearchcount[0].num);


const changeCommentLikeSQL ="UPDATE `comment` SET `likes`=? WHERE comment_sid=?" 
const [totalData] = await db.query(changeCommentLikeSQL,[sqlSearchcount[0].num,req.body.comment_sid]);


 res.json(totalData)
})





// //抓全部資料.(comment) + 商品列表(product)的商品名稱(product_name)
router.get('/', async (req, res) => {
    const sql = `SELECT c.*, p.product_name ,cus.profile_img,cus.account
  FROM comment c
  JOIN product p
  ON c.product_sid=p.sid
  JOIN customer_data cus
  ON cus.customer_id=c.member_id
  ORDER BY c.created_at DESC
  `;

  const [r] = await db.query(sql);
  res.json(r);

});

//搜尋
// 抓商品的SID 如果有找到的話，再去對應評論的留言、頭像、帳號
router.post('/getproductbyname', async (req, res) => {
  const sql = `SELECT c.*, p.* ,cus.profile_img ,cus.account
FROM comment c
JOIN product p
ON c.product_sid=p.sid
JOIN customer_data cus
ON cus.customer_id=c.member_id
WHERE p.product_name LIKE '%${req.body.product_name}'
ORDER BY c.created_at DESC
`;
console.log(req.body);
const [r] = await db.query(sql);
console.log("r", r);
res.json(r);

});




//送資料到資料庫 (新增)
router.post('/createcomment', async (req, res) => {
    const sql =
        'INSERT INTO `comment`(`member_id`, `comment`, `rating`, `likes`, `created_at`, `product_sid`) VALUES (?,?,?,?,NOW(),?)';

    const [r] = await db.query(sql, [
        req.body.member_id,
        req.body.comment,
        req.body.rating,
        0, // 預設likes為0
        req.body.product_sid,
    ]);
    // r.forEach((el) => (el.created_at = todateString(el.created_at)));
    res.json(r);
});




// subscribe
//發送訂閱信
router.post('/subscribe', async (req, res) => {

  const output = {
    success: false,
    error:'',
    code:0,
  };
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
    to: `<kusakawa222@gmail.com>`, // 接收列表（可多個）
    subject: '【有機の小鱻肉】訂閱服務開啟通知', // 主題
    // 傳送text或者html格式（任選一個）
    html: `<body>
    <img style="width:300px" src="https://i.imgur.com/1sau5zj.jpg" border="0" alt="C_LOGO-1.jpg" />
    <h1>有機の小鱻肉</h1>
    <h4>親愛的用戶您好</h4>
    <h4>未來有最新活動資訊或優惠將會發布給您。</h4>
    <br>
    <div>【有機の小鱻肉團隊】 上</div>
    </body>`, // plain text body
    //html:  fs.createReadStream(path.resolve(__dirname,'index.html'))
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    const ans = JSON.stringify(info);
    res.send(ans);

   
});
output.success=true; //發送成功
res.json(output);
});



module.exports = router;