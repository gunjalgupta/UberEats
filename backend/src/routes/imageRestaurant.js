module.exports = app => {
    const fs = require('fs')
    const util = require('util')
    const unlinkFile = util.promisify(fs.unlink)
    const Restaurant = require('../models/restaurants.js');

    const multer = require('multer')
    const upload = multer({ dest: 'uploads/' })

    const {uploadFile, getFileStream} = require('../controllers/s3.js')
    const { checkToken } = require('../middleware/auth.js')
    
    app.get('/restaurant/key/:key', (req, res) => {
      console.log("++++++",req.params)
      const key = req.params.key
      const readStream = getFileStream(key)
    
      readStream.pipe(res)
    })
      
      app.post('/restaurant/images', upload.single('image'), async (req, res) => {
        const file = req.file
        console.log("++++++",file)
        console.log("Here inside routes")
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        console.log(result)
        const key = result.Key
        const restaurantId = req.body.restaurantId
        console.log("key restaurantId", restaurantId,key)
        Restaurant.addpicture(req.body.restaurantId, result.Key, (err,data) => {
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