import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { AssertArrayItems, AssertItem } from '../../../validations/items';

const handler = nextConnect();

const applyFavoritesToUser = (items, user = {}) => {
  const ids = Object.keys(user.favorites || {});
  return items.map((item) => ({
    ...item,
    isFavorite: ids.includes(item._id.toString()),
    userLogged: Object.keys(user).length > 0,
  }));
};

handler.use(middleware);

handler.get(async (req, res) => {
  const { q, type, limit = 8, offset = 0 } = req.query;
  let query = {};
  if (q) {
    query = { ...query, title: { $regex: q, $options: 'i' } };
  }
  if (type) {
    query = { ...query, type: type.toUpperCase() };
  }
  try {
    const offsetInt = parseInt(offset);
    const limitInt = parseInt(limit);
    const cursor = req.db.collection('items').find(query).skip(offsetInt).limit(limitInt);
    const total = await cursor.count();
    const items = await cursor.toArray();
    return res.json({
      paging: {
        total,
        offset: offsetInt,
        limit: limitInt,
      },
      items: applyFavoritesToUser(items, req.user),
    });
  } catch (err) {
    return res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

handler.post(async (req, res) => {
  const item = req.body;
  const isLot = Array.isArray(item);
  try {
    const { error } = isLot ? AssertArrayItems.validate(item) : AssertItem.validate(item);
    if (error) {
      return res.status(400).json({ error: error.details });
    }
    if (isLot) {
      await req.db.collection('items').insertMany(item);
      return res.status(200).json({ msg: 'Success' });
    } else {
      const { insertedId } = await req.db.collection('items').insertOne(item);
      return res.status(200).json({ id: insertedId, msg: 'Success' });
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
