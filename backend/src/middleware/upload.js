// const multer = require('multer');

// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb('Please upload only images.', false);
//   }
// };

// var storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, `${__basedir  }/resources/static/assets/uploads/`);
//   },
//   filename: (_req, file, cb) => {
//     cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
//   },
// });

// var uploadFile = multer({ storage, fileFilter: imageFilter });
// module.exports = uploadFile;
