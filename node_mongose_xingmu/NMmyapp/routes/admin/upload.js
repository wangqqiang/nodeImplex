const dPath = require('../../mongoPath')
const fs = require('fs')
const path = require('path')
var multer = require('multer')

let upPath = dPath.PATH_UPLOAD;
if (!fs.existsSync(upPath)) {
  fs.mkdirSync(upPath);
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, upPath)
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});

function fileFilter(req, file, cb) {
  let ext = path.extname(file.originalname);
  if ((ext == '.jpg' && file.mimetype == 'image/jpg') || (ext == '.png' && file.mimetype == 'image/png') || (ext == '.gif' && file.mimetype == 'image/gif') ||
    (ext == '.jpeg' && file.mimetype == 'image/jpeg') || (ext == '.jpg' && file.mimetype == 'image/jpeg')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 204800
  }
})

module.exports = upload