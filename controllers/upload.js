const multer = require('multer');

const memStorage = multer.memoryStorage();
const upload_mem = multer({storage: memStorage});


exports.upload_mem = upload_mem;
