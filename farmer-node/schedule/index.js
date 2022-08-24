const schedule = require('node-schedule');
const db = require('../modules/mysql-connect');

// 定時執行 1 minute
const taskFreq = '*/1 * * * *';

start()

function start() {
  if (process.env.NODE_ENV !== 'dev') {
    console.log('開始排程', process.env.NODE_ENV)
    const sche = schedule.scheduleJob(taskFreq, async () => {
      // console.log('now is :' + new Date());
      // 拿取資料: 預約時間已到, 未上架
      const products = await getProducts();
      for (let i = 0; i < products.length; i++) {
          updateProduct(products[i].sid);
      }
  
      // 更新資料: 已上架
  });
  }
}

const getProducts = async () => {
    // 拿取資料: 預約時間已到, 未上架
    const sql01 = `SELECT * FROM product WHERE sale_time < NOW() AND product_status = 0`;
    const [data] = await db.query(sql01);
    // console.log(data);
    return data;
};

function updateProduct(sid) {
    // 更新資料: 已上架
    const sql01 = `UPDATE product SET product_status = 1 ,sale_time = null WHERE sid=${sid}`;
    return db.query(sql01);
}

module.exports =  {};

// [
//     {
//       sid: 112,
//       product_name: '2112',
//       product_type: 2,
//       product_img: '["-0rCng0Hrp.jpg"]',
//       product_price: 12,
//       product_unit: 2,
//       product_details: 'qweqe',
//       product_expire: 3,
//       product_inventory: 12,
//       product_supplier: 5,
//       hot_sale: 0,
//       product_status: 0,
//       product_hashtag: '[2,7]',
//       sale_time: 2022-08-03T14:58:16.000Z,
//       created_at: 2022-08-08T14:58:25.000Z
//     }
//   ]
