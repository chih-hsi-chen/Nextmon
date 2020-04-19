import nextConnect from 'next-connect';
import cors from './cors';
import session from './session';
import database from './database';
import passport from '../lib/passport';

const middleware = nextConnect();

middleware
  .use(cors)
  .use(database)
  .use(session)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;