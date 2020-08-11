import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import passport from '../../../services/passport';

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate('local'), (req, res) => {
  return res.json({ user: { email: req.user.email } });
});

handler.delete((req, res) => {
  req.logOut();
  return res.status(204).end();
});

export default handler;
