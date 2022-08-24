const express = require('express');
const db = require('../modules/mysql-connect');
const helper = require('../utils/helper');

const router = express.Router();

const getProductCollect = async (member_id,product_id) => {
    const pidSql = product_id ? `product_id=${product_id} ` : 1
    const sql = `SELECT * FROM product_collect WHERE member_id=${member_id} AND ${pidSql} AND saved = 1`;

    // console.log(sql);

    const [r] = await db.query(sql, [member_id, product_id]);
    // console.log(r);

    return r;
};

router.get('/',async(req,res)=>{
    const output = await getProductCollect(req.query.user,req.query.sid);
    res.json(output);
})
.post('/', async (req, res) => {
    console.log('collect')
    // body: member_id, product_id, saved
    const output = {
        success: false,
        error: '',
    };

    if (!req.body.product_id || !req.body.member_id) {
        output.error = '參數不足';
        return res.json(output);
    }

    // const sql = `SELECT * FROM product_collect WHERE ${pSIDSql} AND ${userSql} AND saved = 1`;

    const value = {
        member_id: req.body.member_id,
        product_id: req.body.product_id,
        saved: req.body.saved,
    };

    const { sql, dataSet } = helper.getInsertUpdateWith(
        value,
        'product_collect'
    );

    console.log(sql)
    console.log(dataSet)

    const [results] = await db.query(sql, [dataSet]);
    console.log(results);

    output.success = true;
    return res.json(output);
});

module.exports = router;
