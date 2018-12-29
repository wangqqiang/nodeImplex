const Db = require('./MDB');
const ClassifyModel = require('./model/ClassifyModel');
const ImageModel = require('./model/ImageModel');
const UserModel = require('./model/UserModel');

Db.config({
  dbName: 'mongo',
});
// Db.insert(ClassifyModel, {
//   cname: '美食',
//   imageUrl: 'img/3.jpg',
//   brief: '我爱下厨房',
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// })

// Db.insert(UserModel, {
//   username: 'admin',
//   pwd: 'admin',
//   avatar: 'img/1.jpg',
//   sex: '男',
//   city: '北京',
//   birthday: Date.now(),
//   brief: '管理员',
//   phone: '17731148314'


// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// })

// Db.insert(ImageModel, {
//   uid: '5c0f626384af5904c61ea3ae',
//   cid: '5c0f60ed274a2c0482c88f8c',
//   imageUrl: 'img/2.jpg',
//   brief: '美食总是让人喜欢',
//   title: '精彩的布丁梅派'
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// })

// Db.find(ImageModel, function (err, res) {
//   console.log(res);
// })

Db.findPopulate(ImageModel, ['uid', 'cid'], {}, function (err, res) {
  console.log(err);
  console.log(res);
})