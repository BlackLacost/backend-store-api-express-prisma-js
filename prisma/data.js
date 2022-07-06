const typesName = {
  phone: 'Телефоны',
  notebook: 'Ноутбуки',
  tv: 'Телевизоры',
}

const brandsName = {
  apple: 'Apple',
  dell: 'Dell',
  samsung: 'Samsung',
  xiaomi: 'Xiaomi',
}

const devices = [
  {
    name: 'iPhone 11',
    img: 'iphone.jpg',
    price: 95000,
    type: { name: typesName.phone },
    brand: { name: brandsName.apple },
  },
  {
    name: 'poco x3 NFC',
    img: 'iphone.jpg',
    price: 17000,
    type: { name: typesName.phone },
    brand: { name: brandsName.xiaomi },
  },
  {
    name: 'One',
    img: 'iphone.jpg',
    price: 67000,
    type: { name: typesName.phone },
    brand: { name: brandsName.samsung },
  },
  {
    name: 'Mega X',
    img: 'iphone.jpg',
    price: 170000,
    type: { name: typesName.notebook },
    brand: { name: brandsName.dell },
  },
  {
    name: 'S ung',
    img: 'iphone.jpg',
    price: 70000,
    type: { name: typesName.notebook },
    brand: { name: brandsName.samsung },
  },
]

module.exports = {
  brandsName,
  typesName,
  devices,
}
