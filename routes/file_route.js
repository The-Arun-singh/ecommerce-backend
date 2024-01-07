import express from 'express';
import multer from 'multer';

// all the route end points for the file upload and downloads

const fileRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === "image/jpg") {
            cb(null, true);
        } else {
            cb(null, flase);
            return res.status(400).json({ error: "File types allowed are .jpeg, .png, .jpg" });
        }
    }
})

const downloadFile = (req, res) => {
    const fileName = req.params.filename;
    const path = __basedir + "/uploads/";

    res.download(path + fileName, (err) => {
        if (err) return res.status(500).json({ error: "file cannot be downloaded " + err });
    })
}

fileRouter.post("/uploadfile", upload.single('file'), function (req, res) {
    try {
        res.json({ "fileName": req.file.filename });
    } catch (error) {
        console.log(error);
    }
})

fileRouter.get("/files/:filename", downloadFile)

export default fileRouter;