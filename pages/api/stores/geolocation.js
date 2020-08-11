import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { latitude, longitude } = req.query;
  const location = [parseFloat(latitude), parseFloat(longitude)];
  return res.status(200).json({ location });
});

export default (req, res) => handler.apply(req, res);
