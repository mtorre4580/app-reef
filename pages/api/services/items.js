const itemsMocks = [
  {
    id: '819273',
    type: 'SPS',
    title: 'Aussie Toxic Slimer Acropora',
    price: {
      value: 4500,
      coin: '$',
    },
    free_shipping: false,
    size: 'XL',
    img: 'https://cdn.shopify.com/s/files/1/0021/4958/0912/products/W-080420-03a_1800x1800.jpg?v=1596584268',
  },
  {
    id: '9081230',
    type: 'LPS',
    title: 'Yellow Branching Hammer',
    price: {
      value: 6000,
      coin: '$',
    },
    free_shipping: false,
    size: 'SMALL',
    img: 'https://cdn.shopify.com/s/files/1/0021/4958/0912/products/W-080420-20a_1800x1800.jpg?v=1596584268',
  },
  {
    id: '9182342',
    type: 'LPS',
    title: 'Fox Paranoia Favites',
    price: {
      value: 7000,
      coin: '$',
    },
    free_shipping: true,
    size: 'MEDIUM',
    img: 'https://cdn.shopify.com/s/files/1/0021/4958/0912/products/W-080420-14a_1800x1800.jpg?v=1596584266',
  },
  {
    id: '9182830',
    type: 'Soft',
    title: 'Rainbow Infusion Zoanthids',
    price: {
      value: 3000,
      coin: '$',
    },
    free_shipping: false,
    size: 'SMALL',
    img: 'https://cdn.shopify.com/s/files/1/0021/4958/0912/products/W-080320-12a_1800x1800.jpg?v=1596496569',
  },
  {
    id: '9497123',
    type: 'SPS',
    title: 'Raspberry Shortcake Acropora',
    price: {
      value: 6700,
      coin: '$',
    },
    free_shipping: false,
    size: 'SMALL',
    img: 'https://cdn.shopify.com/s/files/1/0021/4958/0912/products/W-080320-01a_1800x1800.jpg?v=1596496570',
  },
  {
    id: '9088312',
    type: 'SPS',
    title: 'Fire Bomb Rhodactis Mushroom',
    price: {
      value: 7000,
      coin: '$',
    },
    free_shipping: true,
    size: 'MEDIUM',
    img: 'https://cdn.shopify.com/s/files/1/0021/4958/0912/products/W-080320-18a_1800x1800.jpg?v=1596496568',
  },
  {
    id: '1203878',
    type: 'SPS',
    title: 'Starburst Cap Montipora',
    price: {
      value: 5500,
      coin: '$',
    },
    free_shipping: false,
    size: 'MEDIUM',
    img: 'https://cdn.shopify.com/s/files/1/0021/4958/0912/products/69_1800x1800.jpg?v=1538151781',
  },
  {
    id: '901923',
    type: 'SPS',
    title: 'Spearmint Alveopora',
    price: {
      value: 7200,
      coin: '$',
    },
    free_shipping: false,
    size: 'SMALL',
    img: 'https://cdn.shopify.com/s/files/1/0021/4958/0912/products/W-080420-27a_1800x1800.jpg?v=1596584265',
  },
];

class ItemsService {
  all() {
    return Promise.resolve(itemsMocks);
  }

  find(q) {
    return Promise.resolve(itemsMocks.filter((item) => item.title.toLocaleLowerCase().includes(q)));
  }
}

const itemsService = new ItemsService();

export default itemsService;
