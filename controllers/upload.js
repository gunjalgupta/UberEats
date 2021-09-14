// const fs = require('fs');

// const db = require('../models/image.model');

// const Image = db.images;

// // eslint-disable-next-line consistent-return
// const uploadFiles = async (req, res) => {
//   try {
//     console.log(req.file);

//     if (req.file === undefined) {
//       return res.send('You must select a file.');
//     }

//     Image.create({
//       type: req.file.mimetype,
//       name: req.file.originalname,
//       data: fs.readFileSync(
//         // eslint-disable-next-line no-undef
//         `${__basedir}/resources/static/assets/uploads/${req.file.filename}`,
//       ),
//     }).then((image) => {
//       fs.writeFileSync(
//         // eslint-disable-next-line no-undef
//         `${__basedir}/resources/static/assets/tmp/${image.name}`,
//         image.data,
//       );
//       return res.send('File has been uploaded.');
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload images: ${error}`);
//   }
// };

// module.exports = {
//   uploadFiles,
// };
