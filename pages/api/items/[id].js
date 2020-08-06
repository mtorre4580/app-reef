import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import { ObjectID } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    await req.db.collection('items').deleteOne({ _id: ObjectID(id) });
    res.json({ msg: 'Success' });
  } catch (err) {
    res.json({ msg: 'Unexpected Error', err });
  }
});

handler.put(async (req, res) => {
  const {
    query: { id },
  } = req;
  const item = req.body;
  try {
    await req.db.collection('items').updateOne({ _id: ObjectID(id) }, { $set: { ...item } });
    res.json({ msg: 'Success' });
  } catch (err) {
    res.json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
