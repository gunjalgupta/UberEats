module.exports = app => {
    const fs = require('fs')
    const util = require('util')
    const unlinkFile = util.promisify(fs.unlink)
    const Dish = require('../models/dishes.js');

    const multer = require('multer')
    const upload = multer({ dest: 'uploads/' })

    const {uploadFile, getFileStream} = require('../controllers/s3.js')
    const { checkToken } = require('../middleware/auth.js')
    
    app.get('/key/:key', (req, res) => {
      console.log("++++++",req.params)
      const key = req.params.key
      const readStream = getFileStream(key)
    
      readStream.pipe(res)
    })
      
      app.post('/dish/images', upload.single('image'), async (req, res) => {
        const file = req.file
        console.log("++++++",file)
        console.log("Here inside routes")
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        console.log(result)
        const key = result.Key
        const dishId = req.body.dishId
        console.log("key dishId", dishId,key)
        Dish.addpicture(req.body.dishId, result.Key, (err,data) => {
          if(err) {
            res.status(500).send({
              message : err.message
            })
          }
          else {
            console.log("----",data)
            res.json({
              message: "Image uploaded"
            })
          }
        })
      }) 
};