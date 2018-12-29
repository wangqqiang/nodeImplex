const mongoose = require("mongoose");

class MDB {
  constructor() {
    this.user; //用户名
    this.pwd; //密码
    this.host; //主机，默认为127.0.0.1
    this.port; //端口，默认为27017
    this.dbName; //数据库
    this.url; //连接url，只提供了getter，不可写
    this.auth;
  }
  config(val) {
    let {
      user,
      pwd,
      dbName,
      host = '127.0.0.1',
      port = '27017',
      auth = false
    } = val;
    this.user = user ? user : '';
    this.pwd = pwd ? pwd : '';
    this.host = host;
    this.port = port;
    this.dbName = dbName;
    this.auth = auth;
  }
  get url() {
    let path;
    if (this.auth)
      path = `mongodb://${this.user}:${this.pwd}@${this.host}:${this.port}/${this.dbName}`;
    else {
      path = `mongodb://${this.host}:${this.port}/${this.dbName}`;
    }
    return path;
  }

  common() {
    let p = new Promise((resolve, reject) => {
      mongoose.connect(
        this.url,
        (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
    return p;
  }
  find(model, callback, conditions = {}) {
    this.common().then(function () {
      model.find(conditions).exec(callback);
    }).then(function (err) {
      console.log(err);
    })

  }
  findById(model, id, callback) {
    this.common().then(function () {
      model.findById(id).exec(callback);
    }).then(function (err) {
      console.log(err);
    })
  }
  findAndRemove(model, conditions, callback) {
    this.common().then(function () {
      model.findOneAndRemove(conditions).exec(callback);
    }).then(function (err) {
      console.log(err);
    })
  }
  findAndUpdate(model, conditions, update, callback) {
    this.common().then(function () {
      model.findOneAndUpdate(conditions, {
        $set: update
      }).exec(callback);
    }).then(function (err) {
      console.log(err);
    })
  }
  findByIdAndUpdate(model, id, update, callback) {
    this.common().then(function () {
      model.findByIdAndUpdate(id, {
        $set: update
      }).exec(callback);
    }).then(function (err) {
      console.log(err);
    });
  }
  findWhere(model, conditions, query, callback, sort = '', skip = 0, limit = 0) {
    this.common().then(function () {
      model.find(conditions, query).sort(sort).skip(skip).limit(limit).exec(callback);
    }).then(function (err) {
      console.log(err);
    })
  }
  findPopulate(model, joins, conditions, callback, sort = '', skip = 0, limit = 0) {
    this.common().then(function () {

      let tmp = model.find(conditions);
      joins.forEach(function (v, k) {
        tmp.populate({
          path: v
        });
      });
      tmp.sort(sort).skip(skip).limit(limit).exec(callback);

    }).then(function (err) {
      console.log(err);
    })
  }
  count(model, callback, conditions = {}) {
    this.common().then(function () {
      model.count(conditions).exec(callback);
    }).then(function (err) {
      console.log(err);
    });
  }
  distinct(model, field, callback) {
    this.common().then(function () {
      model.distinct(field).exec(callback);
    }).then(function (err) {
      console.log(err);
    });
  }
  insert(model, doc, callback) {
    this.common().then(function () {
      model.insertMany([doc], callback);
    }).then(function (err) {
      console.log(err);
    });
  }
  update(model, conditions, update, callback) {
    this.common().then(function () {
      model.updateMany(conditions, {
        $set: update
      }, callback);
    }).then(function (err) {
      console.log(err);
    });
  }
  delete(model, conditions, callback) {
    this.common().then(function () {
      model.deleteMany(conditions, callback);
    }).then(function (err) {
      console.log(err);
    });
  }
  // 关闭连接
  close() {
    mongoose.disconnect();
  }
}

module.exports = new MDB();