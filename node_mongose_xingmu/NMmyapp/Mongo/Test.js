const Db = require('./MDB');
const GoodsModel = require('./model/GoodsModel');

Db.config({
    user: 'myMongo',
    pwd: 'myMongo',
    dbName: 'mongo',
});

// Db.findWhere(GoodsModel, {
//     salePrice: {
//         $lt: 300
//     }
// }, ['productName', 'salePrice'], function (err, res) {
//     console.log(res);
// }, "-salePrice", 0, 3);

// Db.find(GoodsModel, function (err, res) {
//     console.log(res);
// });

// Db.findById(GoodsModel, '58e7053c98dab115d336b3f8', function (err, res) {
//     console.log(res);
// })

// Db.count(GoodsModel, function (err, res) {
//     console.log(res);
// })

// Db.distinct(GoodsModel, 'productName', function (err, res) {
//     console.log(res);
// })

// Db.findAndUpdate(GoodsModel, {
//     productId: '201810013'
// }, {
//     salePrice: 1610
// }, function (err, res) {
//     console.log(res);
// })

// Db.insert(GoodsModel, {
//     productId: '201810023',
//     productName: '绿萝',
//     salePrice: 3890,
//     productImage: 'photo.jpg',
// }, function (err, res) {
//     console.log(err);
//     console.log(res);
// })

// Db.update(GoodsModel, {
//     productId: '201810023'
// }, {
//     salePrice: 3880
// }, function (err, res) {
//     console.log(res);
// })

// Db.delete(GoodsModel, {
//     productId: '201810023'
// }, function (err, res) {
//     console.log(res);
// });