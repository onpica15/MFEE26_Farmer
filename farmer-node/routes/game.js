const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');
const router = express.Router();
const todateString = require(__dirname + '/../modules/date_format');

//需要的資料
//{"point":100,"customer_id":530}
//更改point
// fetch "http://localhost:3600/game/addpoints"
router.post('/addpoints', async (req, res) => {
    const sql = 'UPDATE `customer_data` SET `daily_points`=? WHERE `customer_id`=?';
    console.log(req.body.change_points);
    console.log(req.body.change_memberid);
    const [r] = await db.query(sql, [req.body.change_points, req.body.change_memberid]);
    console.log(r);
    res.json('success');
});


//需要的資料
//{"customer_id":530,"change_coupon":"低級折價券","change_spendpoints":50}
// fetch "http://localhost:3600/game/coupon"
router.post('/coupon', async (req, res) => {
    const sql2 =
        'INSERT INTO `coupon_01`(`change_img`, `change_memberid`, `change_coupon`, `change_spendpoints`, `change_spendprice`, `coupon_isused`, `change_time`) VALUES (?,?,?,?,?,?,NOW())';

    const [result2] = await db.query(sql2, [
        req.body.change_img,
        req.body.change_memberid,
        req.body.change_coupon,
        req.body.change_spendpoints,
        req.body.change_spendprice,
        0,
    ]);
  
    res.json(result2);
});


//拿兌換紀錄資料
router.get('/coupon', async (req, res) => {
    console.log(req.header('change_memberid'));
    const sql1 = 'SELECT * FROM `coupon_01` WHERE change_memberid ORDER BY `sid` DESC';
    const [r1] = await db.query(sql1, req.header('change_memberid'));
    r1.forEach((el) => (el.change_time = todateString(el.change_time)));
    res.json(r1);
});

// //拿點數資料
router.get('/member', async (req, res) => {
    console.log("id",req.header('change_memberid'));
    const sql1 = 'SELECT * FROM `customer_data` WHERE customer_id=?';
    const [r1] = await db.query(sql1, req.header('change_memberid'));
    res.json(r1);
});

module.exports = router;
