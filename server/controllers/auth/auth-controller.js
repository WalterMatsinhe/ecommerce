const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Register
const registerUser = async (req, res) => {
  const { userName, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      role: role || 'user', // default to 'user' if not provided
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: 'Registration successful',
      user: {
        username: newUser.userName,
        email: newUser.email,
        role: newUser.role,
        _id: newUser._id,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: 'Some error occurred',
    });
  }
};

// LoginUser
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: 'User does not exist, please register first',
      });

     const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
     if(!checkPasswordMatch) return res.json({
      success:false,
      message: 'incorrect password! please try again'
     })

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName : checkUser.userName,
      },
      'CLIENT_SECRET_KEY',
      { expiresIn: '60m' }
    );

    res
      .cookie('token', token, { httpOnly: true, secure: false })
      .json({
        success: true,
        message: 'Logged in successfully',
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName : checkUser.userName,
        },
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
    });
  }
};
//logout
const logoutUser = (req,res) => {
  res.clearCookie('token').json({
    success : true,
    message : 'Logged out Successfully',
  });
}
//auth middleware
const authMiddleware = async (req,res,next) =>{
  const token = req.cookies.token;
  if(!token) return res.status(401).json({
    success : false,
    message : 'unauthorized user!'
  });

  try{
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next()
  }catch(error){
    res.status(401).json({
      success: false,
      message: 'Unauthorized user!',
    });
  }
  
}
module.exports = { registerUser, loginUser, logoutUser, authMiddleware};
