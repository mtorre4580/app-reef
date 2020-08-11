import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { ObjectID } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  if (!req.user) {
    res.status(401).send('User is not logged in');
    return;
  }
  try {
    const ids = Object.keys(req.user.favorites || {}).map((_id) => ObjectID(_id));
    const items = await req.db
      .collection('items')
      .find({ _id: { $in: ids } })
      .toArray();
    const favorites = items.map((fav) => ({ ...fav, isFavorite: true }));
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ msg: 'An error occurred while getting user favorites' });
  }
});

export default (req, res) => handler.apply(req, res);
