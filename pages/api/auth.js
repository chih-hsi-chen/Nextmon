import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import passport from '../../lib/passport';
import { extractUser } from '../../lib/api-helper';

const handler = nextConnect();

handler.use(middleware);

// handle log in
handler.post(
	function (req, res, next) {
		passport.authenticate('login', function (err, user, info) {
			if (err) {
				return res.status(400).send({
					message: 'server error occurs',
					user: extractUser(req),
					info,
				});
			}
			if (!user) {
				return res.status(400).send({
					message: info.reason,
					user: false,
				});
			}

			req.logIn(user, function (err) {
				if (err) {
					return res.status(400).send({
						message: 'login fail',
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
					message: 'login success',
					user: {
						username: req.user.username,
					}
				});
			});
		})(req, res, next);
	}
);

// handle log out
handler.delete((req, res) => {
	req.logOut();
	res.status(204).end();
});

export default handler;