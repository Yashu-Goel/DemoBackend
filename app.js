const express = require('express')
const app = express()
const port = 5000
const multer = require("multer");
const path = require("path");
const Schema = require("./Schema")
const cors = require("cors");
require("./db.js");
app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  const absolutePath = path.join(__dirname, "../client/public/uploads");
  console.log(absolutePath);
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });


app.post("/images", upload.array("productImages", 5), async(req, res)=>{
      const productImages = req.files.map((file) => file.path);
      console.log('okok');
      console.log(productImages);
    try {
        const images= Schema.create({
            pics: productImages
        })
        if(images)
        {
            res.status(200).json({
                message: "Success"
            })
        }
    } catch (error) {
        res.status(400).json("Fail")
    }

});
app.get("/images", async (req, res) => {
  try {
    console.log('OKOK');
    const images = await Schema.find();
    res.status(200).json(images);
    console.log(images);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})