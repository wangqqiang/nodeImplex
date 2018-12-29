const express = require('express')
const router = express.Router()
const dPath = require('../../mongoPath')
const Db = require(dPath.PATH_MDB)
const path = require('path')
const upload = require('./upload')
const UserModel = require(dPath.PATH_USER)
var moment = require('moment');

Db.config({
  dbName: 'implex'
});


router.get('/list', (req, res, next) => {

  // 获取请求的页码，默认为0
  let skip = req.query.page ? req.query.page : 0
  // 记录当前页是第几页
  res.locals.skip = skip
  skip *= 3
  let limit = 3

  Db.findWhere(
    UserModel, {}, {},
    function (derr, dres) {
      if (derr) {
        next(createError(500, '服务器开小差了...'))
      } else {
        Db.count(UserModel, function (cerr, cres) {
          res.render('user_list', {
            users: dres, //分页数据
            userCount: Math.ceil(Number.parseInt(cres) / limit), //查询总数量
            currPage: Number.parseInt(res.locals.skip) //当前页
          })
        })
      }
    },
    '',
    Number.parseInt(skip),
    Number.parseInt(limit)
  )
})
router.get('/item/:id?', (req, res) => {
  // 编辑
  if (req.params.id) {
    Db.findById(UserModel, req.params.id, function (derr, dres) {
      res.render('user_item', {
        dres
      });
    })
  } else {
    res.render('user_item', {
      dres: {
        _id: '',
        username: '',
        pwd: '',
        avatar: '',
        sex: '男',
        city: '',
        birthday: moment(Date.now()).format('YYYY-MM-DD'),
        brief: '',
        phone: '',
      }
    });
  }
})
// flag用来判断是新增还是修改，如果是修改flag=1，如果是新增flag=undefined
router.post('/item/:flag?', upload.single('myfile'), (req, res) => {
  // 编辑
  if (req.params.flag) {
    // 有文件的修改
    if (req.file) {
      Db.update(UserModel, {
        _id: req.body.uid
      }, {
        username: req.body.username,
        pwd: req.body.pwd,
        sex: req.body.sex,
        city: req.body.city,
        birthday: req.body.birthday,
        phone: req.body.phone,
        brief: req.body.brief,
        avatar: '/upload/' + req.file.filename,
      }, function (derr, dres) {
        if (derr) {
          res.send({
            code: 202,
            msg: derr.message
          });
        } else {
          res.send({
            code: 200,
            msg: '上传成功'
          });
        }
      })
    } else {
      // 没文件的修改
      Db.update(UserModel, {
        _id: req.body.uid
      }, {
        username: req.body.username,
        pwd: req.body.pwd,
        sex: req.body.sex,
        city: req.body.city,
        birthday: req.body.birthday,
        phone: req.body.phone,
        brief: req.body.brief,
      }, function (derr, dres) {
        if (derr) {
          res.send({
            code: 201,
            msg: derr.message
          });
        } else {
          res.send({
            code: 200,
            msg: '修改成功'
          });
        }
      })
    }
  } else {
    // 新增
    if (req.file) {

      Db.insert(UserModel, {
        username: req.body.username,
        pwd: req.body.pwd,
        sex: req.body.sex,
        city: req.body.city,
        birthday: req.body.birthday,
        phone: req.body.phone,
        brief: req.body.brief,
        avatar: '/upload/' + req.file.filename,
      }, function (derr, dres) {
        if (derr) {
          res.send({
            code: 202,
            msg: derr.message
          });
        } else {
          res.send({
            code: 200,
            msg: '上传成功'
          });
        }
      })
    } else {
      Db.insert(UserModel, {
        username: req.body.username,
        pwd: req.body.pwd,
        sex: req.body.sex,
        city: req.body.city,
        birthday: req.body.birthday,
        phone: req.body.phone,
        brief: req.body.brief,
      }, function (derr, dres) {
        if (derr) {
          res.send({
            code: 202,
            msg: derr.message
          });
        } else {
          res.send({
            code: 200,
            msg: '上传成功'
          });
        }
      })
    }
  }
})
router.post('/deleteItem', (req, res) => {
  Db.delete(
    UserModel, {
      _id: req.body.uid
    },
    function (derr, dres) {
      if (derr) {
        next(createError(500, '服务器开小差了...'))
      } else {
        res.send({
          code: 200,
          msg: '删除成功'
        })
      }
    }
  )
})

module.exports = router

/*
  user.js 和 user_item.html 存在字段对应关系
  userSchema.js -> req.body -> formData -> form（表单）
*/