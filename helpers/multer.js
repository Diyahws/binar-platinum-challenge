// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./uploads");
//   },
//   filename: function (req, file, callback) {
//     const myArray = file.originalname.split(".");
//     const ekstensi = myArray[myArray.length - 1];
//     callback(null, Date.now() + "." + ekstensi);
//   },
// });

// const uploadSingleImage = multer({
//   storage: storage,
//   fileFilter: function (req, file, callback) {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       return callback(null, true);
//     }
//     callback(null, false);
//     return callback(new Error("Only .png .jpg .jpeg format allowed"));
//   },
//   limits: {
//     // 8mb
//     fileSize: 8388608, //bytes
//   },
// });

// module.exports = {
//   uploadSingleImage,
// };
