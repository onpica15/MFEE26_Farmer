const express = require('express');
const db = require('../modules/mysql-connect');

const router = express.Router();

const getRecommendARecipe = async(sid)=>{
    const sql =  `SELECT * FROM recipe WHERE recipes_sid = ${sid}`;
    const [r] = await db.query(sql, [sid]);

    return r;
}
router.get("/",async(req,res)=>{
    const output = await getRecommendARecipe(req.query.sid);
    res.json(output);
})

module.exports = router;
