import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';
import { AssertItem } from '../../../validations/items';
import middleware from '../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    const item = await req.db.collection('items').findOne({ _id: ObjectID(id) });
    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    await req.db.collection('items').deleteOne({ _id: ObjectID(id) });
    return res.status(200).json({ msg: 'Success' });
  } catch (err) {
    return res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

handler.put(async (req, res) => {
  const {
    query: { id },
  } = req;
  const item = req.body;
  try {
    const { error } = AssertItem.validate(item);
    if (error) {
      return res.status(400).json({ error: error.details });
    }
    await req.db.collection('items').updateOne({ _id: ObjectID(id) }, { $set: { ...item } });
    return res.status(200).json({ msg: 'Success' });
  } catch (err) {
    return res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
