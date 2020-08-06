import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

/**
 * Remove store by id
 */
handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    await req.db.collection('stores').deleteOne({ _id: id });
    res.json({ msg: 'Success' });
  } catch (err) {
    res.json({ msg: 'Unexpected Error', err });
  }
});

/**
 * Update store by id
 */
handler.put(async (req, res) => {
  const {
    query: { id },
  } = req;
  const store = req.body;
  try {
    await req.db.collection('stores').updateOne({ _id: id }, { $set: { ...store } });
    res.json({ msg: 'Success' });
  } catch (err) {
    res.json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
