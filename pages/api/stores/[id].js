import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    await req.db.collection('stores').deleteOne({ _id: id });
    res.status(200).json({ msg: 'Success' });
  } catch (err) {
    res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

handler.put(async (req, res) => {
  const {
    query: { id },
  } = req;
  const store = req.body;
  try {
    const { error } = AssertStores.validate(store);
    if (error) {
      return res.status(400).json({ error: error.details });
    }
    await req.db.collection('stores').updateOne({ _id: id }, { $set: { ...store } });
    res.status(200).json({ msg: 'Success' });
  } catch (err) {
    res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
