const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dekucno3g', 
    api_key: '763427566489719', 
    api_secret: 'TBJwcLW-YIrlbes4H7_Hdtg9eIo'
  });

  const opts = {
    overwrite : true,
    invalidate: true,
    resource_type: "auto",
  };

module.exports = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if(result && result.secure_url) {
                return resolve(result.secure_url)
            }
            console.log(error.message)
            return reject({message: error.message})
        })
    })
}