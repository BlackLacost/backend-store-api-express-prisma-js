const path = require('path')
const fs = require('fs')

const axios = require('axios')
const { DOMParser } = require('@xmldom/xmldom')
const xpath = require('xpath')
const { parseCard } = require('./parseCard')

const urls = [
  'https://www.citilink.ru/catalog/noutbuki/',
  'https://www.citilink.ru/catalog/smartfony/?view_type=grid',
  'https://www.citilink.ru/catalog/televizory/?view_type=grid',
]
const cardPath =
  "//div[@class='ProductCardCategoryList__grid']//div[@class='ProductCardVerticalLayout ProductCardVertical__layout']"

let data = []

const staticDir = path.join(__dirname, '..', '..', 'static')
fs.rmSync(staticDir, { recursive: true, force: true })
fs.mkdirSync(staticDir)

async function scraperData() {
  for (let url of urls) {
    const res = await axios.get(url)
    const document = new DOMParser().parseFromString(res.data)
    const cardNodes = xpath.select(cardPath, document)
    const newData = cardNodes.map((cardNode) => parseCard(cardNode, staticDir))
    data = [...data, ...newData]
  }
  fs.writeFileSync('devices.json', JSON.stringify(data, null, 2))
}

module.exports = { scraperData }
