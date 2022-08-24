//設定
require('dotenv').config();
// 1.引入 express
const express = require('express');
//SQL連線模組放進去
const db = require(__dirname + '/../modules/mysql-connect');
const bcrypt = require('bcryptjs');
const todateString = require(__dirname + '/../modules/date_format');
const upload = require(__dirname + '/../modules/upload_img');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use((req, res, next) => {
    const comAuth = req.get('Authorization');
    res.locals.loginUser = null;
    if (comAuth && comAuth.indexOf('Bearer ') === 0) {
        const token = auth.slice(7);
        res.locals.loginUser = jwt.verify(token, process.env.JWT_SECRET);
    }
    next();
});




router.route('/login').post(async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const sql = "SELECT * FROM company WHERE company_email=?"; //
        const [r1] = await db.query(sql, [req.body.company_email]);//

    if (!r1.length) {
        output.code = 401;
        output.error = '帳號錯誤';
        return res.json(output);
    }
    console.log(req.body.company_password);
    console.log(r1[0].company_password);
    output.success = await bcrypt.compare(req.body.company_password, r1[0].company_password);
    if (!output.success) {
        output.code = 402;
        output.error = '密碼錯誤';
        return res.json(output);
    } else {
        const token = jwt.sign(
            {
                company_id: r1[0].company_id,
                company_email: r1[0].company_email,
                farm_name: r1[0].farm_name,
            },
            process.env.JWT_SECRET
        );

        output.data = {
            token,
            company_id: r1[0].company_id,
            farm_type: r1[0].farm_type,
            farm_name: r1[0].farm_name,
            farm_tax_id: r1[0].farm_tax_id,
            company_name: r1[0].company_name,
            company_id_number: r1[0].company_id_number,
            company_phone: r1[0].company_phone,
            farm_tel: r1[0].farm_tel,
            farm_fax: r1[0].farm_fax,
            farm_address: r1[0].farm_address,
            company_email: r1[0].company_email,
            company_password: r1[0].company_password,
            creat_at: r1[0].creat_at
        };
        
    }

    res.json(await output);
});

router.post('/register', async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const sql01 =
        'INSERT INTO `company`(`farm_name`, `company_name`,`company_id_number`,`company_phone`,`company_email`,`company_password` ,`creat_at`) VALUES (?,?,?,?,?,?,NOW())';
    const { farm_name, company_name, company_id_number, company_phone, company_email, company_password } = req.body;
    const pass_hash = bcrypt.hashSync(`${company_password}`, 10);
    const [result] = await db.query(sql01, [farm_name, company_name,company_id_number, company_phone , company_email, pass_hash]);

    if (result.affectedRows === 1) {
        output.success = true;
    }

    res.json(output);
});
router.get('/getproductdata', async (req, res) => {
    const sql02 = 'SELECT COUNT(1) num FROM product WHERE product_supplier=?';
    const [r2] = await db.query(sql02, req.header('loginUser'))
    // console.log(r2[0].num);
    // r2.forEach((el) => (el.creat_at = todateString(el.creat_at)));
    res.json(r2);
});

router.get('/getactivitydata', async (req, res) => {
    const sql02 = 'SELECT COUNT(1) num FROM company_activitydata WHERE company_id=?';
    const [r2] = await db.query(sql02, req.header('loginUser'))
    // console.log(r2[0].num);
    // r2.forEach((el) => (el.creat_at = todateString(el.creat_at)));
    res.json(r2);
});

router.get('/home', async (req, res) => {
    const sql02 = 'SELECT * FROM company WHERE company_id=?';
    const [r2] = await db.query(sql02, req.header('loginUser'));
    r2.forEach((el) => (el.creat_at = todateString(el.creat_at)));
    res.json(r2);
});

router.put('/home', async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const sql03 =
    'UPDATE company SET farm_type=?, farm_name=?,farm_tax_id=?, company_name=?, company_id_number=?, company_phone=?, farm_tel=?, farm_fax=?, farm_address=?, company_email=?, company_password=? WHERE company.company_id=?';


    const {
        farm_type,
        farm_name,
        farm_tax_id,
        company_name,
        company_id_number,
        company_phone,
        farm_tel,
        farm_fax,
        farm_address,
        company_email,
        company_password,
        company_id,
    } = req.body;

    const pass_hash = bcrypt.hashSync(`${company_password}`, 10);
    const [result] = await db.query(sql03, [
        farm_type,
        farm_name,
        farm_tax_id,
        company_name,
        company_id_number,
        company_phone,
        farm_tel,
        farm_fax,
        farm_address,
        company_email,
        pass_hash,
        company_id,
    ]);

    if (result.affectedRows === 1) {
        output.success = true;
    }

    res.json(output);
});

// router.get('/collections', async (req, res) => {
//     const sql04 = `SELECT * FROM customer_mycollections_product WHERE customer_id=? ORDER BY product_id DESC`;
//     const [r4] = await db.query(sql04, req.header('loginUser'));
//     res.json(r4);
// });

// router.delete('/deleteproduct', async (req, res) => {
//     const sql06 =
//         'DELETE FROM customer_mycollections_product WHERE customer_id=? AND product_id=?';
//     const [r6] = await db.query(sql06, [
//         req.header('customer_id'),
//         req.header('product_id'),
//     ]);
//     res.json(r6);
// });

// router.post('/profile', upload.single('file'), async (req, res) => {
//     const data = await res.json(req.file);
//     console.log(data);
// });

module.exports = router;
