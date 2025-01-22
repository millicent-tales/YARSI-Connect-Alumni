const multer = require("multer");
const path = require("path");

const FILE_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidFormat = FILE_TYPE[file.mimetype];
    let uploadError = new Error("Invalid Image Type");

    if (isValidFormat) {
      uploadError = null;
    }

    let folder = "";

    // Sesuaikan dengan struktur folder yang ada
    if (req.originalUrl.startsWith("/api/v1/event")) {
      folder = "../uploads/public/events";
    } else if (req.originalUrl.startsWith("/api/v1/news")) {
      folder = "../uploads/public/news";
    } else if (req.originalUrl.startsWith("/api/v1/alumni-program")) {
      folder = "../uploads/public/alumni-programs";
    } else if (req.originalUrl.startsWith("/api/v1/profile")) {
      folder = "../uploads/private/profiles";
    } else {
      return cb(new Error("Invalid category"), false);
    }

    // Gunakan path.join untuk membuat path absolut
    const absolutePath = path.join(__dirname, folder);

    // Create directory if it doesn't exist
    const fs = require("fs");
    fs.mkdirSync(absolutePath, { recursive: true });

    cb(uploadError, absolutePath);
  },
  filename: function (req, file, cb) {
    const extension = FILE_TYPE[file.mimetype];
    const uniqueFileImage = `${file.fieldname}-${Date.now()}.${extension}`;

    cb(null, uniqueFileImage);
  },
});

exports.uploadOption = multer({ storage: storageFile });
