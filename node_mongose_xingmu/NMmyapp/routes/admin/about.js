const express = require('express')
const router = express.Router()
const dPath = require('../../mongoPath')
const Db = require(dPath.PATH_MDB)
const path = require('path')
const upload = require('./upload')
const AboutModel = require(dPath.PATH_ABOUT)

// dbname是你的数据库名
Db.config({
  dbName: 'implex'
})

router.get('/list', (req, res, next) => {
  // 获取请求的页码，默认为0
  let skip = req.query.page ? req.query.page : 0
  // 记录当前页是第几页
  res.locals.skip = skip
  skip *= 4
  let limit = 4

  Db.findWhere(
    AboutModel, {}, {},
    function (derr, dres) {
      if (derr) {
        next(createError(500, '服务器开小差了...'))
      } else {
        Db.count(AboutModel, function (cerr, cres) {

          res.render('about_list', {
            about: dres, //分页数据
            aboutCount: Math.ceil(Number.parseInt(cres) / limit), //查询总数量
            currPage: Number.parseInt(res.locals.skip) //当前页
          })

        })
      }
    },
    '',
    Number.parseInt(skip),
    Number.parseInt(limit)
  )
});
router.get('/item/:id?', (req, res) => {
  // 编辑
  if (req.params.id) {
    Db.findById(AboutModel, req.params.id, function (derr, dres) {
      res.render('about_item', {
        dres
      })
    })
  } else {
    res.render('about_item', {
      dres: {
        _id: '',
        cname: '',
        brief: '',
        imageUrl: ''
      }
    })
  }
})
// flag用来判断是新增还是修改，如果是修改flag=1，如果是新增flag=undefined
router.post('/item/:flag?', upload.single('myfile'), (req, res) => {
  // 编辑
  if (req.params.flag) {
    // 有文件的修改
    if (req.file) {
      Db.update(
        AboutModel, {
          _id: req.body.aboutId
        }, {
          cname: req.body.aboutName,
          brief: req.body.brief,
          imageUrl: '/upload/' + req.file.filename
        },
        function (derr, dres) {
          if (derr) {
            res.send({
              code: 202,
              msg: '修改数据库操作失败'
            })
          } else {
            res.send({
              code: 200,
              msg: '修改成功'
            })
          }
        }
      )
    } else {
      // 没文件的修改
      Db.update(
        AboutModel, {
          _id: req.body.aboutId
        }, {
          cname: req.body.aboutName,
          brief: req.body.brief
        },
        function (derr, dres) {
          if (derr) {
            res.send({
              code: 201,
              msg: '修改数据库操作失败'
            })
          } else {
            res.send({
              code: 200,
              msg: '修改成功'
            })
          }
        }
      )
    }
  } else {
    // 新增
    if (req.file) {
      Db.insert(
        AboutModel, {
          cname: req.body.aboutName,
          brief: req.body.brief,
          imageUrl: '/upload/' + req.file.filename
        },
        function (derr, dres) {
          console.log(derr)
          if (derr) {
            res.send({
              code: 202,
              msg: '新增数据库操作失败'
            })
          } else {
            res.send({
              code: 200,
              msg: '上传成功'
            })
          }
        }
      )
    } else {
      res.send({
        code: 201,
        msg: '文件上传失败'
      })
    }
  }
})
router.post('/deleteItem', (req, res) => {
  Db.delete(
    AboutModel, {
      _id: req.body.cid
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