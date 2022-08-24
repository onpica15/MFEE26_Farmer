const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');
const todateString = require(__dirname + '/../modules/date_format');  
const router = express.Router();

//讀出
//company_id 寫在header//取的不同廠商的活動資料
router.get('/' , async (req,res)=>{
    const sql = "SELECT * FROM `company_activitydata` WHERE company_id=?"
    const [data] = await db.query(sql,[req.header("company_id")]);
    data.forEach((el) => (el.created_at = todateString(el.created_at)));
    // console.log(data)
    res.json(data)
})

//取得活動一筆資料
router.get('/activitydata' , async (req,res)=>{
    // console.log(req.header('sid'))
    const sql = "SELECT * FROM `company_activitydata` WHERE sid=?"
    const [data] = await db.query(sql,[req.header("sid")]);
    // data.forEach((el) => (el.created_at = todateString(el.created_at)));
    // console.log(data)
    res.json(data)
})

router.get('/getdata' , async (req,res)=>{
    const sql = "SELECT * FROM `company_activitydata` WHERE 1"
    const [data] = await db.query(sql);
    data.forEach((el) => (el.created_at = todateString(el.created_at)));
    // console.log(data)
    res.json(data)
})

//確認收藏狀況
//如果有customer_id,activity_sid 且資料庫有回傳>1的資料 代表之前有收藏過 有收藏回傳1 沒收藏回傳0 
//如果資料庫回傳<1的資料 代表之前該帳號對該活動沒有收藏過 回傳0
router.get('/checkisliked', async (req,res)=>{
    
    const sql = "SELECT * FROM `activity_isliked` WHERE customer_id=? && activity_sid=?"
    const [data] = await db.query(sql,[req.header('customer_id'),req.header('activity_sid')]);
    if(data.length>=1){
        res.json(data[0].isliked)
    } else {
        res.json(0)
    }
    
})
router.post('/islikedchange', async (req,res)=>{
    const output = {
        success: false,
        error: '',
    };
    if(!req.body.customer_id || !req.body.activity_sid){
        output.error="缺少參數"
        res.json(output)
    }

    const sql3 = `SELECT COUNT(1) num FROM activity_isliked WHERE customer_id=? && activity_sid=?`;
    const [[{ num }]] = await db.query(sql3, [req.body.customer_id,req.body.activity_sid]);
    if (num <= 0) {
        const sqlInsert = "INSERT INTO `activity_isliked`(`activity_sid`, `customer_id`, `isliked`) VALUES (?,?,1)"
        const [data] = await db.query(sqlInsert,[req.body.activity_sid,req.body.customer_id]);
        res.json(data)
    } 
    else
    {
    const sqlChangeIsliked = "UPDATE `activity_isliked` SET `isliked`=? WHERE customer_id=? && activity_sid=?"
    const [data] = await db.query(sqlChangeIsliked,[req.body.isliked,req.body.customer_id,req.body.activity_sid]);
    // console.log(data[0].isliked);
    res.json(data)}
})

// 新增
router.post('/add', async (req, res) => {
    const output = {
        success: false,
        error: '',
    };
    if (!req.body.company_id ) {
        output.error = '參數不足';
        return res.json(output); 
    }

    const sqlActivityUpdate =
        'INSERT INTO `company_activitydata`(`company_id`, `card_img`, `company_infoImg`, `address`, `phone`, `fax`, `card_area`, `card_city`, `card_info`, `card_info1`, `card_a`, `card_b`, `card_c`, `card_d`, `card_e`, `Map_a`, `Map_b`, `created_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())';

    const [r2] = await db.query(sqlActivityUpdate, [
        req.body.company_id,
        req.body.card_img,
        req.body.company_infoImg,
        req.body.address,
        req.body.phone,
        req.body.fax,
        req.body.card_area,
        req.body.card_city,
        req.body.card_info,
        req.body.card_info1,
        req.body.card_a,
        req.body.card_b,
        req.body.card_c,
        req.body.card_d,
        req.body.card_e,
        req.body.Map_a,
        req.body.Map_b,
    ]);

    // console.log(r2.affectedRows);
    if (r2.affectedRows) {
        output.success = true;
    }
    output.activity = await r2;
    res.json(output);
    //sid qty
});
router.put('/edit', async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const sql03 =
        'UPDATE company_activitydata SET card_area=?, card_img=?, company_infoImg=?, address=?, fax=?, card_city=?, card_info=?, card_info1=?, card_a=?, card_b=?, card_c=?, card_d=?, card_e=?, Map_a=?, Map_b=? WHERE sid=?';
    
    const {
        card_area,
        card_img,
        company_infoImg,
        address,
        fax,
        card_city,
        card_info,
        card_info1,
        card_a,
        card_b,
        card_c,
        card_d,
        card_e,
        Map_a,
        Map_b,
        company_activity_id
    }=req.body;
    const [activityedit] = await db.query(sql03,[
        card_area,
        card_img,
        company_infoImg,
        address,
        fax,
        card_city,
        card_info,
        card_info1,
        card_a,
        card_b,
        card_c,
        card_d,
        card_e,
        Map_a,
        Map_b,
        company_activity_id
    ])
    if(activityedit.affectedRows === 1){
        output.success = true
    }
    // console.log(req.body)
    res.json(output);
});


//刪除
router.delete('/deleteactivity', async (req, res) => {
    const sql06 =
        'DELETE FROM company_activitydata WHERE sid=?';
    
    const [r6] = await db.query(sql06, [
        req.body.sid
    ]);
    res.json(r6);
});









module.exports = router;
