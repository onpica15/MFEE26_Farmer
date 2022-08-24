const express = require("express");
const _ = require('lodash')
const db = require(__dirname + "/../modules/mysql-connect");
const router = express.Router();
// const { toDateString, toDatetimeString } = require(__dirname +
//   "/../modules/date-tool");

const getListHandler = async (req) => {
  let output = {
    perPage: req.query.perPage || 12,
    page: 1,
    totalRows: 0,
    totalPage: 0,
    code: 0,
    error: "",
    rows: []
  };

  let page = +req.query.page || 1;
  if (page < 1) {
    output.code = 410;
    output.error = "頁面太小";
    return output;
  }

  const typeVal = Number(req.query.type);
  const typeSql = typeVal ? `product_type = ${typeVal}` : "1";

  const hashTagVal = Number(req.query.hashTag);
  const hashTagSql = hashTagVal
    ? `product_hashtag LIKE '%${hashTagVal}%'`
    : "1";

  const searchVal = req.query.search;
  const searchSql = searchVal ? `product_name LIKE '%${searchVal}%'` : "1";

  const orderBy = req.query.orderBy === "price" ? "product_price" : "sid";
  const order = req.query.order === "ASC" ? "ASC" : "DESC"; // DESC || ASC
  const orderSql = `ORDER BY ${orderBy} ${order}`;

  const sidVal = Number(req.query.sid);
  const sidSql = sidVal ?  `sid = ${sidVal}` : "1";

  const supVal = Number(req.query.supplier);
  const supSql = supVal ?  `product_supplier = ${supVal}` : "1";

  const staVal = req.query.status
  const staSql = staVal ? `product_status = ${staVal}` : "1"
  
  const filterSql = `WHERE ${typeSql} AND ${searchSql} AND ${hashTagSql} AND ${sidSql} AND ${supSql} AND ${staSql}`;
  // const sql01 = `SELECT COUNT(1) totalRows FROM product WHERE ${typeSql} LIKE `  ;
  const sql01 = `SELECT COUNT(1) totalRows FROM product ${filterSql}`;
  const [[{ totalRows }]] = await db.query(sql01);
  let totalPage = 0;
  if (totalRows) {
    totalPage = Math.ceil(totalRows / output.perPage);
    if (page > totalPage) {
      output.code = 420;
      output.error = "頁面太大";
      return output;
    }
  }
  const sql02 = `SELECT * FROM product ${filterSql} ${orderSql} LIMIT ${
    (page - 1) * output.perPage
  },${output.perPage}`;
  // console.log(sql02)
  const [r2] = await db.query(sql02);
  output.rows = r2.map((el) => {
    return {
      ...el,
      product_img: JSON.parse(el.product_img),
      product_hashtag: JSON.parse(el.product_hashtag)
    };
  });

  output.code = 200;
  output = { ...output, page, totalRows, totalPage };

  return output;
};


router.route("/").get(async (req, res) => {
  const output = await getListHandler(req);
  res.json(output);
}).post(async(req,res)=>{
  const output = {
    success: "資料新增失敗",
    error: ""
  };
  const fields = [
    'name', 'type', 'photo', 'price', 'unit','details', 'expire', 'inventory', 'supplier','status', 'hashtag','time'
  ]

  const fieldCkeck = [
    'name', 'type', 'photo', 'price', 'unit','details', 'expire', 'inventory', 'supplier','status', 'hashtag'
  ]
  if (fieldCkeck.some(k => _.isNil(req.body[k]) ))  {
    const invalid = fieldCkeck.filter(k => _.isNil(req.body[k])).join(', ')
    output.error = `參數不足 ${invalid}`; 
    return res.json(output);
  }

  const sql = "INSERT INTO `product`(`sid`, `product_name`, `product_type`, `product_img`, `product_price`, `product_unit`, `product_details`, `product_expire`, `product_inventory`, `product_supplier`, `hot_sale`, `product_status`, `product_hashtag`, `sale_time`, `created_at`) VALUES (null, ?, ?, ?, ?, ?, ?, ?,?, ?, 0,?,?,?, Now())"

  const values = fields.map((v,i)=> {
    const val = req.body[v]
    if (v === "photo" || v === "hashtag") {
      return JSON.stringify(val)
    }
   return val
  })

  const [r1] = await db.query(sql, [
    ...values,
  ]);
  if (r1.affectedRows) {
    output.success = "資料新增成功";
  }
  res.json(output); 
}).put(async(req,res)=>{
  const output = {
    success: "資料修改失敗",
    error: ""
  };
  // const fields = [
  //   'product_name', 'product_type', 'product_img', 'product_price', 'product_unit','product_details', 'product_expire', 'product_inventory', 'product_supplier','product_status', 'product_hashtag'
  // ]
  
  const fields = [
    'name', 'type', 'photo', 'price', 'unit','details', 'expire', 'inventory', 'supplier','status', 'hashtag','time'
  ]

  // if (fields.some(k => !req.body[k]))  {
  //   output.error = "參數不足"; 
  //   return res.json(output);
  // }

  const sql2 = `SELECT COUNT(1) num FROM product WHERE sid=?`;
  const [[{ num }]] = await db.query(sql2, [req.body.sid]);
  console.log(num)
  if (num <= 0) {
    output.error = "沒有此項商品";
    return res.json(output);
  }

  const sql = "UPDATE `product` SET `product_name`=?,`product_type`=?,`product_img`=?,`product_price`=?,`product_unit`=?,`product_details`=?,`product_expire`=?,`product_inventory`=?,`product_supplier`=?,`product_status`=?,`product_hashtag`=?,`sale_time`=? WHERE sid=?"

  const values = fields.map((v,i)=> {
    const val = req.body[v]
    if (v === "photo" || v === "hashtag") {
      return JSON.stringify(val)
    }
   return val
  })
  
  const [r1] = await db.query(sql, [
   ...values,
   req.body.sid
  ]);
  output.r1 = r1;

  if (r1.affectedRows || r1.changedRows) {
    output.success = "資料修改成功";
  }

  res.json(output);  

}).delete(async(req,res)=>{
  let output = {
    code: 0,
    error: "",
    rows: []
  };

  const sql = "DELETE FROM product WHERE sid=? ";
  const [r1] =  await db.query(sql, [req.body.sid]);
  output.r1 =r1

  if (r1.affectedRows) {
    output.code = 200;
    output.success = true;
  }
  res.json(output);
})

router.route("/hot_sale").get(async (req, res) => {
  let output = {
    code: 0,
    error: "",
    rows: []
  };

  const sql = `SELECT * FROM product WHERE hot_sale = 1 LIMIT 10`;
  const [rows,fields] = await db.query(sql);

  output.rows = rows.map((el) => {
    return {
      ...el,
      product_img: JSON.parse(el.product_img),
     product_hashtag: JSON.parse(el.product_hashtag)
    };
  });

  output.code = 200;

  res.json(output);
});

router.route("/rating").get(async (req, res) => {

  const sql = `SELECT rating FROM comment WHERE product_sid =? `;
  const [data] = await db.query(sql,[req.query.sid]);
  res.json(data);
});


module.exports = router;

//TODO: search 沒有東西
