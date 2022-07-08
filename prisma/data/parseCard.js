const xpath = require('xpath')
const { downloadImage } = require('./downloadImage')

const paths = {
  name: ".//a[@class=' ProductCardVertical__name  Link js--Link Link_type_default']",
  price:
    ".//span[@class='ProductCardVerticalPrice__price-current_current-price js--ProductCardVerticalPrice__price-current_current-price ']",
  images:
    ".//div[@class='ProductCardVertical__picture-hover_part js--ProductCardInListing__picture-hover_part']/@data-src",
}

const parsePrice = (price) => Number(price.trim().replace(' ', ''))

const parseCard = (cardNode, staticDir) => {
  const title = xpath.select1(paths.name, cardNode).firstChild.nodeValue
  const [type, brand, ...nameArr] = title.split(' ')
  const name = nameArr.join(' ')
  const price = parsePrice(
    xpath.select1(paths.price, cardNode).firstChild.nodeValue
  )
  const imageUrls = xpath
    .select(paths.images, cardNode)
    .map((imageNode) => imageNode.value)

  imageUrls.forEach((imageUrl) => downloadImage(imageUrl, staticDir))

  const images = imageUrls.map((imageUrl) => imageUrl.split('/').pop())

  return { name, price, images, type, brand }
}

module.exports = { parseCard }
