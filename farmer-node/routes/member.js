require('dotenv').config();

const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');
const bcrypt = require('bcryptjs');
const todateString = require(__dirname + '/../modules/date_format');
const upload = require(__dirname + '/../modules/upload_img');
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');

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
    console.log(r);
    const [r2] = await db.query(sqlcus, [member_id]);
    console.log(r2);
    return [...r, ...r2];
};

router.route('/login').post(async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const sql04 = 'SELECT * FROM customer_data WHERE email=?';
    const [r1] = await db.query(sql04, [req.body.email]);

    if (!r1.length) {
        output.code = 401;
        output.error = '帳號錯誤';
        return res.json(output);
    }

    output.success = await bcrypt.compare(req.body.password, r1[0].password);
    console.log(r1[0].password);
    if (!output.success) {
        output.code = 402;
        output.error = '密碼錯誤';
    } else {
        const token = jwt.sign(
            {
                customer_id: r1[0].customer_id,
                email: r1[0].email,
                username: r1[0].name,
            },
            process.env.JWT_SECRET
        );

        output.data = {
            token,
            customer_id: r1[0].customer_id,
            username: r1[0].name,
            email: r1[0].email,
            mobile: r1[0].mobile,
            birthday: r1[0].birthday,
            password: r1[0].password,
            address: r1[0].address,
        };
        output.cart = await getUserCart(r1[0].customer_id);
    }

    res.json(await output);
});

router.post('/signup', async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const RandomNumber =
        Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    const sql01 =
        'INSERT INTO `customer_data`(`name`, `email`, `password`, `verify_number`,`creat_at`) VALUES (?,?,?,?,NOW())';
    const { username, email, password } = req.body;
    const pass_hash = bcrypt.hashSync(`${password}`, 10);
    const [result] = await db.query(sql01, [
        username,
        email,
        pass_hash,
        RandomNumber,
    ]);

    if (result.affectedRows === 1) {
        output.success = true;
        console.log(result);
    }

    let transporter = nodemailer.createTransport({
        service: 'Gmail', // 使用了內建傳輸傳送郵件 檢視支援列表：https://nodemailer.com/smtp/well-known/
        //   port: 465, // SMTP 埠
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'mfee26farmer@gmail.com',
            pass: 'tgqmecsedfnjqkwz', //授權碼，並非QQ密碼
        },
    });
    let mailOptions = {
        from: '"有機の小鱻肉" <mfee26farmer@gmail.com>', // 傳送地址
        to: `${email}`, // 接收列表（可多個）
        subject: '【有機の小鱻肉】會員註冊信箱驗證', // 主題
        // 傳送text或者html格式（任選一個）
        html: `<body>
        <img style="width:300px" src="https://www.upload.ee/image/14320633/C_LOGO-1.jpg" border="0" alt="C_LOGO-1.jpg" />
        <h1>有機の小鱻肉</h1>
        <div>親愛的 ${username} 會員您好</div>
        <div>請輸入下方驗證碼即可完成信箱驗證</div>
        <br>
        <h2>驗證碼【${RandomNumber}】</h2>
        </body>`, // plain text body
        //html:  fs.createReadStream(path.resolve(__dirname,'index.html'))
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        const ans = JSON.stringify(info);
        res.send(ans);
    });

    res.json(output);
});

router.put('/verifyresend', async (req, res) => {
    const output = {
        send: false,
        error: '',
        code: 0,
    };

    const RandomNumber =
        Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    const sql25 =
        'UPDATE customer_data SET verify_number=? WHERE customer_data.email="mfee26farmer@gmail.com"';
    const [r25] = await db.query(sql25, [RandomNumber]);

    if (r25.affectedRows === 1) {
        console.log(r25);
    }

    let transporter = nodemailer.createTransport({
        service: 'Yahoo', // 使用了內建傳輸傳送郵件 檢視支援列表：https://nodemailer.com/smtp/well-known/
        //   port: 465, // SMTP 埠
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'bob19901224@yahoo.com.tw',
            pass: 'exaeouulngdztqhu', //授權碼，並非QQ密碼
        },
    });
    let mailOptions = {
        from: '"有機の小鱻肉" <bob19901224@yahoo.com.tw>', // 傳送地址
        to: `mfee26farmer@gmail.com, bob19901224@yahoo.com.tw`, // 接收列表（可多個）
        subject: '【有機の小鱻肉】會員註冊信箱驗證', // 主題
        // 傳送text或者html格式（任選一個）
        html: `<body>
        <img style="width:300px" src="https://www.upload.ee/image/14320633/C_LOGO-1.jpg" border="0" alt="C_LOGO-1.jpg" />
        <h1>有機の小鱻肉</h1>
        <div>親愛的 farmer 會員您好</div>
        <div>請輸入下方驗證碼即可完成信箱驗證</div>
        <br>
        <h2>驗證碼【${RandomNumber}】</h2>
        </body>`, // plain text body
        //html:  fs.createReadStream(path.resolve(__dirname,'index.html'))
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        const ans = JSON.stringify(info);
        res.send(ans);
    });
    output.send = true;
    res.json(output);
});

router.get('/data', async (req, res) => {
    const sql02 = 'SELECT * FROM customer_data WHERE customer_id=?';
    const [r2] = await db.query(sql02, req.header('loginUser'));
    r2.forEach((el) => (el.birthday = todateString(el.birthday)));
    res.json(r2);
});

router.put('/data', async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const sql03 =
        'UPDATE customer_data SET name=?, mobile=?, email=?, birthday=?, address=?, account=?,password=? WHERE customer_data.customer_id=?';

    const {
        name,
        mobile,
        email,
        birthday,
        address,
        account,
        password,
        customer_id,
    } = req.body;
    const pass_hash = bcrypt.hashSync(`${password}`, 10);
    const [result] = await db.query(sql03, [
        name,
        mobile,
        email,
        birthday,
        address,
        account,
        pass_hash,
        customer_id,
    ]);

    if (result.affectedRows === 1) {
        output.success = true;
    }

    res.json(output);
});

router.get('/collections', async (req, res) => {
    const sql04 = `SELECT pcol.*, pro.* 
    FROM product_collect pcol
    JOIN product pro
    JOIN product_type ptyp
    ON ptyp.product_type_sid=pro.product_type
    WHERE pcol.product_id=pro.sid && pcol.member_id=?
    ORDER BY pcol.product_id`;

    const [r4] = await db.query(sql04, req.header('loginUser'));
    res.json(r4);
});

router.get('/myrecipes', async (req, res) => {
    const sql22 = `SELECT rcol.*, reci.* 
    FROM recipe_collectionlist rcol
    JOIN recipe reci
    ON rcol.recipes_sid=reci.recipes_sid
    WHERE rcol.customer_id=?
    ORDER BY rcol.recipes_sid`;

    const [r22] = await db.query(sql22, req.header('loginUser'));
    res.json(r22);
});

router.put('/deleteproduct', async (req, res) => {
    const sql06 =
        'UPDATE product_collect SET saved=0 WHERE product_collect.member_id=? && product_id=?';
    const [r6] = await db.query(sql06, [
        req.header('member_id'),
        req.header('product_id'),
    ]);
    res.json(r6);
});

router.delete('/deleterecipes', async (req, res) => {
    const sql23 =
        'DELETE FROM recipe_collectionlist WHERE customer_id=? AND recipes_sid=?';
    const [r23] = await db.query(sql23, [
        req.header('customer_id'),
        req.header('recipes_sid'),
    ]);
    res.json(r23);
});

router.post('/profile', upload.single('file'), async (req, res) => {
    const customer_id = req.header('customer_id');
    const sql11 =
        'UPDATE customer_data SET profile_img=? WHERE customer_data.customer_id=?';
    const data = await res.json(req.body);
    const [r11] = await db.query(sql11, [
        data.req.file.originalname,
        customer_id,
    ]);
    console.log(r11);
});

router.get('/getintro', async (req, res) => {
    const sql10 =
        'SELECT nickname, intro, profile_img FROM customer_data WHERE customer_id=?';
    const [r10] = await db.query(sql10, req.header('loginUser'));
    res.json(r10);
});

router.post('/editintro', async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const { nickname, intro, customer_id } = req.body;

    const sql09 =
        'UPDATE customer_data SET nickname=?, intro=? WHERE customer_data.customer_id=?';
    const [r9] = await db.query(sql09, [nickname, intro, customer_id]);

    if (r9.affectedRows === 1) {
        output.success = true;
    }

    res.json([r9]);
});

router.get('/postrecipe', async (req, res) => {
    const sql21 = 'SELECT * FROM recipe WHERE customer_id=?';
    const [r21] = await db.query(sql21, req.header('loginUser'));
    res.json(r21);
});

router.get('/orders', async (req, res) => {
    const sql12 = `SELECT odt.*, odl.*, pro.* 
    FROM order_details odt 
    JOIN orderlist odl
    JOIN product pro
    ON odt.product_id=pro.sid
    WHERE odt.order_no=odl.order_no && odl.customer_id=? && odt.order_type=1
    ORDER BY odt.created_time DESC`;

    const sql13 = `SELECT odt.*, odl.*, cust.* 
    FROM order_details odt
    JOIN orderlist odl 
    JOIN customized_lunch cust
    ON odt.customized_id=cust.sid
    WHERE odt.order_no=odl.order_no && cust.member_id=? && odt.order_type=2
    ORDER BY odt.created_time DESC`;

    const [r12] = await db.query(sql12, req.header('loginUser'));
    const [r13] = await db.query(sql13, req.header('loginUser'));
    res.json([...r12, ...r13]);
});

router.get('/orderlist', async (req, res) => {
    const sql13 = `SELECT * FROM orderlist WHERE customer_id=? ORDER BY created_time DESC`;
    const [r13] = await db.query(sql13, req.header('loginUser'));
    r13.forEach((el) => (el.created_time = todateString(el.created_time)));
    res.json(r13);
});

router.get('/coupons', async (req, res) => {
    const sql16 = 'SELECT * FROM coupon_01 WHERE change_memberid=?';
    const [r16] = await db.query(sql16, req.header('loginUser'));
    r16.forEach((el) => (el.change_time = todateString(el.change_time)));
    res.json(r16);
});

router.get('/purchaseRecord', async (req, res) => {
    const sql17 =
        'SELECT product_amount_total FROM orderlist WHERE customer_id=?';
    const [r17] = await db.query(sql17, req.header('loginUser'));
    res.json(r17);
});

router.get('/myPoints', async (req, res) => {
    const sql18 = 'SELECT daily_points FROM customer_data WHERE customer_id=?';
    const [r18] = await db.query(sql18, req.header('loginUser'));
    res.json(r18);
});

router.get('/myevents', async (req, res) => {
    const sql23 = `SELECT aliked.*, activ.* 
    FROM activity_isliked aliked
    JOIN company_activitydata activ
    ON aliked.activity_sid=activ.sid
    WHERE aliked.customer_id=?
    ORDER BY aliked.activity_sid`;

    const [r23] = await db.query(sql23, req.header('loginUser'));
    res.json(r23);
});

router.post('/verify', async (req, res) => {
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const sql19 = 'SELECT * FROM customer_data WHERE verify_number=?';
    const [r19] = await db.query(sql19, [req.body.checkNumber]);

    if (!r19.length) {
        output.code = 401;
        output.error = '帳號錯誤';
        return res.json(output);
    } else {
        const token = jwt.sign(
            {
                customer_id: r19[0].customer_id,
                email: r19[0].email,
                username: r19[0].name,
            },
            process.env.JWT_SECRET
        );
        output.success = true;
        output.data = {
            token,
            customer_id: r19[0].customer_id,
            username: r19[0].name,
            email: r19[0].email,
        };
        output.cart = await getUserCart(r19[0].customer_id);
    }
    res.json(await output);
});

module.exports = router;
