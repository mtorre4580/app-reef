import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, _res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(DB_NAME);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
