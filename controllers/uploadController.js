const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    const myArray = file.originalname.split(".");
    const ekstensi = myArray[myArray.length - 1];
    callback(null, Date.now() + "." + ekstensi);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      return callback(null, true);
    }
    callback(null, false);
    return callback(new Error("only .png, .jpg, .jpeg format type allowed"));
  },
  limits: {
    // 8mb
    fileSize: 8388608, //bytes
  },
});

cloudinary.config({
  cloud_name: "duysasscj",
  api_key: "147916173229296",
  api_secret: "VfLk1TL4qra438tTd_m66Lfr3r4",
});

async function uploadCloudinary(filePath) {
  let result;
  try {
    result = await cloudinary.uploader.upload(filePath, {
      folder: "TEST PROJECT 1",
      use_filename: true,
    });
    fs.unlinkSync(filePath);
    return result.url;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
}

module.exports = {
  uploadSingle: async (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./uploads");
      },
      filename: function (req, file, callback) {
        const myArray = file.originalname.split(".");
        const ekstensi = myArray[myArray.length - 1];
        callback(null, Date.now() + "." + ekstensi);
      },
    });

    const upload = multer({
      storage: storage,
      fileFilter: function (req, file, callback) {
        if (
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg"
        ) {
          return callback(null, true);
        }
        callback(null, false);
        return callback(new Error("only png/jpg/jpeg format allowed"));
      },
      limits: {
        // 8mb
        fileSize: 8388608, //bytes
      },
    });

    cloudinary.config({
      cloud_name: "duysasscj",
      api_key: "147916173229296",
      api_secret: "VfLk1TL4qra438tTd_m66Lfr3r4",
    });

    async function uploadCloudinary(filePath) {
      let result;
      try {
        result = await cloudinary.uploader.upload(filePath, {
          folder: "TEST PROJECT 1",
          use_filename: true,
        });
        fs.unlinkSync(filePath);
        return result.url;
      } catch (error) {
        fs.unlinkSync(filePath);
        return null;
      }
    }

    const uploadSingleImage = upload.single("image");
    uploadSingleImage(req, res, async function (err) {
      if (err) {
        return res.json({ message: err.message });
      }
      const uploadImage = await uploadCloudinary(req.file.path);
      if (uploadImage) {
        return res.status(200).json({
          status: 200,
          message: "upload berhasil",
          url: uploadImage,
        });
      }
    });
  },
};
