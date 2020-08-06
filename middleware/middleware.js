import nextConnect from 'next-connect';
import database from './database';

const middleware = nextConnect();

// Add all middlewares
middleware.use(database);

export default middleware;
