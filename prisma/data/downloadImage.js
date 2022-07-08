const download = require('image-downloader')

const downloadImage = (imageUrl, staticDir) => {
  const imageName = imageUrl.split('/').pop()
  download
    .image({ url: imageUrl, dest: `${staticDir}/${imageName}` })
    .then(({ filename }) => {
      console.log('Save image to', filename)
    })
    .catch((err) => console.error(err))
}

module.exports = { downloadImage }
