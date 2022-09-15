const jwt = require('jsonwebtoken');

const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'you are unauthenticated' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'you are unauthenticated' });
    }

    const payload = jwt.verify(token, 'abcdefgh');

    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return res.status(401).json({ message: 'you are unauthenticated' });
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
