const path = require('path');

// MongoDB模型路径
const PATH_ROOT = __dirname;
const PATH_UPLOAD = path.join(PATH_ROOT, 'public/upload');
const PATH_MONGO = path.join(__dirname, 'Mongo');
const PATH_MONGO_MODEL = path.join(PATH_MONGO, 'model');
const PATH_MDB = path.join(PATH_MONGO, 'MDB')
const PATH_ABOUT = path.join(PATH_MONGO_MODEL, 'AboutModel')
const PATH_SERVICE = path.join(PATH_MONGO_MODEL, 'ServiceModel');
const PATH_ACCOUNT = path.join(PATH_MONGO_MODEL, 'AccountModel');
const PATH_KEHU = path.join(PATH_MONGO_MODEL, 'KehuModel')

module.exports = {
  PATH_ACCOUNT,
  PATH_ROOT,
  PATH_UPLOAD,
  PATH_MDB,
  PATH_ABOUT,
  PATH_SERVICE,
  PATH_KEHU
}