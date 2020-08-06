import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

/**
 * Retrieve all stores near by user location
 */
handler.get(async (req, res) => {
  const { latitude, longitude } = req.query;
  const location = [parseFloat(latitude), parseFloat(longitude)];
  res.json({ location });
});

export default (req, res) => handler.apply(req, res);
