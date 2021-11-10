const bcrypt = require('bcrypt');
const User = require('../model/users');
const tokenGenerator = require('../utils/jwtToken');

exports.registerUser = async (req, res) => {
  const { first_name, last_name, user_name, password, role } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);

  await User.create({
    first_name, last_name, user_name, password: hashed_password, role
  })
    .then(data => {
      user = data;
      tokenGenerator(user, 200, res)
    })
    .catch(err => res.json({ msg: 'User Name Already Exists' }))

}


exports.loginUser = async (req, res) => {
  const { user_name, password } = req.body;
  const user = { user_name, password };
  if (!user_name) {
    res.json({ msg: 'Please Enter Your UserName' });
  }
  const UserProfile = await User.findOne({ user_name })
  if (!UserProfile) {
    res.json({ msg: "Please Enter A Valid User Name" })
  }

  else {
    const isPasswordMatched = await bcrypt.compare(password, UserProfile.password);
    console.log(isPasswordMatched);
    if (isPasswordMatched) {
      tokenGenerator(user, 200, res)
    }
    else {
      res.json({ msg: 'Invalid Password' })
    }
  }
}


exports.logoutUser = async (req, res) => {
  res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).send('Successfully Logged Out !');
}


exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.send(user);
}

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.json({
    success: true,
    users
  })
}


exports.getUserDetails = async (req, res) => {
  const users = await User.find({ role: 'User' });

  res.json({
    success: true,
    users,
  })
}



exports.updateUsers = async (req, res) => {

  const updateUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    role: req.body.role,
  };

  const result = await User.findByIdAndUpdate(req.params.id, updateUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    result
  })
}


exports.deleteUser = async (req, res) => {

  const user = await User.findByIdAndDelete(req.params.id);

  res.send('Successfully Deleted User');

}