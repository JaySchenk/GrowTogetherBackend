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
          id: newUser._id, // Use the ID of the user or any other unique identifier
          // You can add more user-specific information here if needed
        },
      },
      process.env.TOKEN_SECRET,
      {
        algorithm: 'HS256',
      }
    );

    // Send back the new user data along with the token
    res.status(201).json({ user: newUser, token: authToken });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post('/login', async (req, res, next) => {
  /* Get back the payload from your request, as it's a POST you can access req.body */
  const { email, password } = req.body;
  /* Try to get your user from the DB */
  const potentialUser = await User.findOne({ email });
  /* If your user exists, check if the password is correct */
  if (potentialUser) {
    if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
      const authToken = jwt.sign(
        {
          expiresIn: '6h',
          user: null, // Put yhe data of your user in there
        },
        process.env.TOKEN_SECRET,
        {
          algorithm: 'HS256',
        }
      );

      res.status(200).json({ token: authToken });
    } else {
      res.status(400).json({ message: 'Wrong password' });
    }
  } else {
    res.status(400).json({ message: 'Wrong mail address' });
  }
  /* If your password is correct, sign the JWT using jsonwebtoken */
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  // You need to use the middleware there, if the request passes the middleware, it means your token is good
  res.json('Pinging verify');
});

module.exports = router;
