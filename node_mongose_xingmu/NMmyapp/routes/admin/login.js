const express = require('express');
const router = express.Router();
const dPath = require('../../mongoPath')
const Db = require(dPath.PATH_MDB)
const AccountModel = require(dPath.PATH_ACCOUNT)

Db.config({
  dbName: 'implex'
});


router.get('/', (req, res) => {
  req.session.token = null;
  res.cookie('token', '', {
    maxAge: -1000 * 60 * 100
  });
  res.render('login');
});

router.post('/', (req, res) => {
  // console.log(req.body)
  Db.find(AccountModel, function (aerr, ares) {
    if (aerr) {
      res.send({
        code: 201,
        msg: '数据库操作失败'
      });
    } else if (ares.length == 0) {
      res.send({
        code: 202,
        msg: '用户名或密码错误'
      });
    } else {
      res.cookie('token', ares[0]._id, {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,
        signed: true
      });
      res.send({
        code: 200,
        msg: '登录成功'
      });
    }
  }, {
    user: req.body.user,
    pwd: req.body.pwd
  })
  // res.render('login');
});

module.exports = router;