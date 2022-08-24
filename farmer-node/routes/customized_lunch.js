const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');

const upload = require(__dirname + '/../modules/upload_img');
const Joi = require('joi');
const router = express.Router();
const getUserCart = async (member_id) => {
    const sql = `SELECT p.*, odt.* 
  FROM order_details_tobuy odt 
  JOIN product p 
  ON odt.product_id=p.sid 
  WHERE odt.member_id=? && odt.cart_product_type=1
  ORDER BY odt.created_time`;

    const sqlcus = `SELECT cusp.*, odt.* 
  FROM order_details_tobuy odt 
  JOIN customized_lunch cusp 
  ON odt.customized_id=cusp.sid 
  WHERE odt.member_id=? && odt.cart_product_type=2
  ORDER BY odt.created_time`;

    const [r] = await db.query(sql, [member_id]);
    // console.log(r);
    const [r2] = await db.query(sqlcus, [member_id]);
    // console.log(r2);
    return [...r, ...r2];
};
const getListHandler = async (req, res) => {
    let output = {
        perPage: 100,
        page: 1,
        totalRows: 0,
        totalPages: 0,
        code: 0,
        error: '',
        query: {},
        rows: [],
    };
    // let search = req.query.search || '';
    // let beginDate = req.query.beginDate || '';
    // let endDate = req.query.endDate || '';
    let where = 'WHERE 1'; //WHERE 要空格

    let page = +req.query.page || 1;
    if (page < 1) {
        //如果page小於1 轉向到 ?page=1
        output.code = 410;
        output.error = '頁碼太小';
        return output; //redirect轉向
    }
    const sql01 = `SELECT COUNT(1) totalRows FROM foodlist ${where}`;
    const [[{ totalRows }]] = await db.query(sql01);
    let totalPages = 0;
    if (totalRows) {
        totalPages = Math.ceil(totalRows / output.perPage);
        if (page > totalPages) {
            //如果page大於總頁數 轉向回${totalPages}
            output.totalPages = totalPages;
            output.code = 420;
            output.error = '頁碼太大';
            return output;
        }
        const sql02 = `SELECT * FROM foodlist ${where} ORDER BY id DESC LIMIT ${
            (page - 1) * output.perPage
        },${output.perPage}`;
        const [r2] = await db.query(sql02);
        output.rows = r2;
    }
    output.code = 200;
    output = { ...output, page, totalRows, totalPages };

    return output;
};
// 此路徑的頂層middleware
router.use((req, res, next) => {
    // if (!req.session.admin) {
    //     return res.redirect("/");
    // }
    next();
});

router.get('/add', async (req, res) => {
    // if (!req.session.admin) {
    //     return res.redirect("/");
    // }
    res.json('customized_lunch/add');
});
router.get('/data', async (req, res) => {
    // if (!req.session.admin) {
    //     return res.redirect("/");
    // }
    res.render('customized_lunch/data');
});
router.post('/add', upload.none(), async (req, res) => {
    // 新增: 20220630 11:20
    const sql =
        'INSERT INTO `customized_lunch`( `lunch_pic`,`lunch_name`,`lunch_1`, `lunch_2`, `lunch_3`, `lunch_4`, `lunch_5`,  `total_price`, `lunchbox_stock`,  `custom_remark`,`member_id`) VALUES(?,?,?,?,?,?,?,?,?,?,?) ';
    const {
        lunch_pic,
        lunch_name,
        lunch_1,
        lunch_2,
        lunch_3,
        lunch_4,
        lunch_5,
        total_price,
        lunchbox_stock,
        custom_remark,
        member_id,
    } = req.body;
    const [result] = await db.query(sql, [
        lunch_pic,
        lunch_name,
        lunch_1,
        lunch_2,
        lunch_3,
        lunch_4,
        lunch_5,
        total_price,
        lunchbox_stock,
        custom_remark,
        member_id,
    ]);
    const orderNo = result.insertId;
    const sql2 =
        'INSERT INTO `order_details_tobuy`(`ready_to_buy`, `member_id`, `product_id`, `customized_id`, `cart_product_type`, `product_count`, `created_time`) VALUES (?,?,?,?,?,?,NOW())';

    const [r2] = await db.query(sql2, [
        0,
        member_id,
        0,
        orderNo,
        2,
        lunchbox_stock,
    ]);

    // console.log(r2.affectedRows);



    res.json(await getUserCart(req.body.member_id));
});

router.get('/api', async (req, res) => {
    const output = await getListHandler(req, res);

    res.json(output);
});

module.exports = router;
