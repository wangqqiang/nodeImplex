const express = require('express');
const router = express.Router();
const dPath = require('../../mongoPath');
const Db = require(dPath.PATH_MDB);
const path = require('path');
const AboutModel = require(dPath.PATH_ABOUT)
const ServiceModel = require(dPath.PATH_SERVICE)
const KehuModel = require(dPath.PATH_KEHU)

Db.config({
  dbName: 'implex'
});

// 大家正在关注
router.get('/', (req, res) => {
  Db.find(AboutModel, function (derr, dres) {

    Db.find(ServiceModel, function (serr, sres) {

      Db.find(KehuModel, function (kerr, kres) {
        res.render('home', {
          dres, //关于的数据
          sres, //服务的数据
          kres //客户端的数据
        });
      })

    })

  })

});

module.exports = router;