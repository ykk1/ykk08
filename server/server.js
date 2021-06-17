const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const { RSA_PKCS1_OAEP_PADDING } = require("constants");
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

const USERS = [
    { id: '01', userName: 'ykk', password: '150574' },
    { id: '02', userName: 'ycq', password: '136555' }
];

//验证登录
app.post('/ykk', function (req, resp) {
    console.log(req.body);
    var founded = false;
    for (let user of USERS) {
        if (user.userName === req.body.userName &&
            user.password === req.body.password) {
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有用户！' });
    }
    resp.end();

});

app.post('/user', function (req, resp) {
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end;
});

//修改用户
app.put('/user', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName === req.body.userName;
            user.password === req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有用户！' });
    }
    resp.end();
});

//删除用户
app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();

});
app.get('/users', function (req, resp) {
    console.log(USERS);
    resp.send(USERS);
    resp.end();
});

app.get('/users/:id', (req, resp) => {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});



const PRODUCTS = [
    { id: '01', Name: '西瓜', price: '30' },
    { id: '02', Name: '菠萝', price: '50' }
];

//验证登录
app.post('/product', function (req, resp) {
    console.log(req.body);
    var founded = false;
    for (let product of PRODUCTS) {
        if (product.Name === req.body.Name &&
            product.price === req.body.price) {
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有产品！' });
    }
    resp.end();

});

app.post('/product', function (req, resp) {
    PRODUCTS.push(req.body);
    resp.send({ succ: true });
    resp.end;
});

//修改产品
app.put('/product', function (req, resp) {
    let founded = false;
    for (let product of PRODUCTS) {
        if (product.id === req.body.id) {
            product.Name === req.body.Name;
            product.price === req.body.price;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有产品！' });
    }
    resp.end();
});

//删除产品
app.delete('/products/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let product of PRODUCTS) {
        if (product.id === req.params.id) {
            PRODUCTS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到产品！' });
    }
    resp.end();

});
app.get('/products', function (req, resp) {
    console.log(PRODUCTS);
    resp.send(PRODUCTS);
    resp.end();
});

app.get('/products/:id', (req, resp) => {
    console.log(req.params);
    const id = req.params.id;
    for (let product of PRODUCTS) {
        if (product.id === id) {
            resp.send([product]);
            break;
        }
    }
    resp.end();
});

//端口
app.listen(8080, function () {
    console.log('服务器在8080端口启动!');
});