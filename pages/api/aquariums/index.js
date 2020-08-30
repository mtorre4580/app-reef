import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { AssertAquariums } from '../../../validations/aquariums';
import { ObjectID } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send('User is not logged in');
    }
    const { _id } = req.user;
    const aquarium = await req.db.collection('aquariums').findOne({ idUser: ObjectID(_id) });
    return res.status(200).json(aquarium);
  } catch (err) {
    return res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

handler.post(async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send('User is not logged in');
    }
    const { _id } = req.user;
    const data = req.body;

    const { error } = AssertAquariums.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const aquarium = {
      idUser: ObjectID(_id),
      ...data,
    };

    const { insertedId } = await req.db.collection('aquariums').insertOne(aquarium);

    return res.status(200).json({ msg: 'Registered aquarium', id: insertedId });
  } catch (err) {
    return res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
