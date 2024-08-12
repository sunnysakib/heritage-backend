const bcrypt = require('bcryptjs');
const User = require('../../models/user.model');

const userRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const [existingUser] = await User.findByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create(name, email, hashedPassword, role);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userRegister };