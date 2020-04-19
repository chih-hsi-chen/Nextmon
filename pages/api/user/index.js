import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/api-helper';
import passport from '../../../lib/passport';

const handler = nextConnect();

handler.use(middleware);
handler.get(async (req, res) => res.status(200).json({ user: extractUser(req) }));
handler.post(
    function(req, res, next) {
        passport.authenticate('signup', function (err, user, info) {
			if (err) {
                return res.status(400).send({
					message: 'error occurs',
					user: extractUser(req),
				});
            }
			if (!user) { 
				return res.status(400).send({
					message: info.reason,
					user: extractUser(req),
				});
			}

			req.logIn(user, function (err) {
				if (err) {
                    return res.status(400).send({
                        message: 'signup fail',
                        user: extractUser(req),
                    });
                }
				const { username } = req.body;

				if (req.session.username === username) {
					req.session.times++;
				} else {
					req.session.username = username;
					req.session.times = 1;
				}

				return res.status(200).send({
					message: 'signup success',
					user: extractUser(req),
				});
			});
		})(req, res, next);
    }
);

export default handler;