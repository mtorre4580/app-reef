import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { AssertStores } from '../../../validations/stores';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { q } = req.query;
  let query = {};
  if (q) {
    query = { ...query, name: { $regex: q, $options: 'i' } };
  }
  try {
    const stores = await req.db.collection('stores').find(query).toArray();
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

handler.post(async (req, res) => {
  const store = req.body;
  try {
    const { error } = AssertStores.validate(store);
    if (error) {
      return res.status(400).json({ error: error.details });
    }
    const { insertedId } = await req.db.collection('stores').insertOne(store);
    res.status(200).json({ id: insertedId, msg: 'Success' });
  } catch (err) {
    res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
