import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

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
    res.json({
      paging: {
        total,
        offset: offsetInt,
        limit: limitInt,
      },
      items,
    });
  } catch (err) {
    res.json({ msg: 'Unexpected Error', err });
  }
});

handler.post(async (req, res) => {
  const item = req.body;
  const isLot = Array.isArray(item);
  try {
    if (isLot) {
      await req.db.collection('items').insertMany(item);
      res.json({ msg: 'Success' });
    } else {
      const { insertedId } = await req.db.collection('items').insertOne(item);
      res.json({ id: insertedId, msg: 'Success' });
    }
  } catch (err) {
    res.json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
