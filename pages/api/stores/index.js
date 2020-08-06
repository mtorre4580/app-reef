import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

/**
 * Retreive all stores or retrieve by name
 */
handler.get(async (req, res) => {
  const { q } = req.query;
  let query = {};
  if (q) {
    query = { ...query, name: { $regex: q, $options: 'i' } };
  }
  try {
    const stores = await req.db.collection('stores').find(query).toArray();
    res.json(stores);
  } catch (err) {
    res.json({ msg: 'Unexpected Error' });
  }
});

/**
 * Create new store
 */
handler.post(async (req, res) => {
  const store = req.body;
  try {
    const { insertedId } = await req.db.collection('stores').insertOne(store);
    res.json({ id: insertedId, msg: 'Success' });
  } catch (err) {
    res.json({ msg: 'Unexpected Error' });
  }
});

export default (req, res) => handler.apply(req, res);
