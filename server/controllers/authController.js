const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const otplib = require('otplib');
const qrcode = require('qrcode');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({
    username,
    email,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      try {
        const savedUser = await newUser.save();
        const token = generateToken(savedUser.id);
        const refreshToken = generateRefreshToken(savedUser.id);
        savedUser.refreshToken = refreshToken;
        await savedUser.save();
        res.json({
          token,
          refreshToken,
          user: {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email
          }
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  bcrypt.compare(password, user.password, async (err, isMatch) => {
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    user.refreshToken = refreshToken;
    await user.save();
    res.json({
      token,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
};

exports.token = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    const newToken = generateToken(user.id);
    res.json({ token: newToken });
  } catch (err) {
    res.status(403).json({ message: 'Token is not valid' });
  }
};


exports.logout = async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    user.refreshToken = '';
    await user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(403).json({ message: 'Token is not valid' });
  }
};


exports.setup2FA = async (req, res) => {
  const { email } = req.body;

  const secret = otplib.authenticator.generateSecret();
  const otpauth = otplib.authenticator.keyuri(email, 'Comp229 - Sec402 - OTP', secret)

  qrcode.toDataURL(otpauth, async (err, imageUrl) => {
    if (err) {
      return res.status(500).json({ message: 'Error generating QR code', err });
    }

    try {
      const user = await User.findOneAndUpdate({ email }, { otpSecret: secret });
      if (!user) {
        return res.status(500).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'QR code generated', imageUrl })

    } catch (error) {
      res.status(500).json({ message: 'Error stroing the secret' })
    }
  })
}

exports.verify2FASetup = async (req, res) => {
  const { email, token } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return rest.status(404).json({ message: 'User not found' });
  }

  const secret = user.otpSecret;
  if (!secret) {
    return res.status(400).json({ message: '2FA is not setup for this user' });
  }
  const isValid = otplib.authenticator.check(token, secret);

  if (isValid) {
    user.is2FAEnabled = true;
    await user.save();
    res.status(200).json({ message: '2FA enabled successfully' });
  } else {
    res.status(400).json({ message: 'Invalid token' });
  }
}

exports.verifyOTP = async (req, res) => {
  const { email, token } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return rest.status(404).json({ message: 'User not found' });
  }

  const secret = user.otpSecret;
  if (!secret) {
    return res.status(400).json({ message: '2FA is not setup for this user' });
  }

  const isValid = otplib.authenticator.check(token, secret);
  if (isValid) {
    const jwtToken = jwt.sign({ id: user_id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: jwtToken
    });
  } else {
    res.status(400).json({ message: 'OTP is invalid' });
  }
}