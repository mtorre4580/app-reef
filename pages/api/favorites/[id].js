import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';
import middleware from '../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.patch(async (req, res) => {
  const {
    query: { id },
  } = req;

  if (!req.user) {
    return res.status(401).send('User is not logged in');
  }

  const favorites = req.user.favorites || {};
  const favoritesIds = Object.keys(favorites);

  if (favoritesIds.includes(id)) {
    try {
      delete favorites[id];
      await req.db.collection('users').findOneAndUpdate({ _id: req.user._id }, { $set: { favorites } });
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json({ msg: 'Error occurred while deleting the favorite' });
    }
  }

  try {
    const item = await req.db.collection('items').findOne({ _id: ObjectID(id) });
    if (!item) {
      return res.status(400).send('The item not exists');
    } else {
      try {
        favorites[id] = true;
        await req.db.collection('users').updateOne({ _id: req.user._id }, { $set: { favorites } });
        return res.status(200).end();
      } catch (err) {
        return res.status(500).json({ msg: 'Error occurred while adding the favorite' });
      }
    }
  } catch (err) {
    return res.status(500).send('The item not exists');
  }
});

export default (req, res) => handler.apply(req, res);
