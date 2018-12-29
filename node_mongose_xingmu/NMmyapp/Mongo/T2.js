const Db = require('./MDB');
const AboutModel = require('./model/AboutModel');
const ImageModel = require('./model/ImageModel');
const UserModel = require('./model/UserModel');
const CollectionModel = require('./model/CollectionModel');
const AccountModel = require('./model/AccountModel');
const CommentModel = require('./model/CommentModel');

Db.config({
  dbName: 'implex',
});
// Db.insert(ClassifyModel, {
//   cname: '汽车',
//   imageUrl: 'img/1.jpg',
//   brief: '要什么自行车'
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// });

// Db.insert(ClassifyModel, {
//   cname: '水果',
//   imageUrl: 'img/2.jpg',
//   brief: '可爱的水果'
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// });

// Db.insert(UserModel, {
//   username: 'bj',
//   pwd: 'admin123',
//   avatar: 'img/header.png',
//   sex: '男',
//   city: '北京',
//   birthday: '2018-12-18',
//   brief: '北京老胡同',
//   phone: '17731148314'
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// });


// Db.insert(ImageModel, {
//   uid: '5c16f67a510f94195849bd92',
//   cid: '5c137051b378662c941aa4be',
//   datetime: new Date(),
//   imageUrl: 'img/a.jpg',
//   look: 10,
//   like: 5,
//   brief: '广州',
//   title: '呵呵哒'
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// });

// 修改
// Db.update(ImageModel, {
// }, {
//   uid: "5c16f67a510f94195849bd92",
//   cid: "5c135421cf7bfd2bc07dc266"
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// });

// 添加账号
// Db.insert(AccountModel, {
//   user: '王强',
//   pwd: '123456789'
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// });


// Db.insert(CommentModel, {
//   uid: "5c19f69180bbdf1498fe37c0",
//   iid: "5c19fafb56780c2bb02a1da9",
//   comment: '222222',
//   datetime: new Date
// }, function (err, res) {
//   console.log(err);
//   console.log(res);
// });



// Db.find(AboutModel, {}, function (err, res) {
//   console.log(err);
//   console.log(res);
// });


// Db.find(UserModel, function (err, res) {
//   console.log(err);
//   console.log(res);
// });

// Db.findPopulate(ImageModel, ['uid', 'cid'], {}, function (err, res) {
//   console.log(err);
//   console.log(res);
// });

// npm install mongoose -g
// npm link mongoose