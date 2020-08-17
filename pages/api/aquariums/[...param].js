import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';
import middleware from '../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.patch(async (req, res) => {
  const {
    query: { param },
    body,
  } = req;

  if (!req.user) {
    return res.status(401).send('User is not logged in');
  }

  try {
    const userId = req.user._id;
    const [idAquarium, date] = param;
    const aquariumByUser = await req.db
      .collection('aquariums')
      .findOne({ idUser: ObjectID(userId), _id: ObjectID(idAquarium) });

    if (aquariumByUser.parameters) {
      const actual = aquariumByUser.parameters[date];
      if (actual) {
        aquariumByUser.parameters[date] = {
          ...actual,
          ...body,
        };
      } else {
        aquariumByUser.parameters[date] = body;
      }
    } else {
      aquariumByUser.parameters = {
        [date]: body,
      };
    }

    await req.db
      .collection('aquariums')
      .findOneAndUpdate(
        { idUser: ObjectID(userId), _id: ObjectID(idAquarium) },
        { $set: { parameters: aquariumByUser.parameters } },
      );
    return res.status(200).json({ msg: 'Parameters updated' });
  } catch (err) {
    return res.status(500).json({ msg: 'Error occurred while deleting the favorite', err });
  }
});

handler.delete(async (req, res) => {
  const {
    query: { param },
  } = req;
  try {
    const [id] = param;
    await req.db.collection('aquariums').deleteOne({ _id: ObjectID(id) });
    return res.status(200).json({ msg: 'Success' });
  } catch (err) {
    return res.status(500).json({ msg: 'Unexpected Error', err });
  }
});

export default (req, res) => handler.apply(req, res);
