const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.get('/', (req, res, next) => {
  res.json('All good in auth');
});

router.post('/signup', async (req, res, next) => {
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = await User.create({ ...req.body, passwordHash });
    
    // Generate JWT token after successful signup
    const authToken = jwt.sign(
      {
        expiresIn: '6h',
        user: {
          id: newUser._id, 
        },
      },
      process.env.TOKEN_SECRET,
      {
        algorithm: 'HS256',
      }
    );
    res.status(201).json({ user: newUser, token: authToken });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const potentialUser = await User.findOne({ email });
  if (potentialUser) {
    if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
      
      const authToken = jwt.sign(
        {
          expiresIn: '6h',
          user: {
            id: potentialUser._id, 
          }, 
        },
        process.env.TOKEN_SECRET,
        {
          algorithm: 'HS256',
        }
      );

      res.status(200).json({ user: potentialUser, token: authToken });
    } else {
      res.status(400).json({ message: 'Wrong password' });
    }
  } else {
    res.status(400).json({ message: 'Wrong mail address' });
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.json('Pinging verify');
});

module.exports = router;
