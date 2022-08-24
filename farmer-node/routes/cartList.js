const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');
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

//生鮮商品加入購物車 如果已經有了改成更新
router.post('/addfresh', async (req, res) => {
    const output = {
        success: false,
        error: '',
    };
    if (!req.body.product_id || !req.body.member_id) {
        output.error = '參數不足';
        return res.json(output);
    }
    const sql = `SELECT * FROM product WHERE sid=?`;
    const [r1] = await db.query(sql, [req.body.product_id]);
    if (!r1.length) {
        output.error = '沒有這個商品';
        return res.json(output);
    }
    if (+req.body.product_count < 1) {
        output.error = '請確認數量並重新加入購物車';
        return res.json(output);
    }

    // 判斷該商品是否已經加入購物車 有加入不該為新增 而是使用UPDATE
    const sql3 = `SELECT COUNT(1) num FROM order_details_tobuy WHERE product_id=? AND member_id=?`;
    const [[{ num }]] = await db.query(sql3, [
        req.body.product_id,
        req.body.member_id,
    ]);
    if (num > 0) {
        const sqlUpdate =
            'UPDATE `order_details_tobuy` SET `product_count`=? WHERE product_id=? AND member_id=?';
        const [rUpdate] = await db.query(sqlUpdate, [
            req.body.product_count,
            req.body.product_id,
            req.body.member_id,
        ]);
        output.r2 = rUpdate;

        if (rUpdate.affectedRows && rUpdate.changedRows) {
            output.success = true;
        }

        output.cart = await getUserCart(req.body.member_id);

        return res.json(output);
    }

    const sql2 =
        'INSERT INTO `order_details_tobuy`(`ready_to_buy`, `member_id`, `product_id`, `customized_id`, `cart_product_type`, `product_count`, `created_time`) VALUES (?,?,?,?,?,?,NOW())';

    const [r2] = await db.query(sql2, [
        0,
        req.body.member_id,
        req.body.product_id,
        0,
        1,
        req.body.product_count,
    ]);

    // console.log(r2.affectedRows);
    if (r2.affectedRows) {
        output.success = true;
    }

    output.cart = await getUserCart(req.body.member_id);
    res.json(output);
    //sid qty
});

//客製化商品加入購物車
router.post('/addcustomized', async (req, res) => {
    const output = {
        success: false,
        error: '',
    };
    if (!req.body.customized_id || !req.body.member_id) {
        output.error = '參數不足';
        return res.json(output);
    }

    if (+req.body.product_count < 1) {
        output.error = '請確認數量並重新加入購物車';
        return res.json(output);
    }

    const sql2 =
        'INSERT INTO `order_details_tobuy`(`ready_to_buy`, `member_id`, `product_id`, `customized_id`, `cart_product_type`, `product_count`, `created_time`) VALUES (?,?,?,?,?,?,NOW())';

    const [r2] = await db.query(sql2, [
        0,
        req.body.member_id,
        0,
        req.body.customized_id,
        2,
        req.body.product_count,
    ]);

    // console.log(r2.affectedRows);
    if (r2.affectedRows) {
        output.success = true;
    }

    output.cart = await getUserCart(req.body.member_id);
    res.json(await getUserCart(req.body.member_id));
    //sid qty
});

//讀出畫面
router.get('/', async (req, res) => {
    // console.log(req.header('member_id'));
    res.json(await getUserCart(req.header('member_id')));
});

//U
router.put('/changenum', async (req, res) => {
    // body:sid, product_count
    // console.log(req.body);
    const output = {
        success: false,
        error: '',
    };
    if (!req.body.sid || !req.body.product_count) {
        output.error = '參數不足';
        return res.json(output);
    }

    if (+req.body.product_count < 1) {
        output.error = '數量不能小於 1';
        return res.json(output);
    }

    // 判斷該商品是否已經加入購物車
    const sql3 = `SELECT COUNT(1) num FROM order_details_tobuy WHERE sid=?`;
    const [[{ num }]] = await db.query(sql3, [req.body.sid]);
    if (num <= 0) {
        output.error = '購物車內沒有這項商品';
        return res.json(output);
    }

    const sql2 =
        'UPDATE `order_details_tobuy` SET `product_count`=? WHERE sid=?';
    const [r2] = await db.query(sql2, [req.body.product_count, req.body.sid]);
    output.r2 = r2;

    if (r2.affectedRows && r2.changedRows) {
        output.success = true;
    }

    output.cart = await getUserCart(req.body.member_id);
    res.json(output);
    //sid qty
});

router.put('/readytobuy', async (req, res) => {
    // body:sid,check
    // console.log(req.body);
    const output = {
        success: false,
        error: '',
    };
    if (!req.body.sid) {
        output.error = '參數不足';
        return res.json(output);
    }

    // 判斷該商品是否已經加入購物車
    const sql3 = `SELECT COUNT(1) num FROM order_details_tobuy WHERE sid=?`;
    const [[{ num }]] = await db.query(sql3, [req.body.sid]);
    if (num <= 0) {
        output.error = '購物車內沒有這項商品';
        return res.json(output);
    }

    const sql2 =
        'UPDATE `order_details_tobuy` SET `ready_to_buy`=? WHERE sid=?';
    const [r2] = await db.query(sql2, [req.body.check, req.body.sid]);
    output.r2 = r2;

    if (r2.affectedRows && r2.changedRows) {
        output.success = true;
    }

    output.cart = await getUserCart(req.body.member_id);
    res.json(output);
    //sid qty
});

//cart那邊刪除資料
router.delete('/delete', async (req, res) => {
    // sid
    const sql = 'DELETE FROM order_details_tobuy WHERE sid=?';
    await db.query(sql, [req.body.sid]);

    res.json(await getUserCart(req.body.member_id));
    //進入購物車後要結帳
});

//商品加入od list od details 將tobut delete
router.route('/addtoorderlist').post(async (req, res) => {
    const output = {
        success: false,
        error: '',
    };
    // console.log(JSON.parse(JSON.stringify(req.body.freshItems))[0].product_id);
    if (!req.body.member_id) {
        output.error = '參數不足';
        return res.json(output);
    }

    //req.body=={member_id:num,totalPrice:num,customerRemark:"...",freshItems:[...],customizedItems:[...]}

    const sqltotal =
        'INSERT INTO `orderlist`( `order_no`,`customer_id`, `order_status`,`discount_value`, `product_amount_total`, `created_time`, `customer_remark`) VALUES (?,?,?,?,?,NOW(),?) ';

    const [rTotal] = await db.query(sqltotal, [
        req.body.order_id,
        req.body.member_id,
        '已完成付款',
        req.body.discount_value,
        req.body.totalPrice,
        req.body.customerRemark,
    ]);
    // console.log(rTotal);
    // const orderNo = rTotal.insertId;

    const sql2 =
        'INSERT INTO `order_details`(`order_no`, `product_id`, `customized_id`, `order_type`, `product_price`, `product_count`, `subtotal`, `created_time`) VALUES (?,?,?,?,?,?,?,NOW()) ';

    for (let i of req.body.freshItems) {
        const [r2] = await db.query(sql2, [
            req.body.order_id,
            i.product_id,
            0,
            1,
            i.product_price,
            i.product_count,
            req.body.totalPrice,
        ]);
    }

    const sql3 =
        'INSERT INTO `order_details`(`order_no`, `product_id`, `customized_id`, `order_type`, `product_price`, `product_count`, `subtotal`, `created_time`) VALUES (?,?,?,?,?,?,?,NOW()) ';

    for (let i of req.body.customizedItems) {
        const [r3] = await db.query(sql3, [
            req.body.order_id,
            0,
            i.customized_id,
            2,
            i.total_price,
            i.product_count,
            req.body.totalPrice,
        ]);
    }

    // console.log(r2.affectedRows);
    if (rTotal.affectedRows) {
        output.success = true;
    }

    const sqlChangeProductInventory =
        'UPDATE `product` SET `product_inventory`=? WHERE sid=?';
        // console.log(req.body);
    const newChangeInventoryArray = req.body.freshInventoryarray.map((v, i) => {
        return {
            count: v - req.body.freshItems[i].product_count,
            sid: req.body.freshItems[i].product_id,
        };
    });
    // console.log(newChangeInventoryArray);

    for (let i of newChangeInventoryArray) {
        const [rInventory] = await db.query(sqlChangeProductInventory, [
            i.count,
            i.sid,
        ]);
    }

    // if (rInventory.affectedRows) {
    //     output.changeInventory = true;
    // }

    const sqlDEL = 'DELETE FROM order_details_tobuy WHERE sid=?';
    for (let i of req.body.freshItems) {
        const [rDEL] = await db.query(sqlDEL, [i.sid]);
    }
    for (let i of req.body.customizedItems) {
        const [rDEL] = await db.query(sqlDEL, [i.sid]);
    }

    res.json(await getUserCart(req.body.member_id));

    //sid qty
});

//取得折價券資訊
router.get('/getdiscount', async (req, res) => {
    // console.log(req.header('member_id'));
    const sql = 'SELECT * FROM `coupon_01` WHERE change_memberid=?';
    const [discountData] = await db.query(sql, [req.header('change_memberid')]);
    res.json(discountData);
});

//折價券使用後將isused改成1
router.put('/discountcouponused', async (req, res) => {
    // body:sid,check
    // console.log(req.body);
    const output = {
        success: false,
        error: '',
    };
    // 判斷該商品是否已經加入購物車

    if (+req.body.discountValue === 0) {
        output.error = '沒有使用折價券';
        // console.log(output);
        res.json(output);
    } else {
        const sql2 = 'UPDATE `coupon_01` SET `coupon_isused`=? WHERE sid=?';

        const [r2] = await db.query(sql2, [1, req.body.sid]);
        if (r2.affectedRows && r2.changedRows) {
            output.success = true;
        }
        output.r2 = r2;
        // console.log(output);
        res.json(output);
    }

    //sid qty
});

module.exports = router;
