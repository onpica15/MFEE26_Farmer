const express = require('express');
const app = express();
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer(app);
const LinePay = require('line-pay-v3');
const { v4: uuidv4 } = require('uuid');
const { setupWorker } = require('@socket.io/sticky');
const {
    saveSession,
    findSession,
    findAllSessions,
} = require('./src/xin/sessionStorage');

const {
    findMessagesForUser,
    saveMessage,
} = require('./src/xin/messageStorage');
const fileUpload = require('express-fileupload');
const { nanoid } = require('nanoid');
const _ = require('lodash');
const sche = require('./schedule');
const session = require('express-session');
const db = require(__dirname + '/modules/mysql-connect');

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});




app.use((req, res, next) => {
    res.locals.session = req.session; //每個頁面都可以傳session過去

    const auth = req.get('Authorization');
    res.locals.loginUser = null;
    if (auth && auth.indexOf('Bearer ') === 0) {
        const token = auth.slice(7);
        res.locals.loginUser = jwt.verify(token, process.env.JWT_SECRET);
    }
    next();
});

const corsOptions = {
    credentials: true,
    withCredentials: true,
    origin: (origin, cb) => {
        console.log({ origin });
        cb(null, true);
    },
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/product', require(__dirname + '/routes/product'));
app.use('/cart', require(__dirname + '/routes/cartList'));
app.use('/member', require(__dirname + '/routes/member'));
app.use('/game', require(__dirname + '/routes/game'));
app.use('/cartemail', require(__dirname + '/routes/cartemail'));
app.use('/comment', require(__dirname + '/routes/comment'));
app.use('/recipe', require(__dirname + '/routes/recipe'));
app.use('/company', require(__dirname + '/routes/company'));
app.use('/activity', require(__dirname + '/routes/activity'));
app.use('/product_collect', require(__dirname + '/routes/product_collect'));

//---- 上傳照片
app.use('/uploads', express.static('uploads'));
app.post(
    '/upload-images',
    fileUpload({
        createParentPath: true,
        limits: { fileSize: 50 * 1024 * 1024 },
    }),
    async (req, res) => {
        try {
            if (!req.files) {
                res.json({
                    status: false,
                    message: 'No file uploaded',
                });
            } else {
                let data = [];
                const extMap = {
                    'image/jpeg': '.jpg',
                    'image/png': '.png',
                    'image/gif': '.gif',
                };

                //loop all files
                _.forEach(req.files, (image) => {
                    const newName = `${nanoid(10)}${extMap[image.mimetype]}`;
                    image.name = newName;

                    //move photo to images directory
                    image.mv('./public/images/' + image.name);
                    //push file details
                    data.push({
                        name: image.name,
                        mimetype: image.mimetype,
                        size: image.size,
                    });
                });

                //return response
                res.json({
                    status: true,
                    message: 'Files are uploaded',
                    data: data,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
);
//--------

app.use('/customized_lunch', require(__dirname + '/routes/customized_lunch'));

app.use(express.static('public'));

//linePay
let linePay = new LinePay({
    channelId: 1657216441,
    channelSecret: '407efe35caedc7c572db5306540986bf',
    uri: 'https://sandbox-api-pay.line.me',
});

app.post('/linepay', async (req, mainResp) => {
    // console.log(req.body);
    linePay
        .request(req.body)
        .then((res) => {
            console.log(res);
            const lineOutput = {
                redirectURL: res.info.paymentUrl.web,
                transitionID: JSON.stringify(res.info.transactionId),
            };
            return lineOutput;
        })
        .then((obj) => {
            mainResp.send(JSON.stringify(obj));
            console.log(obj);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/linepay-check', async (req, successResp) => {
    // console.log("req.body:" + req.body.transitionID);

    //const result = await check(req.body.transitionID);

    const confirm = {
        amount: req.body.amount,
        currency: 'TWD',
    };

    linePay
        .confirm(confirm, req.body.transitionID)
        .then((res) => {
            successResp.send(JSON.stringify(res));
        })
        .catch((err) => {
            console.log(err);
        });
});
//linePay

// app.listen(process.env.PORT, () => {
//     console.log(`server started: ${process.env.PORT}`);
//     console.log({ NODE_ENV: process.env.NODE_ENV });
// });

// -------------阿鑫聊天室node-------------

io.use((socket, next) => {
    // 檢查session是否存在
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
        const session = findSession(sessionId);
        if (session) {
            socket.sessionId = sessionId;
            socket.userId = session.userId;
            socket.username = session.username;
            return next();
        } else {
            return next(new Error('Invalid session'));
        }
    }

    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error('Invalid username'));
    }
    socket.username = username;
    socket.userId = uuidv4();
    socket.sessionId = uuidv4();
    next();
});
// 存訊息
function getMessagesForUser(userId) {
    const messagesPerUser = new Map();
    findMessagesForUser(userId).forEach((message) => {
        const { from, to } = message;
        const otherUser = userId === from ? to : from;
        if (messagesPerUser.has(otherUser)) {
            messagesPerUser.get(otherUser).push(message);
        } else {
            messagesPerUser.set(otherUser, [message]);
        }
    });
    return messagesPerUser;
}

io.on('connection', async (socket) => {
    saveSession(socket.sessionId, {
        userId: socket.userId,
        username: socket.username,
        connected: true,
    });

    socket.join(socket.userId);

    //get all connected users
    //取得所有已連線的使用者
    const users = [];
    const userMessages = getMessagesForUser(socket.userId);
    findAllSessions().forEach((session) => {
        if (session.userId !== socket.userId) {
            users.push({
                userId: session.userId,
                username: session.username,
                connected: session.connected,
                messages: userMessages.get(session.userId) || [],
            });
        }
    });

    //all users event
    socket.emit('users', users);

    // connected user details event
    socket.emit('session', {
        sessionId: socket.sessionId,
        userId: socket.userId,
        username: socket.username,
    });
    // new user event
    socket.broadcast.emit('user connected', {
        userId: socket.userId,
        username: socket.username,
    });
    //私訊event
    socket.on('private message', ({ content, to,}) => {
        const message = {
            from: socket.userId,
            to,
            content,
        };
        socket.to(to).emit('private message', message);
        saveMessage(message);
    });

    socket.on('image message', ({ content, to }) => {
        const message = {
            from: socket.userId,
            to,
            content,
        };
        socket.to(to).emit('image message', message);
        // saveMessage(message);
    });

    socket.on('user messages', ({ userId, username }) => {
        const userMessages = getMessagesForUser(socket.userId);
        socket.emit('user messages', {
            userId,
            username,
            messages: userMessages.get(userId) || [],
        });
    });

    

    socket.on('disconnect', async () => {
        const matchingSockets = await io.in(socket.userId).allSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
            // 通知其他用戶
            socket.broadcast.emit('user disconnected', {
                userId: socket.userId,
                username: socket.username,
            });
            // 更新session的連接狀態
            saveSession(socket.sessionId, {
                userId: socket.userId,
                username: socket.username,
                connected: socket.connected,
            });
        }
    });
});

console.log('Listening to port...');
httpServer.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});

function start() {
    setupWorker(io);
}

module.exports = { start };
// -------------阿鑫聊天室node-------------

//------商品比較

app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1500000,
            httpOnly: true,
        },
    })
);
app.get('/compare-session', (req, res) => {
    req.session.my_compare = _.filter(
        req.session.my_compare,
        (el) => !_.isNil(el)
    );
    res.json(req.session.my_compare);
});
app.put('/compare-session', (req, res) => {
    // console.log(req.session.my_compare, req.sessionID);
    const list = req.session.my_compare || [];
    list.push(req.body.sid);
    req.session.my_compare = list.filter((el) => !_.isNil(el));
    res.json(list);
});
app.delete('/compare-session', (req, res) => {
    const list = req.session.my_compare || [];
    const sid = req.body.sid;
    const newList = list.filter((el) => el !== sid);
    req.session.my_compare = newList;
    // console.log(req.session.my_compare);

    res.json(newList);
});

