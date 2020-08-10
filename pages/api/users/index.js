import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middleware/middleware';

const retrieveInfo = (req) => {
  if (req.user) {
    return {
      email: req.user.email,
    };
  }
  return null;
};

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  res.json({ user: retrieveInfo(req) });
});

handler.post(async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    res.status(400).send('email and password are required');
    return;
  }
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await req.db
    .collection('users')
    .insertOne({ email, password: hashedPassword })
    .then(({ ops }) => ops[0]);

  req.logIn(user, (err) => {
    if (err) throw err;

    if (!req.user) {
      return null;
    }

    res.status(201).json({
      user: retrieveInfo(req),
    });
  });
});

export default handler;