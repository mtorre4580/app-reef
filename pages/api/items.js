import { ItemsService } from './services';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { q } = req.query;
    let items = [];
    try {
      if (!q) {
        items = await ItemsService.all();
      } else {
        items = await ItemsService.find(q);
      }
      res.statusCode = 200;
      res.json(items);
    } catch (err) {
      console.log('err', err);
      res.statusCode = 500;
    }
  }
};
