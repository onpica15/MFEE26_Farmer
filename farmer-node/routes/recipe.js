require('dotenv').config();
const express = require("express");
const db = require(__dirname + "/../modules/mysql-connect");
const todateString = require(__dirname + '/../modules/date_format');
const upload = require(__dirname + '/../modules/upload_img');
const router = express.Router();
const sqlstring = require("sqlstring");

// 以下為食譜新增

router.post('/createrecipe',upload.single('file') , async (req, res) => {
  console.log("body: ", req.body)
  try {
      // console.log(req.body.recipes_sid);
      // const customer_id = req.header('customer_id')
      const sqlcreate = "INSERT INTO `recipe`(`recipes_name`, `recipes_description`, `recipes_time_cost`, `recipes_portion`, `recipes_calories`, `recipes_type`, `recipes_cooking_degree`, `recipes_ingredient`, `recipes_ingredient1`, `recipes_ingredient2`, `recipes_ingredient3`, `recipes_ingredient4`, `recipes_ingredient5`, `recipes_ingredient6`, `recipes_ingredient7`, `recipes_ingredient8`, `recipes_ingredient9`, `recipes_step`, `recipes_step1`, `recipes_step2`, `recipes_step3`, `recipes_step4`, `recipes_step5`, `recipes_step6`, `recipes_step7`, `recipes_step8`, `recipes_step9`,  `recipes_img`,`recipe_creater`, `customer_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      // const ingre = req.body.ingredient.toString()
      const sql = sqlstring.format(sqlcreate, [
        req.body.recipesname ,
        req.body.description ,
        req.body.timecost ,
        req.body.portion ,
        req.body.calories ,
        req.body.recipestype ,
        req.body.recipesdegree ,
        req.body.ingredient ,
        req.body.ingredient1 ,
        req.body.ingredient2 ,
        req.body.ingredient3 ,
        req.body.ingredient4 ,
        req.body.ingredient5 ,
        req.body.ingredient6 ,
        req.body.ingredient7 ,
        req.body.ingredient8 ,
        req.body.ingredient9 ,
        req.body.step ,
        req.body.step1 ,
        req.body.step2 ,
        req.body.step3 ,
        req.body.step4 ,
        req.body.step5 ,
        req.body.step6 ,
        req.body.step7 ,
        req.body.step8 ,
        req.body.step9 ,
        req.body.recipes_img ,
        req.body.recipe_creater ,
        req.body.customer_id])
      console.log(sql)
      const recipescreate = await db.query(sql);
      // console.log(recipescreate);
      res.json(recipescreate);
      return
  } catch (error) {
      console.log(error)
      res.send(error);
      return;
  }

});


// 以下為食譜修改


router.post('/updaterecipe', async (req, res) => {
  try {
      // console.log(req.body);
      // const { recipes_name, recipes_time_cost, recipes_portion, recipes_calories, recipes_type, recipes_cooking_degree, recipes_ingredient, recipes_step, recipes_description, recipes_img, cooking_create_member_Id } = req.body;

      const sqlupdate = "UPDATE `recipe` SET `recipes_name`=? ,`recipes_description`=?, `recipes_time_cost`=? ,`recipes_portion`=? ,`recipes_calories`=? ,`recipes_type`=? ,`recipes_cooking_degree`=? ,`recipes_ingredient`=? ,`recipes_ingredient1`=? ,`recipes_ingredient2`=? ,`recipes_ingredient3`=? ,`recipes_ingredient4`=? ,`recipes_ingredient5`=? ,`recipes_ingredient6`=? ,`recipes_ingredient7`=? ,`recipes_ingredient8`=? ,`recipes_ingredient9`=? ,`recipes_step`=? ,`recipes_step1`=? ,`recipes_step2`=? ,`recipes_step3`=? ,`recipes_step4`=? ,`recipes_step5`=? ,`recipes_step6`=? ,`recipes_step7`=? ,`recipes_step8`=? ,`recipes_step9`=? , `recipes_img`=?, `customer_id`=? WHERE recipes_sid=?";
      const sql = sqlstring.format(sqlupdate, [
        req.body.updateRecipesname ,
        req.body.updateDescription ,
        req.body.updateTimecost ,
        req.body.updatePortion ,
        req.body.updateCalories ,
        req.body.updateRecipestype ,
        req.body.updateRecipesdegree ,
        req.body.updateIngredient ,
        req.body.updateIngredient1 ,
        req.body.updateIngredient2 ,
        req.body.updateIngredient3 ,
        req.body.updateIngredient4 ,
        req.body.updateIngredient5 ,
        req.body.updateIngredient6 ,
        req.body.updateIngredient7 ,
        req.body.updateIngredient8 ,
        req.body.updateIngredient9 ,
        req.body.updateStep0 ,
        req.body.updateStep1 ,
        req.body.updateStep2 ,
        req.body.updateStep3 ,
        req.body.updateStep4 ,
        req.body.updateStep5 ,
        req.body.updateStep6 ,
        req.body.updateStep7 ,
        req.body.updateStep8 ,
        req.body.updateStep9 ,
        req.body.recipes_img ,
        req.body.customer_id,
        req.body.recipe_sid
        ])
        console.log("asdf:", req.body.recipe_sid)
      console.log(sql)
      const recipesupdate = await db.query(sql);
      // console.log(recipesupdate);
      res.json(recipesupdate[0].insertId);
      return
  } catch (error) {
      res.send(error);
      return;
  }

});



// 以下為食譜刪除

router.delete('/delete', async (req, res) => {
  const recipes_sid = req.body.recipes_sid
  // console.log(req.body.recipes_sid);
  if (!recipes_sid) {
      return res.json({ message: 'error', code: '400' });
  }
  const sqlDelete = "DELETE FROM `recipe` WHERE recipes_sid=?";
  const recipesdelete = await db.query(sqlDelete, [recipes_sid]);
  console.log(recipesdelete);
  res.json(recipesdelete);
});


// 按讚數

router.post('/recipelikes', async (req, res) => {
  const output = {
    success: false,
    error: '',
};
if(!req.body.customer_id || !req.body.recipes_sid ){
    output.error="缺少參數"
    res.json(output)
}

const sql3 = `SELECT * FROM recipe_like WHERE customer_id=? && recipes_sid=?`;
  const [ num ] = await db.query(sql3, [req.body.customer_id,req.body.recipes_sid]);
  let data=[];

  if (num.length <= 0) {
      const sqlInsert = "INSERT INTO `recipe_like`(`customer_id`, `recipes_sid`) VALUES (?,?)"
       data = await db.query(sqlInsert,[req.body.customer_id,req.body.recipes_sid]);
  } 
  else
  {
  const sqlChangeIsliked = "DELETE FROM `recipe_like`  WHERE customer_id=? && recipes_sid=?"
    data = await db.query(sqlChangeIsliked,[req.body.customer_id,req.body.recipes_sid]);
 }
  // console.log(data);
  const sqlSearch = `SELECT COUNT(1) num FROM recipe_like WHERE recipes_sid=?`
  const [sqlSearchcount] = await db.query(sqlSearch,[req.body.recipes_sid]);
  console.log(sqlSearchcount[0].num);


 const changeCommentLikeSQL ="UPDATE `recipe` SET `recipes_like`=? WHERE recipes_sid=?"
  const [totalData] = await db.query(changeCommentLikeSQL,[sqlSearchcount[0].num,req.body.recipes_sid ]);
  res.json(totalData)
})



// 收藏數

router.post('/recipecollection', async (req, res) => {
  const output = {
    success: false,
    error: '',
};
if(!req.body.customer_id || !req.body.recipes_sid ){
    output.error="缺少參數"
    res.json(output)
}

const sql3 = `SELECT * FROM recipe_collectionlist WHERE customer_id=? && recipes_sid=?`;
  const [ num ] = await db.query(sql3, [req.body.customer_id,req.body.recipes_sid]);
  let data=[];

  if (num.length <= 0) {
      const sqlInsert = "INSERT INTO `recipe_collectionlist`(`customer_id`, `recipes_sid`) VALUES (?,?)"
       data = await db.query(sqlInsert,[req.body.customer_id,req.body.recipes_sid]);
  } 
  else
  {
  const sqlChangeIsliked = "DELETE FROM `recipe_collectionlist`  WHERE customer_id=? && recipes_sid=?"
    data = await db.query(sqlChangeIsliked,[req.body.customer_id,req.body.recipes_sid]);
 }
  // console.log(data);
  const sqlSearch = `SELECT COUNT(1) num FROM recipe_collectionlist WHERE recipes_sid=?`
  const [sqlSearchcount] = await db.query(sqlSearch,[req.body.recipes_sid]);
  console.log(sqlSearchcount[0].num);


 const changeCommentLikeSQL ="UPDATE `recipe` SET `recipes_collection`=? WHERE recipes_sid=?"
  const [totalData] = await db.query(changeCommentLikeSQL,[sqlSearchcount[0].num,req.body.recipes_sid ]);
  res.json(totalData)
})




// 分隔線


const getRecipeHandler = async (req, res) => {
    let output = {
      perPage: 12, // 每頁有幾筆
      page: 1, // 用戶看第幾頁
      totalRows: 0, // 總筆數
      totalPage: 0, // 總頁數
      code: 0, // 辨識狀態，初始值為0
      error: "", // 錯誤
      rows: [] // 資料內容為陣列
    };

    let page = +req.query.page || 1;
    // 讓使用者看選擇的頁數，或是第一頁，最前面的 "+"(正號) 是為了讓字串變數值
    if (page < 1) {
      output.code = 410;
      output.error = "頁面太小";
      return output;
      // return res.redirect('?page=1')，轉向
    }

    const orderBy = req.query.orderBy === "price" ? "product_price" : "recipes_sid";
    const order = req.query.order === "ASC" ? "ASC" : "DESC"; // DESC || ASC
    // ASC 遞增(由小到大)
    // DESC 遞減(由大到小)

    const sidVal = Number(req.query.sid);
    const sidSql = sidVal ?  `recipes_sid = ${sidVal}` : "1";
    // ID排序

    const filterSql = `WHERE ${typeSql} AND ${searchSql} AND ${hashTagSql} AND ${sidSql}`;

    const sql01 = `SELECT COUNT(1) totalRows FROM recipe WHERE 1`;
    // WHERE 1 全部資料，無篩選
    const [[{ totalRows }]] = await db.query(sql01);
    let totalPage = 0;
    if (totalRows) {
      totalPage = Math.ceil(totalRows / output.perPage);
      if (page > totalPage) {
        output.code = 420;
        output.error = "頁面太大";
        return output;
        // return res.redirect(`?page=${totalPages}`)，轉向
      }
    }
    
    const sql02 = `SELECT * FROM recipe WHERE 1 ORDER BY sid DESC LIMIT ${
      (page - 1) * output.perPage
    },${output.perPage}`;
    const [r2] = await db.query(sql02);
    // 拿到的是分頁的資料，後放入output的資料陣列中
    output.rows = r2.map((el) => {
      // 
      return {
        ...el,
        product_img: JSON.parse(el.product_img),
        product_hashtag: JSON.parse(el.product_hashtag)
      };
    });

    output.code = 200;
    output = { ...output, page, totalRows, totalPage };
    // 先展開物件，放入output、page、totalRows、totalPage等變數，取代原來的資料內容

    return output;
  };


  router.route("/").get(async (req, res) => {
    const output = await getRecipeHandler(req, res);
    res.json(output);
  });


  // 分隔線，以下為R

  router.get('/recipe', async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
      };
      const sql = await db.query('SELECT * FROM `recipe` WHERE 1');
      output.success=true;
      res.json(sql[0])
    })
    
    
    router.get('/each/:recipes_sid', async (req, res) => {
      if(!req.params.recipes_sid){
        return
      }
      const sqleach = "SELECT * FROM `recipe` WHERE recipes_sid= " 
      + req.params.recipes_sid;
      const [recipesdata] = await db.query(sqleach);
      res.json(recipesdata[0])
      })





  const dataquantity = "SELECT COUNT(1) num FROM recipe"
  // 計算資料筆數


  
  module.exports=router;