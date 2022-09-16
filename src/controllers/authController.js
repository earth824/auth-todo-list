const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'password and confirm password did not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'user created' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'invalid username or password' });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ message: 'invalid username or password' });
    }

    const payload = {
      id: user.id,
      username,
      email: user.email
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || 'secret_key',
      { expiresIn: '30d' }
    );

    res.status(200).json({ message: 'success login', token });
  } catch (err) {
    next(err);
  }
};
